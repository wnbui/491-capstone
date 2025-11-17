from flask import Blueprint, request, jsonify, current_app as app
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from datetime import timedelta
from sqlalchemy import select, or_
import jwt, re
from .. import db
from ..models import User
from ..schemas import RegisterIn, LoginIn, UserOut, LoginOut, MessageOut, UserUpdateIn, PasswordChangeIn, UserPreferencesIn 
from ..timeutils import utcnow
from ..pyd import parse_body

auth_bp = Blueprint("auth", __name__)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("x-access-token")
        if not token:
            return jsonify({"message": "Token missing"}), 401
        try:
            data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
            stmt = select(User).filter_by(username=data["username"])
            current_user = db.session.execute(stmt).scalar_one_or_none()
            if current_user is None:
                return jsonify({"message": "User not found"}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token expired"}), 401
        except Exception:
            return jsonify({"message": "Invalid token"}), 401
        return f(current_user, *args, **kwargs)
    return decorated

@auth_bp.route("/register", methods=["POST"])
@parse_body(RegisterIn)
def register(body: RegisterIn):
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', body.password):
        return jsonify({"error": "Password must include a special character"}), 400
    stmt = select(User).where(or_(User.username == body.username, User.email == body.email))
    existing = db.session.execute(stmt).scalar_one_or_none()
    if existing is not None:
        return jsonify({"error": "Username or email exists"}), 400
    user = User(full_name=body.full_name,
                username=body.username,
                email=body.email,
                password_hash=generate_password_hash(body.password),
                role=body.role)
    db.session.add(user)
    db.session.commit()
    return jsonify(MessageOut(message="Registered successfully").model_dump()), 201

@auth_bp.route("/login", methods=["POST"])
@parse_body(LoginIn)
def login(body: LoginIn):
    stmt = select(User).filter_by(username=body.username)
    user = db.session.execute(stmt).scalar_one_or_none()
    if user is None or not check_password_hash(user.password_hash, body.password):
        return jsonify({"error": "Invalid username or password"}), 401
    exp = timedelta(minutes=app.config["JWT_EXPIRES_MIN"])
    token = jwt.encode({"username": user.username, "exp": utcnow() + exp},
                       app.config["SECRET_KEY"], algorithm="HS256")
    payload = LoginOut(message="Login successful", token=token, role=user.role, username=user.username)
    return jsonify(payload.model_dump())

@auth_bp.route("/me", methods=["GET"])
@token_required
def me(current_user: User):
    return jsonify(UserOut.model_validate(current_user).model_dump())

@auth_bp.route("/logout", methods=["POST"])
@token_required
def logout(current_user: User):
    return jsonify({"message": "User logged out successfully."}), 200

@auth_bp.route("/me", methods=["PATCH"])
@token_required
@parse_body(UserUpdateIn)
def update_profile(current_user: User, body: UserUpdateIn):
    """Update current user's profile (name and/or email)"""
    try:
        if body.full_name is not None:
            current_user.full_name = body.full_name
        
        if body.email is not None:
            stmt = select(User).where(User.email == body.email, User.id != current_user.id)
            existing = db.session.execute(stmt).scalar_one_or_none()
            if existing is not None:
                return jsonify({"error": "Email already in use"}), 400
            current_user.email = body.email
        
        db.session.commit()
        return jsonify(UserOut.model_validate(current_user).model_dump()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@auth_bp.route("/me/change-password", methods=["POST"])
@token_required
@parse_body(PasswordChangeIn)
def change_password(current_user: User, body: PasswordChangeIn):
    """Change current user's password"""
    if not check_password_hash(current_user.password_hash, body.current_password):
        return jsonify({"error": "Current password is incorrect"}), 401
    
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', body.new_password):
        return jsonify({"error": "New password must include a special character"}), 400
    
    try:
        current_user.password_hash = generate_password_hash(body.new_password)
        db.session.commit()
        return jsonify({"message": "Password changed successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@auth_bp.route("/me/preferences", methods=["PATCH"])
@token_required
@parse_body(UserPreferencesIn)
def update_preferences(current_user: User, body: UserPreferencesIn):
    """Update current user's preferences"""
    # TODO: Implement preferences storage when needed
    return jsonify({"message": "Preferences updated successfully"}), 200

@auth_bp.route("/me", methods=["DELETE"])
@token_required
def delete_account(current_user: User):
    """Delete current user's account and all associated data"""
    try:
        db.session.delete(current_user)
        db.session.commit()
        return jsonify({"message": "Account deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
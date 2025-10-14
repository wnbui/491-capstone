from flask import Blueprint, request, jsonify, current_app as app
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from datetime import timedelta
from sqlalchemy import select, or_
import jwt, re

from .. import db
from ..models import User
from ..schemas import RegisterIn, LoginIn, UserOut, LoginOut, MessageOut
from ..pyd import parse_body
from ..timeutils import utcnow

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
        except Exception:
            return jsonify({"message": "Invalid token"}), 401
        return f(current_user, *args, **kwargs)
    return decorated

@auth_bp.route("/register", methods=["POST"])
@parse_body(RegisterIn)
def register(body: RegisterIn):
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", body.password):
        return jsonify({"error": "Password must include a special character"}), 400

    stmt = select(User).where(or_(User.username == body.username, User.email == body.email))
    existing = db.session.execute(stmt).scalar_one_or_none()
    if existing is not None:
        return jsonify({"error": "Username or email exists"}), 400

    user = User(
        username=body.username,
        name=body.name,
        email=body.email,
        password_hash=generate_password_hash(body.password),
        role=body.role,
    )
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
    token = jwt.encode(
        {"username": user.username, "exp": utcnow() + exp},
        app.config["SECRET_KEY"],
        algorithm="HS256",
    )

    payload = LoginOut(
        message="Login successful",
        token=token,
        role=user.role,
        username=user.username,
    )
    return jsonify(payload.model_dump())

@auth_bp.route("/me", methods=["GET"])
@token_required
def me(current_user: User):
    return jsonify(UserOut.model_validate(current_user).model_dump())

@auth_bp.route("/logout", methods=["POST"])
@token_required
def logout(current_user):
    """Call front end to delete JWT"""
    return jsonify({"message": "User logged out successfully."}), 200
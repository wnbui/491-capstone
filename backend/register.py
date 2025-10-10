from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash
from classes import User

from session import Session

import os

register_bp = Blueprint('register', __name__, url_prefix='/register')

@register_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    if not data:
        return jsonify({"ERROR": "Missing JSON body"}), 400
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"ERROR": "Missing information"}), 400
    
    session = Session()

    try:
        if session.query(User).filter_by(username=username).first():
            return jsonify({"ERROR": "Username unavailable"}), 409
        if session.query(User).filter_by(email=email).first():
            return jsonify({"ERROR": "Email unavailable"}), 409
        
        new_user = User(username=username, email=email, password=password, session=session)
        session.add(new_user)
        session.commit()

        return jsonify({"MESSAGE": "Registration successful"}), 201
    
    except Exception as exc:
        session.rollback()
        return jsonify({"ERROR": f"Registration unsuccessful: {str(exc)}"}), 500
    
    finally:
        session.close()
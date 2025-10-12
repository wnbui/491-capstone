from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS for frontend
    CORS(app, resources={r"/api/*": {"origins": Config.CORS_ORIGINS.split(",")}})
    db.init_app(app)

    with app.app_context():
        from .models import User, Project
        db.create_all()

    # Register routes
    from .routes.auth import auth_bp
    from .routes.projects import projects_bp
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(projects_bp, url_prefix="/api/projects")

    return app

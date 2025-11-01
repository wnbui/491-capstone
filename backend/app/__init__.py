from __future__ import annotations

from flask import Flask, request, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from flask_socketio import SocketIO


db = SQLAlchemy()
migrate = Migrate()
socketio = SocketIO( cors_allowed_origins="*")

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    socketio.init_app(app)

    # Register routes
    from .routes.auth import auth_bp
    from .routes.projects import projects_bp
    from .routes.tasks import tasks_bp
    from .routes.notes import notes_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(projects_bp, url_prefix="/api/projects")
    app.register_blueprint(tasks_bp, url_prefix="/api/tasks")
    app.register_blueprint(notes_bp, url_prefix="/api/notes")


    # Manual CORS headers on EVERY response
    @app.after_request
    def add_cors_headers(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, x-access-token, Authorization'
        return response

    # Handle OPTIONS requests
    @app.before_request
    def handle_preflight():
        if request.method == "OPTIONS":
            response = make_response()
            response.headers['Access-Control-Allow-Origin'] = '*'
            response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type, x-access-token, Authorization'
            return response

    @app.route('/test')
    def test():
        return {'message': 'test route'}

    return app
import os
from pathlib import Path
from dotenv import load_dotenv

# load backend/.env whenever Config is imported
load_dotenv(dotenv_path=Path(__file__).with_name(".env"))

class Config:
    SECRET_KEY = os.getenv("FLASK_SECRET", "dev-secret")
    JWT_EXPIRES_MIN = int(os.getenv("JWT_EXPIRES_MIN", "30"))

    MYSQL_USER = os.getenv("MYSQL_USER")
    MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD")
    MYSQL_HOST = os.getenv("MYSQL_HOST", "127.0.0.1")
    MYSQL_PORT = os.getenv("MYSQL_PORT", "3306")
    MYSQL_DB = os.getenv("MYSQL_DB", "project_mgmt")

    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DB}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000")

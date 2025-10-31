from flask_sqlalchemy import SQLAlchemy
import os

db = SQLAlchemy()

def init_db(app):
    # Use PostgreSQL in production, SQLite in development
    database_url = os.getenv('DATABASE_URL')
    if database_url:
        # Strip any whitespace/newlines that might be in the environment variable
        database_url = database_url.strip()
        # Render provides DATABASE_URL, but we need to handle postgres:// vs postgresql://
        if database_url.startswith('postgres://'):
            database_url = database_url.replace('postgres://', 'postgresql://', 1)
        app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    else:
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sustainable_shelf.db'
    
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

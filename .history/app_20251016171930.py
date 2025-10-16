from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

from db import init_db
from routes import register_routes

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'fallback-secret-key')

CORS(app)
jwt = JWTManager(app)

# Initialize database
init_db(app)

# Register routes
register_routes(app)

if __name__ == '__main__':
    app.run(debug=True)
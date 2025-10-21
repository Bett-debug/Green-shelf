from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

from db import db, init_db
from routes import register_routes
from flask_migrate import Migrate

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'fallback-secret-key')

CORS(app)
jwt = JWTManager(app)

init_db(app)


migrate = Migrate(app, db)


register_routes(app)

if __name__ == '__main__':
    app.run(debug=True)

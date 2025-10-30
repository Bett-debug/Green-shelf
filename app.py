from flask import Flask, send_from_directory
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

from db import db, init_db
from routes import register_routes
from flask_migrate import Migrate

app = Flask(__name__, static_folder='client/dist', static_url_path='')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'fallback-secret-key')

# Configure CORS
if os.getenv('FLASK_ENV') == 'production':
    CORS(app, origins=[os.getenv('FRONTEND_URL', '*')])
else:
    CORS(app)

jwt = JWTManager(app)

init_db(app)

# Force create all database tables
with app.app_context():
    db.create_all()
    print("✅ Database tables created successfully")

migrate = Migrate(app, db)

register_routes(app)

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)

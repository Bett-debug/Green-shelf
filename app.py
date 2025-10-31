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


CORS(
    app,
    resources={r"/api/*": {"origins": "https://green-shelf.netlify.app"}},
    supports_credentials=True
)

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'fallback-secret-key')

jwt = JWTManager(app)

init_db(app)

with app.app_context():
    try:
        db.session.execute(db.text('SELECT 1 FROM "user" LIMIT 1'))
        db.session.commit()
        print("Database tables already exist")
    except Exception as e:
        print(f"Creating database tables... (Error was: {str(e)[:100]})")
        db.drop_all()
        db.create_all()
        print("Database tables created successfully")

migrate = Migrate(app, db)

register_routes(app)

@app.route("/")
def root():
    return {"message": "GreenShelf API running"}


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)

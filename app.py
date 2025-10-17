from flask import Flask
from db import init_db
from routes import register_routes
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Initialize database
init_db(app)

# Register routes
register_routes(app)

if __name__ == '__main__':
    app.run(debug=True)
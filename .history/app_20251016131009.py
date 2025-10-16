from flask import Flask
from db import init_db
from routes import register_routes

app = Flask(__name__)

# Initialize database
init_db(app)

# Register routes
register_routes(app)

if __name__ == '__main__':
    app.run(debug=True)
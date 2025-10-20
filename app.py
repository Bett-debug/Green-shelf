from flask import Flask
from db import db, init_db
from routes import register_routes
from flask_cors import CORS
from flask_migrate import Migrate

app = Flask(__name__)
CORS(app)


init_db(app)


migrate = Migrate(app, db)


register_routes(app)

if __name__ == '__main__':
    app.run(debug=True)

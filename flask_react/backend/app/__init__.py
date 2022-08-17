from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os
basedir = os.path.abspath(os.path.dirname(__file__))

api = Flask(__name__)
api.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///' + os.path.join(basedir, 'api.db')
api.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(api)
migrate = Migrate(api, db)

from app import routes, models
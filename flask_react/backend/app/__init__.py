from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import JWTManager

#base level isntantiation
import os
basedir = os.path.abspath(os.path.dirname(__file__))
api = Flask(__name__)

#JWT Used for Auth Workflow
api.config["JWT_SECRET_KEY"] = "{\"$)IU+/bsy3C2;"
api.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(api)

#Datbase config
api.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///' + os.path.join(basedir, 'api.db')
api.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(api)
migrate = Migrate(api, db)

#Top level imports
from app import routes, models
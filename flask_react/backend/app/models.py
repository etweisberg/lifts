from app import db, jwt
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timezone

# Persisting Blocked JWT tokens to remember which ones cannot be used anymore


class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, index=True)
    type = db.Column(db.String(16), nullable=False)
    created_at = db.Column(db.DateTime, server_default=datetime.now(
        timezone.utc).strftime("%c"), nullable=False)

# Callback function to check if a JWT exists in the database blocklist


@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload):
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()
    return token is not None

# Users:
# - identified by ID, username, email, and password hash (for loggin in)
# - reference back to their many "lifts", which are basically just the data from each gym session
# - reference back to their many "exercises", which are the types of movements they want to track


class User(db.Model):
    # fields
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    lifts = db.relationship('Lift', backref='user', lazy='dynamic')
    exercises = db.relationship('Exercise', backref='user', lazy='dynamic')

    # password hashing operations
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User {}>'.format(self.username)

# Lifts:
# - identified by ID
# - associated with a user
# - represents one gym session (group of exercises performed in a certain number of sets, reps, at given weights)
# - references to many "exercises"

class Lift(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    exercises = db.relationship('Exercise', backref='lift', lazy='dynamic')

    def __repr__(self):
        return '<Lift {}>'.format([e for e in self.exercises])

# Exercises:
# - identified by a type classifier (custom string)
# - stores sets, reps, and weight info

class Exercise(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    lift_id = db.Column(db.Integer, db.ForeignKey('lift.id'))
    exercise_identifier = db.Column(db.String(32), index=True)
    srw_info = db.Column(db.JSON)

    def __repr__(self):
        return f'<Exercise {self.exercise_identifier}: {self.srw_info}>'
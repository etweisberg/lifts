from datetime import datetime, timedelta, timezone
import json
from app import api
from app.models import *
from flask import request, jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, jwt_required


@api.route('/')
# User Authentication
@api.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        print(response)
        return response
    except (RuntimeError, KeyError):
        print(response)
        # Case where there is not a valid JWT. Just return the original response
        return response


@api.route('/signup', methods=["POST"])
def signup():
    username = request.json.get("username", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if User.query.filter_by(email=email).first():
        return {"msg": "User with that email already exists"}, 409
    if User.query.filter_by(username=username).first():
        return {"msg": "Username is taken"}, 409
    else:
        u = User(username=username, email=email)
        u.set_password(password)
        db.session.add(u)
        db.session.commit()
        return {'msg': f"{u} succesfully created"}


@api.route('/login', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()
    if not user:
        return {"msg": "User with that email does not exist"}, 404
    elif not user.check_password(password):
        return {"msg": "Wrong password"}, 401
    else:
        access_token = create_access_token(identity=user.id)
        response = {"access_token": access_token,
                    "user_id": user.id, "username": user.username}
        return response


@api.route("/logout", methods=["DELETE"])
@jwt_required(verify_type=False)
def modify_token():
    token = get_jwt()
    jti = token["jti"]
    ttype = token["type"]
    now = datetime.now(timezone.utc)
    db.session.add(TokenBlocklist(jti=jti, type=ttype, created_at=now))
    db.session.commit()
    return jsonify(msg=f"{ttype.capitalize()} token successfully revoked")

# Querying exercise information


@api.route('/lifts', methods=["GET"])
@jwt_required()
def lifts():
    user = User.query.get(get_jwt_identity())
    response_body = {}
    for l in user.lifts:
        exercises = l.exercises
        response_body[l.id] = [
            {
                "id": e.id,
                "user_id": e.user_id,
                "lift_id": e.lift_id,
                "exericse_identifier": e.exercise_identifier,
                "srw_info": e.srw_info,
            } for e in exercises
        ]
    return response_body

# Logging Lifts


@api.route('/new-lift', methods=["POST"])
@jwt_required()
def new_lifts():
    exercises = request.json
    if not exercises:
        return {'msg': 'No exercise information provided'}, 400
    else:
        exercise_objects = []
        for e in exercises:
            if not (e['sets'] and e['reps'] and e['weight']):
                return {'msg': 'SRW info not provided'}, 400
            if not (e['identifier']):
                return {'msg': 'Identifier not provided'}, 400
            e_obj = Exercise(
                user_id=get_jwt_identity(),
                srw_info=json.dumps({
                    "sets": e['sets'],
                    "reps": e['reps'],
                    "weight": e['weight']
                }),
                exercise_identifier=e['identifier']
            )
            exercise_objects.append(e_obj)
        db.session.add_all(exercise_objects)
        l = Lift(
            user_id=get_jwt_identity(),
            exercises=exercise_objects
        )
        db.session.add(l)
        db.session.commit()
        return {'msg': f'Lift {l} succesfully created'}, 200

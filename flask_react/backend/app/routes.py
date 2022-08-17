from urllib import response
from app import api
from app.models import *

@api.route('/')

@api.route('/lifts')
def lifts():
    lifts = Lift.query.all()
    response_body = {"lifts": [l.body for l in lifts]}
    return response_body
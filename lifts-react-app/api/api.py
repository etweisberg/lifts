from flask import Flask

app = Flask(__name__)


@app.route('/dashboard')
def get_dashboard_data():
    return {
        'lifts':
        [
            {'Bench Press': [(1, 155)]},
            {'Squat': [(5, 185)]},
            {'Deadlift': [(1, 225)]}
        ]
    }

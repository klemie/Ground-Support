from flask import request, jsonify, Flask
import random

app = Flask(__name__)

@app.route('/gateway', methods=['POST', 'GET'])
def send_data():
    if request.method == 'GET':
        data = generate_random_packet()
        return jsonify(data)

def generate_random_packet():
    return {
        "Header": {
            'Latitude': 48.463695,
            'Longitude': -123.311645, 
            'Satellites': random.randint(0, 40),
            'Date': '00:00:00'
        },
        "ADX": {
            'ax': random.uniform(-12, 12),
            'ay': random.uniform(-12, 12),
            'az': random.uniform(-12, 12)
        },
        'BME': {
            'h': random.uniform(-12, 12),
            't': random.uniform(-32, 32),
            'p': random.uniform(0, 1000),
            'a': random.uniform(-12, 12)
        },
        'LSM': {
            'gx': random.uniform(-12, 12),
            'gy': random.uniform(-12, 12),
            'gz': random.uniform(-12, 12),
            'ax': random.uniform(-12, 12),
            'ay': random.uniform(-12, 12),
            'az': random.uniform(-12, 12),
            'mx': random.uniform(-12, 12),
            'my': random.uniform(-12, 12),
            'mz': random.uniform(-12, 12)

        },
        'AIRBRAKE': {
           'percent':  random.uniform(0, 100),
           'POT': random.uniform(-1200, 1200)
        }
    }

if __name__=='__main__': 
    app.run(port=5000, debug=True)
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
        "Header": [
            48.463695,
            -123.311645, 
            random.randint(0, 40),
            '00:00:00'
        ],
        "ADX": [
            random.uniform(-12, 12),
            random.uniform(-12, 12),
            random.uniform(-12, 12)
        ],
        'BME': [
            random.uniform(-12, 12),
            random.uniform(-32, 32),
            random.uniform(0, 1000),
            random.uniform(-12, 12)
        ],
        'LSM': [
                random.uniform(-12, 12),
                random.uniform(-12, 12),
                random.uniform(-12, 12),
                random.uniform(-12, 12),
                random.uniform(-12, 12),
                random.uniform(-12, 12),
                random.uniform(-12, 12),
                random.uniform(-12, 12),
                random.uniform(-12, 12)
        ],
        'AIRBRAKE': [
            random.uniform(0, 100),
            random.uniform(-1200, 1200),
            random.uniform(-1200, 1200)
        ],
        'strainGauges': [
            random.uniform(0, 100),
            random.uniform(0, 100),
            random.uniform(0, 100),
            random.uniform(0, 100),
            random.uniform(0, 100),
            random.uniform(0, 100),
            random.uniform(0, 100),
            random.uniform(0, 100),
            random.uniform(0, 100),
            random.uniform(0, 100),
            random.uniform(0, 100),
            random.uniform(0, 100)
        ]
    }

if __name__=='__main__': 
    app.run(port=5000, debug=True)
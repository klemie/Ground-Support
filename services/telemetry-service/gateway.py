from shapely.geometry import Polygon, Point
import flask
import random


app = flask.Flask(__name__)
@app.route('/', methods=['GET'])
def index():
    return "/gateway for telemetry data"


@app.route('/gateway', methods=['GET'])
def send_data():
    data = generate_random_packet()
    data = flask.jsonify(data)
    data.headers.add('Access-Control-Allow-Origin', '*')
    return data


def generate_random_coordinate():
    coord_bounds = Polygon([
        (32.97175827941012, -106.965486509431), 
        (32.97636658833169, -106.92471693240464), 
        (33.01113716305164, -106.93424413882553), 
        (33.00699852735377, -106.97424123965561)
    ])
    min_x, min_y, max_x, max_y = coord_bounds.bounds
    random_coordinate = Point([random.uniform(min_x, max_x), random.uniform(min_y, max_y)])
    return random_coordinate


def generate_random_packet():
    coordinate = generate_random_coordinate()
    return {
        'Header': [
            coordinate.x,
            coordinate.y, 
            random.randint(0, 40),
            '00:00:00'
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
        ],
        'battery': [
            random.uniform(0, 100)
        ]
    }


if __name__=='__main__': 
    app.run(port=5000, debug=True)
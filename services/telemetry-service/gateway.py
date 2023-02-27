import flask
from utils.random_packet_generator import generate_random_packet


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


if __name__=='__main__': 
    app.run(port=5000, debug=True)
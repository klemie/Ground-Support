import flask
from flask_cors import cross_origin
from flask_socketio import SocketIO, send, emit
app = flask.Flask(__name__)
sio = SocketIO(app, cors_allow_origins='*', Debug=True)

@sio.on("loRa_packet")
@cross_origin()
def loRaPacket(packet):
    print(f"LoRa Packet: {packet}")
    send(packet, broadcast=True)

@sio.on("aprs_packet")
# @cross_origin()
def aprsPacket(packet):
    print(f"APRS Packet: {packet}")
    emit(packet, broadcast=True)

@sio.on("logs")
@cross_origin()
def logs(msg):
    print(f"Log sent: {msg}")
    send(msg, broadcast=True)

@app.route('/gateway/')
@cross_origin()
def gateway():
    print(f'Gateway')
    sio.emit('gateway')
    return 'Gateway'

@app.route('/gateway/lora/', methods=["POST"])
@cross_origin()
def loRaRoute():
    payload = flask.request.get_json(force=True)
    sio.emit('loRa_packet', payload)
    return flask.jsonify(f'echo\n{payload}')

@app.route('/gateway/aprs/', methods=["POST"])
@cross_origin()
def aprsRoute():
    payload = flask.request.get_json(force=True)
    sio.emit('aprs_packet', payload)
    return flask.jsonify(f'echo\n{payload}')

def trigger_aprs_route(packet: str):
    aprsPacket(packet)

async def start_socket():
    try:
        await sio.run(app=app, port=8080) 
    except Exception as error:
        print('Could not connect :(\n', error)

if __name__ == "__main__":
    sio.run(app=app, port=8080)
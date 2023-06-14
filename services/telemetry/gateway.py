import flask
from flask_socketio import SocketIO, send
from utils.random_packet_generator import generate_random_packet

app = flask.Flask(__name__)
gateway = SocketIO(app, cors_allow_origins='*')

@gateway.on("loRa_packet")
def loRaPacket(packet):
    print(f"LoRa Packet: {packet}")
    send(packet, broadcast=True)

@gateway.on("aprs_packet")
def aprsPacket(packet):
    print(f"APRS Packet: {packet}")
    send(packet, broadcast=True)

@gateway.on("logs")
def aprsPacket(msg):
    print(f"Log sent: {msg}")
    send(msg, broadcast=True)


if __name__=='__main__':
    gateway.run(app=app, port=8080) 

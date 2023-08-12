from flask import Flask, send_file
from flask_socketio import SocketIO, emit
import random
import time

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins='*', async_mode='threading')

# Function to emit random data every 2 seconds
def emit_random_data():
    with app.test_request_context('/'):
        while True:
            # Generate random data (you can replace this with your data)
            aprs_packet = "APRS Data: " + str(random.uniform(1.0, 100.0))
            lora_packet = "LoRa Data: " + str(random.uniform(50.0, 200.0))

            # Emit the data to the clients
            socketio.emit('aprs_packet', aprs_packet, namespace='/data2')
            socketio.emit('loRa_packet', lora_packet, namespace='/data2')
            
            # Wait for 2 seconds before emitting again
            time.sleep(2)

def send_APRS_packet(packet):
    print('sending packet')
    with app.test_request_context('/'):
        socketio.emit('aprs_packet', packet, namespace='/data2')
# Route to serve the frontend

@app.route('/')
def index():
    return send_file('templates/index.html')

# SocketIO event to handle client connection
@socketio.on('aprs_packet_telemetry', namespace='/data')
def aprs_relay(packet):
    print(packet)
    send_APRS_packet(packet)

# SocketIO event to handle client connection
@socketio.on('connect', namespace='/data')
def on_connect():
    print('Client connected')

# SocketIO event to handle client connection
@socketio.on('connect', namespace='/data2')
def on_connect():
    print('Client connected')

# SocketIO event to handle client disconnection
@socketio.on('disconnect', namespace='/data')
def on_disconnect():
    print('Client disconnected')

# SocketIO event to handle client disconnection
@socketio.on('disconnect', namespace='/data2')
def on_disconnect():
    print('Client disconnected 2')

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8086, debug=True)
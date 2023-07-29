from flask import Flask, send_file
from flask_socketio import SocketIO, emit
import random
import time
import threading

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins=['http://localhost:3000'], async_mode='threading')

# Function to emit random data every 2 seconds
def emit_random_data():
    with app.test_request_context('/'):
        while True:
            # Generate random data (you can replace this with your data)
            aprs_packet = "APRS Data: " + str(random.uniform(1.0, 100.0))
            lora_packet = "LoRa Data: " + str(random.uniform(50.0, 200.0))

            # Emit the data to the clients
            socketio.emit('aprs_packet', aprs_packet, namespace='/data')
            socketio.emit('loRa_packet', lora_packet, namespace='/data')
            # emit('cool_message',{'a':'b'}, namespace='/data')
            

            # Wait for 2 seconds before emitting again
            time.sleep(2)

# Route to serve the frontend
@app.route('/')
def index():
    return send_file('templates/index.html')

# SocketIO event to handle client connection
@socketio.on('connect', namespace='/data')
def on_connect():
    print('Client connected')
    emit('aprs_packet', 'APRS Data: 0.0', namespace='/data')

# SocketIO event to handle client disconnection
@socketio.on('disconnect', namespace='/data')
def on_disconnect():
    print('Client disconnected')

if __name__ == '__main__':
    # Start the background thread to emit data
    data_thread = threading.Thread(target=emit_random_data)
    data_thread.daemon = True
    data_thread.start()

    # Start the SocketIO server
    socketio.run(app, host='0.0.0.0', port=8086, debug=True)
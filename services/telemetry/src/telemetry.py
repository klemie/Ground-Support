#!/usr/bin/env python
import sys
from utils.bigRedBeeDecoder import parse_aprs

import socketio

sio = socketio.Client()
URL = 'http://127.0.0.1:8080/gateway/'

def aprs_loop():
    
    try:
        sio.connect("http://127.0.0.1:8086", namespaces=['/fromDirewolf'])
    except:
        print("Error: Could not connect to socket gateway")

    raw_packet_list = []
        
    while True: 
        input = []
        currentData = {
            "Parsed": {},
            "Raw": []
        }
        
        for line in sys.stdin.readline().splitlines():
            input.append(line)
  
        raw_packet_list.append('\n'.join(input))

        if input == ['']:  # Start of packet
            parsed_packet = parse_aprs(','.join(raw_packet_list))
            currentData["Parsed"] = parsed_packet
            currentData["Raw"] = raw_packet_list
            telemetry_packet = {
                "Type": "APRS",
                "Data": currentData,
            }
            print(raw_packet_list)
            try:
                sio.emit('aprs_packet_telemetry', telemetry_packet, namespace='/fromDirewolf')
            except:
                print('\n')
                print(telemetry_packet)
                print("Error: Could not send packet over socket gateway \n")
            raw_packet_list = []


if __name__ == "__main__":
    aprs_loop()
    sio.disconnect()
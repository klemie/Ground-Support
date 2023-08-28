#!/usr/bin/env python
import os
import sys
import shutil
from subprocess import Popen, PIPE, run
import requests
 
from utils.random_packet_generator import direwolf_mock
import time

import socketio

# standard Python
sio = socketio.Client()

URL = 'http://127.0.0.1:8080/gateway/'
FREQUENCY_ONE = "433.92M"
FREQUENCY_TWO = "194.3M"
TEST = False
MOCK = False

ARPS_PACKET = {
    "Position": "",
    "N": "",
    "W": "",
    "alt": ""
}
def aprs_loop():
    
    # try:
    sio.connect("http://127.0.0.1:8086", namespaces=['/fromDirewolf'])
        
    while True:
        packet = direwolf_mock().splitlines() if MOCK else sys.stdin
        # packet = sys.stdin.readline().splitlines()
        print(packet)
        currentData = {
            "Position": "",
            "N": "",
            "W": "",
            "alt": ""
        }
        if MOCK:
            time.sleep(3)

        for line in packet:
            print(line)
            if "Position" in line:
                LOCK = True
                currentData["Position"] = line[10:]
                currentData["Position"] = currentData["Position"][0:-1]
            if "N " in line:
                currentData["N"] = line[2:12]
            if "W " in line:
                currentData["W"] = line[14:25]
            if "alt " in line:
                print('alt: ', line[29:])
                currentData["alt"] = line[29:]
            if "Invalid character in compressed longitude" in line:
                LOCK = False
                telemetry_packet = {
                    "Type": "APRS",
                    "Data": {
                        "Locked": "error GPS not locked"  
                    }
                }
                print("error: GPS is not locked")

        # if currentData != ARPS_PACKET:
        telemetry_packet = {
                "Type": "APRS",
            "Data": currentData
        }
        print(telemetry_packet)
        sio.emit('aprs_packet_telemetry', telemetry_packet, namespace='/fromDirewolf')




if __name__ == "__main__":
    aprs_loop()
    sio.disconnect()
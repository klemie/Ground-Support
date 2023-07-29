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
FREQUENCY_ONE = "441.35M"
FREQUENCY_TWO = "194.3M"
TEST = False
MOCK = True

if TEST:
    a = Popen(["././rtl-sdr/rtl_fm.exe", "-f", FREQUENCY_ONE, "-d", "0", "-g", "49.6", "-r", "48k", "-p", "93", "-"], shell = True)
    b = Popen(["././rtl-sdr/rtl_fm.exe", "-f", FREQUENCY_TWO, "-d", "0", "-g", "49.6", "-r", "48k", "-p", "93"], shell = True)
    stdout, stderr = a.communicate()
    b = Popen(["./direwolf-1.6.0-413855e_x86_64/direwolf"], shell=True, stdin=a.stdout)

ARPS_PACKET = {
    "Position": "",
    "N": "",
    "W": "",
    "alt": ""
}

def aprs_loop():
    packet = direwolf_mock().splitlines() if MOCK else sys.stdin
    try:
        sio.connect("http://localhost:8086", namespaces=['/data'])
        
        while True:
            currentData = {
                "Position": "",
                "N": "",
                "W": "",
                "alt": ""
            }
            if MOCK:
                time.sleep(3)

            for line in packet:
                if "Position" in line:
                    currentData["Position"] = line[10:]
                    currentData["Position"] = currentData["Position"][0:-1]
                if "N " in line:
                    currentData["N"] = line[2:12]
                if "W " in line:
                    currentData["W"] = line[14:25]
                if "alt " in line:
                    print('alt: ', line[29:])
                    currentData["alt"] = line[29:]
                    # currentData["alt"] = currentData["alt"][0:-4]
                if "Invalid character in compressed longitude" in line:
                    print("error: GPS is not locked")

            if currentData != ARPS_PACKET:
                telemetry_packet = {
                    "Type": "APRS",
                    "Data": currentData
                }
            # send_APRS_packet("asdf")
            print(telemetry_packet)
            sio.emit('aprs_packet_telemetry', telemetry_packet, namespace='/data')
    except KeyboardInterrupt:
        print("Exiting")
        sio.disconnect()
        exit(0)

if __name__ == "__main__":
    aprs_loop()
    sio.disconnect()
# async def loRa_loop(): 
#     return
    
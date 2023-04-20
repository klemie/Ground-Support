#!/usr/bin/env python
import os
import sys
import shutil
from subprocess import Popen, PIPE, run

FREQUENCY_ONE = "441.35M"
FREQUENCY_TWO = "194.3M"
TEST = False

if TEST:
    a = Popen(["./rtl-sdr/rtl_fm.exe", "-f", FREQUENCY_ONE, "-d", "0", "-g", "49.6", "-r", "48k", "-p", "93", "-"], shell = True)
    b = Popen(["./rtl-sdr/rtl_fm.exe", "-f", FREQUENCY_TWO, "-d", "0", "-g", "49.6", "-r", "48k", "-p", "93"], shell = True)
    stdout, stderr = a.communicate()
    b = Popen(["./direwolf-1.6.0-413855e_x86_64/direwolf"], shell=True, stdin=a.stdout)

currentData = {
    "Position": "",
    "N": "",
    "W": "",
    "alt": ""
}

while True:
    for line in sys.stdin:
        if "Position" in line:
            currentData["Position"] = line[10:]
            currentData["Position"] = currentData["Position"][0:-1]
        if "N " in line:
            currentData["N"] = line[2:12]
        if "W " in line:
            currentData["W"] = line[14:25]
        if "alt " in line:
            currentData["alt"] = line[33:]
            currentData["alt"] = currentData["alt"][0:-4]
        if "Invalid character in compressed longitude" in line:
            print("error: GPS is not locked")
        # API CALL (Yay!)

#!/usr/bin/env python
import os
import sys
import shutil
from subprocess import Popen, PIPE, run

a = Popen(["C:/Users/jackw/uvic/rocketry/Ground-Support/services/telemetry-service/rtl-sdr/rtl_fm.exe", "-f", "194.3M", "-d", "1", "-g", "49.6", "-r", "48k", "-p", "93", "-"], shell = True)
b = Popen(["C:/Users/jackw/uvic/rocketry/Ground-Support/services/telemetry-service/rtl-sdr/rtl_fm.exe", "-f", "194.3M", "-g", "49.6", "-r", "48k", "-p", "93", "-"], shell = True)
# stdout, stderr = a.communicate()
# c = Popen(["rtl-sdr/rtl_fm", "-f", "250.3M"], stdout=PIPE, stderr=PIPE)
# print(stdout)
# print(c.stdin)
# b = Popen(["./direwolf-1.6.0-413855e_x86_64/direwolf"], stdin=a.stdout)
# while True:
#     out = a.stdout.read(1)
#     if out == "b''" and a.poll() != None:
#         break
#     if out != "b''":
#         # sys.stdout.write(str(out))
#         # sys.stdout.flush()
#         print(out.decode())

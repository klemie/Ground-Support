#!/usr/bin/env python
import os
import sys
import shutil
from subprocess import Popen, PIPE

a = Popen(["rtl-sdr/rtl_fm", "-f", "194.3"], stdout=PIPE, stderr=PIPE)
b = Popen(["./direwolf-1.6.0-413855e_x86_64/direwolf"], stdin=a.stdout)

import time
import random

while True:
    lat_north = random.random() * 10000
    lat_west = random.random() * 10000
    altitude = random.random() * 10000
    print("VA7JCK-1 audio level = 38(5/5)   [NONE]   |||||||__")
    print("[0.3] VA7JCK-1>APBL10:!{:.2f}N/{:.2f}W-/A={:6.0f}*".format(lat_north, lat_west, altitude))
    print("Position, House QTH (VHF)")
    print("N {:.2f}, W {:.2f}, alt {:.0f} ft".format(lat_north, lat_west, altitude))
    print("*")
    print()
    time.sleep(3)
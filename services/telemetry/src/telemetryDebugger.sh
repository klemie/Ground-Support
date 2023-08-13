#Usage: arguments optional.
#First arg: Frequency (default 98.5M)
#Second arg: Gain (default 49.6)
#Third arg: PPM error (default 93)

#Set frequency
if [ $# -ge 1 ]
then
  FREQ=$1
else
  FREQ=433.92M
fi

#Set gain
if [ $# -ge 2 ]
then
  GAIN=$2
else
  GAIN=49.6
fi

#Set ppm error (Find for individual stick using Kalibrate)
if [ $# -ge 3 ]
then
  PPM=$3
else
  PPM=93
fi

# ( rtl-sdr/rtl_fm.exe -f $FREQ -r 24k -s 260k -o 4 -p $PPM -g $GAIN - | direwolf/direwolf.exe -n 1 -r 24000 -b 16 - > /dev/null ) | python telemetry.py
# ( rtl-sdr/rtl_fm.exe -f $FREQ -r 24k -s 260k -o 4 -p $PPM -g $GAIN - | direwolf/direwolf.exe -n 1 -r 24000 -b 16 - ) 2>/dev/null | python telemetry.py
rtl-sdr/rtl_fm.exe -f $FREQ -r 48k -s 260k -p $PPM -g $GAIN - | direwolf/direwolf.exe -n 1 -r 48000 -b 16 -t 0 - | python telemetry.py

# rtl-sdr/rtl_fm.exe -f $FREQ -s 260k -g $GAIN -r 48k -p $PPM - | direwolf -n 1 -r 48000 -b 16 -t 0 -
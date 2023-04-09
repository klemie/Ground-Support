#Usage: arguments optional.
#First arg: Frequency (default 98.5M)
#Second arg: Gain (default 49.6)
#Third arg: PPM error (default 93)

#Set frequency
if [ $# -ge 1 ]
then
  FREQ=$1
else
  FREQ=144.39M
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

rtl-sdr/rtl_fm.exe -f $FREQ -r 24k -s 260k -o 4 -p $PPM -g $GAIN - | direwolf-1.6.0-413855e_x86_64/direwolf.exe -n 1 -r 24000 -b 16 - 
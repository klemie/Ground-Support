#!/bin/bash

# Define the data lines to be piped
data="-1 audio level = 19(3/3)   [NONE]   |||||||__"
data+="\n[0.3] -1>APBL10:!4829.23N/08111.94W-/A=000922*"
data+="\nStation address, in position 1, is empty!  This is not a valid AX.25 frame."
data+="\nPosition, House QTH (VHF)"
data+="\nN 48 29.2300, W 081 11.9400, alt 922 ft"
data+="\n*"
data+="\nStation address, in position 1, is empty!  This is not a valid AX.25 frame."
data+="\nStation address, in position 1, is empty!  This is not a valid AX.25 frame."
data+="\nStation address, in position 1, is empty!  This is not a valid AX.25 frame."
data+="\nStation address, in position 1, is empty!  This is not a valid AX.25 frame."
data+="\nStation address, in position 1, is empty!  This is not a valid AX.25 frame."

# Print data repeatedly
while true; do
  echo -e "$data"
  sleep 3  # Delay for 3 seconds
done
# Ground Support Telemetry

## Overview
![image](https://github.com/UVicRocketry/Ground-Support/assets/79673714/4d12a609-4c14-40fd-9f79-fe8ffff7273d)

The Telemetry Backend implementation runs a socket server as well as a receiving and decoding thread. The decoding thread receives incoming encoded data from the rtl-sdr and decodes and packages it. Once data has been processed, the socket server will send data over sockets to the front end. Front end can also send a message to the socket server to prompt it to change receiving settings. This could include a change in encoding type (APRS, LORA) or other changes such as frequency. Socket sever will cause receiving thread to change its settings and run as usual.

## Socket Server
The socket server is the main communication hub for the telemetry module. Telemetry data is sent throught this server to the front end once it has been decoded and recieved through the Decoding Thread. The front end can also communicate with the socket server to change receiver settings such as encoding type and frequency. 

## Recieving and Decoding Thread
The receiving and decoding thread is spawned by the socket server, and is used to receive and decode telemetry data sent from the rocket using an RTL-SDR and RTL-FM. Depending on the settings specified by the front end, the thread will listen on one frequency to one signal. Only compatible with RTL-SDR.

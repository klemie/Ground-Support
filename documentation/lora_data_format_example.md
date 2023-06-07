This document contains an example of an encoded LoRa packet with only one
message. The actual binary file of the example is located in 
`/documentation/resources/example_lora_packet.bin`

This json data was encoded in the binary format: 

```json
{
    "timestamp": 1521366,
    "status": {
        "code": 1,
        "apogee_detected": true,
        "lsm_error": false,
        "bme_error": false,
        "strain_gauge_error": true,
    },
    "lsm": {
        "acceleration": [0.0, 0.4, 9.8],
        "magnetic_field": [0.2, 0.3, 0.0],
        "rotation": [0.0, 0.0, 10.0],
    },
    "bme": {
        "humidity": 20.0,
        "temperature": 33.2,
        "pressure": 1013.3,
    },
    "strain_gauges": [
        2048, -1024, 4096, 0, 0, 186368,
           0,     0,    0, 0, 0,      0,
    ]
}
```

Which turned into this data:

```text
00 00 17 36  D6 01 01 90
02 80 00 83  33 CE 66 81
9A 82 66 80  00 80 00 80
00 80 A4 03  33 33 63 FE
E4 42 04 00  01 00 00 FF
FF 00 04 04  00 FF FE 00
00 00 01 00  02 FF FF FF
FE 00 04
```

Turning it back into regular data may lead to some small floating point
differences, but those differences will be very small and should be obious
whether the decoding was done completely wrong or not.

**This is only one message inside of a packet, in the real thing, there will 
be usually 5 messages consequtively followed by a 16 bit crc**. Messages can
be distinguished from each other by finding another timestamp.

This is a very high-level seudo code for decoding:

```text
timestamp = next byte;
lsm_reading = 0;
bme_reading = 0;
sg_reading = 0;
status_reading = 0;

while bytes left {
    id = next byte;
    
    if lsm, store lsm, etc...;
    
    if id is timestamp id {
        // This will basically store the current
        // readings into some sort of array or database kinda
        // thing.
        save all values as a message;
        timestamp = read 4 bytes;
        
        // Now you are in a new packet.
    }
}
```


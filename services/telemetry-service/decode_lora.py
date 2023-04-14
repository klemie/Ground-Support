#!/usr/bin/env python
import os
import sys

TIMESTAMP_ID = 0x00
STATUS_ID = 0x01
LSM_ID = 0x02
BME_ID = 0x03
STRAIN_ID = 0x04

LENGTH_TIMESTAMP = 4
LENGTH_STATUS = 2
LENGTH_LSM = 18
LENGTH_BME = 6
LENGTH_STRAIN = 24

ACCEL_STEP = 0.000489
MAG_STEP = 0.000489
ANG_STEP = 0.061
TEMP_STEP = 0.0013
PRESSURE_STEP = 0.0122
HUMIDITY_STEP = 0.0015

class lora_message: 
    timestamp = None,
    status = None,
   # {
        
        # "apogee_detected": None,
        # "lsm_error": None,
        # "bme_error": None,
        # "strain_gauge_error": None,
    # },
    lsm = None
    # {
    #     "acceleration": [],
    #     "magnetic_field": [],
    #     "rotation": [],
    # },
    bme = None
    # {
    #     "humidity": None,
    #     "temperature": None,
    #     "pressure": None,
    # },
    strain_gauges = []

    def set_status(self, code):
        self.status = {"code":code}
    
    def set_lsm(self, acc, mag, rot):
        self.lsm = {
            "acceleration":acc,
            "magnetic_field":mag,
            "rotation":rot
        }
        
    def set_bme(self, hum, tmp, psr):
        self.bme = {
            "humidity": hum,
            "temperature": tmp,
            "pressure": psr
        },
    
    def set_strain(self, strain_data:list):
        self.strain_gauges = strain_data


messages_in_packet = []

current_message = None
packet = sys.stdin.buffer.read()
byte_index = 0;
while byte_index < len(packet):
    current_byte = packet[byte_index]
    if current_byte == TIMESTAMP_ID and (len(packet) - byte_index - LENGTH_TIMESTAMP > 0):
        current_message = lora_message()
        current_message.timestamp = packet[byte_index:byte_index+4]
        byte_index += 4
    elif current_byte == STATUS_ID and current_message is not None and (len(packet) - byte_index - LENGTH_STATUS > 0):
        current_message.set_status(packet[byte_index:byte_index+2])
        byte_index += 2
    elif current_byte == LSM_ID and current_message is not None and (len(packet) - byte_index - LENGTH_LSM> 0):
        byte_index += 1
        accel_x = float(packet[byte_index]<<8 | packet[byte_index+1]) * ACCEL_STEP
        byte_index += 2
        accel_y = int(packet[byte_index]<<8 | packet[byte_index+1]) * ACCEL_STEP
        byte_index += 2
        accel_z = int(packet[byte_index]<<8 | packet[byte_index+1]) * ACCEL_STEP
        byte_index += 2
        lsm_acceleration = [accel_x, accel_y, accel_z]

        mag_x = int(packet[byte_index]<<8 | packet[byte_index+1]) * MAG_STEP
        byte_index += 2
        mag_y = int(packet[byte_index]<<8 | packet[byte_index+1]) * MAG_STEP
        byte_index += 2
        mag_z = int(packet[byte_index]<<8 | packet[byte_index+1]) * MAG_STEP
        byte_index += 2
        lsm_magnetic_field = [mag_x, mag_y, mag_z]

        rot_x = int(packet[byte_index]<<8 | packet[byte_index+1]) * ANG_STEP
        byte_index += 2
        rot_y = int(packet[byte_index]<<8 | packet[byte_index+1]) * ANG_STEP
        byte_index += 2
        rot_z = int(packet[byte_index]<<8 | packet[byte_index+1]) * ANG_STEP
        byte_index += 1
        lsm_rotation= [rot_x, rot_y, rot_z]
        current_message.set_lsm(lsm_acceleration, lsm_magnetic_field, lsm_rotation)
    elif current_byte == BME_ID and current_message is not None and (len(packet) - byte_index - LENGTH_BME > 0):
        byte_index += 1
        bme_humidity = float(packet[byte_index] << 8 | packet[byte_index+1]) * HUMIDITY_STEP
        byte_index += 2
        bme_temperature = float(packet[byte_index] << 8 | packet[byte_index+1]) * TEMP_STEP
        byte_index += 2
        bme_pressure = float(packet[byte_index] << 8 | packet[byte_index+1]) * PRESSURE_STEP
        byte_index += 1
        current_message.set_bme(bme_humidity, bme_temperature, bme_pressure)
    elif current_byte == STRAIN_ID and current_message is not None and (len(packet) - byte_index - LENGTH_STRAIN > 0):
        byte_index += 1
        sg1 = packet[byte_index] << 8 + packet[byte_index+1]
        byte_index += 2
        sg2 = packet[byte_index] << 8 + packet[byte_index+1]
        byte_index += 2
        sg3 = packet[byte_index] << 8 + packet[byte_index+1]
        byte_index += 2
        sg4 = packet[byte_index] << 8 + packet[byte_index+1]
        byte_index += 2
        sg5 = packet[byte_index] << 8 + packet[byte_index+1]
        byte_index += 2
        sg6 = packet[byte_index] << 8 + packet[byte_index+1]
        byte_index += 2
        sg7 = packet[byte_index] << 8 + packet[byte_index+1]
        byte_index += 2
        sg8 = packet[byte_index] << 8 + packet[byte_index+1]
        byte_index += 2
        sg9 = packet[byte_index] << 8 + packet[byte_index+1]
        byte_index += 2
        sg10 = packet[byte_index] << 8 + packet[byte_index+1]
        byte_index += 2
        sg11 = packet[byte_index] << 8 + packet[byte_index+1]
        byte_index += 2
        sg12 = packet[byte_index] << 8 + packet[byte_index+1]
        byte_index += 2
        current_message.set_strain([sg1, sg2, sg3, sg4, sg5, sg6, sg7, sg8, sg9, sg10, sg11, sg12])
    else:
        print(str(current_message.lsm))
        print(str(current_message.bme))
        print(str(current_message.strain_gauges))
    byte_index += 1
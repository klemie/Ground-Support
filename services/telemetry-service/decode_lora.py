#!/usr/bin/env python
import os
import sys
import lora_config

TIMESTAMP_ID = 0x00
STATUS_ID = 0x01

LENGTH_TIMESTAMP = 4
LENGTH_STATUS = 2


config = lora_config.config

def bytes_to_int_unsigned(data):
    #return upper | lower + 1<<16 because python interprets int() as signed
    i = 0
    final = 0
    while i < len(data):
        shift_amount = len(data)-i-1
        cur_data = data[i]
        while shift_amount > 0:
            cur_data = cur_data<<8
            shift_amount -= 1
        final = final | cur_data
        i += 1
    # print(type(final))
    # print(final)
    return final

messages_in_packet = []

current_message = None
packet = sys.stdin.buffer.read()
print(len(packet))
byte_index = 0;
while byte_index < len(packet):
    current_byte = packet[byte_index]
    if current_byte == TIMESTAMP_ID and (len(packet) - byte_index - LENGTH_TIMESTAMP > 0):
        current_message = {}
        messages_in_packet.append(current_message)
        current_message["timestamp"] = packet[byte_index:byte_index+5]
        byte_index += 5
    elif lora_config.config["status"]["code"] == current_byte and current_message is not None and (len(packet) - byte_index - LENGTH_STATUS > 0):
        byte_index += 1
        print("b4 status " + str(byte_index) + str(packet[byte_index]))
        sys.stdout.buffer.write(bytes([packet[byte_index]]))
        current_message["status"] = lora_config.get_status_from_byte(packet[current_byte])
        current_message["flag"] = lora_config.get_flag_from_byte(packet[current_byte+1])
        byte_index += 2
    else:
        current_sensor = lora_config.get_sensor_from_code(current_byte)
        if current_sensor is not None:
            # print("byte index" + str(byte_index))
            keys = list(current_sensor["values"].keys())
            byte_index += 1
            q = 0
            for value in current_sensor["values"].values():
                # print(value)
                # print(byte_index)
                current_data = packet[byte_index:(byte_index+value["byte_length"])]
                # print("current data" + str(current_data))
                byte_index += value["byte_length"]
                current_data_int = bytes_to_int_unsigned(current_data)
                step = (value["max"] - value["min"]) / 65537
                current_message[keys[q]] = current_data_int * step + value["min"]
                q += 1
        else:
            byte_index += 1


        

    # elif current_byte == LSM_ID and current_message is not None and (len(packet) - byte_index - LENGTH_LSM> 0):
    #     byte_index += 1
    #     accel_x = bytes_to_int_signed(packet[byte_index], packet[byte_index+1]) * ACCEL_STEP
    #     byte_index += 2
    #     accel_y = bytes_to_int_signed(packet[byte_index], packet[byte_index+1]) * ACCEL_STEP
    #     byte_index += 2
    #     accel_z = bytes_to_int_signed(packet[byte_index], packet[byte_index+1]) * ACCEL_STEP
    #     byte_index += 2
    #     lsm_acceleration = [accel_x, accel_y, accel_z]

    #     mag_x = bytes_to_int_signed(packet[byte_index], packet[byte_index+1]) * MAG_STEP
    #     byte_index += 2
    #     mag_y = bytes_to_int_signed(packet[byte_index], packet[byte_index+1]) * MAG_STEP
    #     byte_index += 2
    #     mag_z = bytes_to_int_signed(packet[byte_index], packet[byte_index+1]) * MAG_STEP
    #     byte_index += 2
    #     lsm_magnetic_field = [mag_x, mag_y, mag_z]

    #     rot_x = bytes_to_int_signed(packet[byte_index], packet[byte_index+1]) * ANG_STEP
    #     byte_index += 2
    #     rot_y = bytes_to_int_signed(packet[byte_index], packet[byte_index+1]) * ANG_STEP
    #     byte_index += 2
    #     rot_z = bytes_to_int_signed(packet[byte_index], packet[byte_index+1]) * ANG_STEP
    #     byte_index += 1
    #     lsm_rotation= [rot_x, rot_y, rot_z]
    #     current_message.set_lsm(lsm_acceleration, lsm_magnetic_field, lsm_rotation)
    # elif current_byte == BME_ID and current_message is not None and (len(packet) - byte_index - LENGTH_BME > 0):
    #     byte_index += 1
    #     bme_humidity = bytes_to_int_signed(packet[byte_index], packet[byte_index+1]) * HUMIDITY_STEP 
    #     byte_index += 2
    #     bme_temperature = bytes_to_int_signed(packet[byte_index], packet[byte_index+1]) * TEMP_STEP
    #     byte_index += 2
    #     bme_pressure = bytes_to_int_unsigned(packet[byte_index], packet[byte_index+1]) * PRESSURE_STEP + PRESSURE_OFFSET
    #     byte_index += 1
    #     current_message.set_bme(bme_humidity, bme_temperature, bme_pressure)
    # elif current_byte == STRAIN_ID and current_message is not None and (len(packet) - byte_index - LENGTH_STRAIN > 0):
    #     byte_index += 1
    #     sg1 = bytes_to_int_signed(packet[byte_index], packet[byte_index+1])
    #     byte_index += 2
    #     sg2 = bytes_to_int_signed(packet[byte_index], packet[byte_index+1])
    #     byte_index += 2
    #     sg3 = bytes_to_int_signed(packet[byte_index], packet[byte_index+1])
    #     byte_index += 2
    #     sg4 = bytes_to_int_signed(packet[byte_index], packet[byte_index+1])
    #     byte_index += 2
    #     sg5 = bytes_to_int_signed(packet[byte_index], packet[byte_index+1])
    #     byte_index += 2
    #     sg6 = bytes_to_int_signed(packet[byte_index], packet[byte_index+1])
    #     byte_index += 2
    #     sg7 = bytes_to_int_signed(packet[byte_index], packet[byte_index+1])
    #     byte_index += 2
    #     sg8 = bytes_to_int_signed(packet[byte_index], packet[byte_index+1])
    #     byte_index += 2
    #     sg9 = bytes_to_int_signed(packet[byte_index], packet[byte_index+1])
    #     byte_index += 2
    #     sg10 = bytes_to_int_signed(packet[byte_index], packet[byte_index+1])
    #     byte_index += 2
    #     sg11 = bytes_to_int_signed(packet[byte_index], packet[byte_index+1])
    #     byte_index += 2
    #     sg12 = bytes_to_int_signed(packet[byte_index], packet[byte_index+1])
    #     byte_index += 2
    #     current_message.set_strain([sg1, sg2, sg3, sg4, sg5, sg6, sg7, sg8, sg9, sg10, sg11, sg12])
# print(str(current_message))
print(messages_in_packet)

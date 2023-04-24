#!/usr/bin/env python
import os
import sys
import lora_config

def bytes_to_int_unsigned(data):
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
    return final

messages_in_packet = []

current_message = None
packet = sys.stdin.buffer.read()
byte_index = 0;
while byte_index < len(packet):
    current_byte = packet[byte_index]
    if current_byte == lora_config.config["timestamp"]["code"] and (len(packet) - byte_index - lora_config.config["timestamp"]["length"] > 0):
        byte_index += 1
        current_message = {}
        messages_in_packet.append(current_message)
        current_message["timestamp"] = bytes_to_int_unsigned(packet[byte_index:byte_index + lora_config.config["timestamp"]["length"]])
        byte_index += lora_config.config["timestamp"]["length"]
    elif lora_config.config["status"]["code"] == current_byte and current_message is not None and (len(packet) - byte_index - lora_config.config["status"]["length"] > 0):
        byte_index += 1
        sys.stdout.buffer.write(bytes([packet[byte_index]]))
        current_message["status"] = lora_config.get_status_from_byte(packet[byte_index])
        current_message["flag"] = lora_config.get_flag_from_byte(packet[byte_index+1])
        byte_index += lora_config.config["status"]["length"]
    else:
        current_sensor = lora_config.get_sensor_from_code(current_byte)
        if current_sensor is not None and current_message is not None and (len(packet) - byte_index - current_sensor["length"] > 0):
            keys = list(current_sensor["values"].keys())
            byte_index += 1
            keys_index = 0
            for value in current_sensor["values"].values():
                current_data = packet[byte_index:(byte_index+value["byte_length"])]
                byte_index += value["byte_length"]
                current_data_int = bytes_to_int_unsigned(current_data)
                step = (value["max"] - value["min"]) / 65537
                current_message[keys[keys_index]] = current_data_int * step + value["min"]
                keys_index += 1
        else:
            byte_index += 1

# here is where data will be sent to API
print(messages_in_packet)

from shapely.geometry import Polygon, Point
import random
import datetime
from gps_coordinate_conversion import degree_minute_second 

'''
This file is used for mocking data
'''

def generate_random_coordinate():
    """
    Returns
    -------
        Generates a radom coordinate in the area of SAC
    """
    coord_bounds = Polygon([
        (32.97175827941012, -106.965486509431), 
        (32.97636658833169, -106.92471693240464), 
        (33.01113716305164, -106.93424413882553), 
        (33.00699852735377, -106.97424123965561)
    ])
    min_x, min_y, max_x, max_y = coord_bounds.bounds
    random_coordinate = Point([random.uniform(min_x, max_x), random.uniform(min_y, max_y)])
    return random_coordinate


def direwolf_mock():
    """
    Returns
    -------
        a look a like BRB direwolf transmitted package.
    """
    packet_number = f'{random.randint(34, 40)}({(random.randint(4,6), 6)})'
    coordinates = generate_random_coordinate()
    latitude_DMS = degree_minute_second(True, coordinates.x)
    longitude_DMS = degree_minute_second(False, coordinates.y)
    DMS_lat_encoded = f'{latitude_DMS["degrees"]}{latitude_DMS["minutes"]}.{latitude_DMS["seconds"]}{latitude_DMS["polarity"]}'
    DMS_long_encoded = f'{longitude_DMS["degrees"]}{longitude_DMS["minutes"]}.{longitude_DMS["seconds"]}{longitude_DMS["polarity"]}'
    DMS_lat_decoded = f'{latitude_DMS["polarity"]} {latitude_DMS["degrees"]} {latitude_DMS["minutes"]} {latitude_DMS["seconds"]}'
    DMS_long_decoded = f'{longitude_DMS["polarity"]} {longitude_DMS["degrees"]} {longitude_DMS["minutes"]} {longitude_DMS["seconds"]}'
    altitude = random.randint(150,10000)
    packet = f'VA7IIC-1 audio level = {packet_number}  [NONE]    ||||||___\n[0.3] VA7IIC-1>APBL10:!{DMS_lat_encoded}/{DMS_long_encoded}-/A=000170*\nPosition, House QTH (VHF)\n{DMS_lat_decoded}, {DMS_long_decoded}, alt {altitude}'
    return packet


def generate_random_packet():
    """
    Returns
    -------

    """
    coordinate = generate_random_coordinate()
    return {
        'header': {
            'latitude': coordinate.x,
            'longitude': coordinate.y, 
            'altitude': random.uniform(0, 10000),
            'satellites': random.randint(0, 40),
            'timeStamp': datetime.datetime.now().timestamp(),
        },
        'BME': {
            'altitude': random.uniform(-12, 12),
            'temperature': random.uniform(-32, 32),
            'humidity': random.uniform(0, 1000),
            'pressure' :random.uniform(-12, 12)
        },
        'LSM': {
            'acceleration_x': random.uniform(-12, 12),
            'acceleration_y': random.uniform(-12, 12),
            'acceleration_z': random.uniform(-12, 12),
            'gyroscope_x': random.uniform(-12, 12),
            'gyroscope_y': random.uniform(-12, 12),
            'gyroscope_z': random.uniform(-12, 12),
            'magnetometer_x': random.uniform(-12, 12),
            'magnetometer_y': random.uniform(-12, 12),
            'magnetometer_z': random.uniform(-12, 12)
        },
        'strainGauges': {
            'gauge_1': random.uniform(0, 100),
            'gauge_2': random.uniform(0, 100),
            'gauge_3': random.uniform(0, 100),
            'gauge_4': random.uniform(0, 100),
            'gauge_5': random.uniform(0, 100),
            'gauge_6': random.uniform(0, 100),
            'gauge_7': random.uniform(0, 100),
            'gauge_8': random.uniform(0, 100),
            'gauge_9': random.uniform(0, 100),
            'gauge_10': random.uniform(0, 100),
            'gauge_11': random.uniform(0, 100),
            'gauge_12': random.uniform(0, 100)
        },
        'rocketStatus': {
            'batteries': random.randint(0, 100),
            'latitude': coordinate.x,
            'longitude': coordinate.y,
            'altitude': random.randint(0, 100000)
        }
    }
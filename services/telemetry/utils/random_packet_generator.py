from shapely.geometry import Polygon, Point
import random
import datetime

'''
This file is used for mocking data
'''

def generate_random_coordinate():
    coord_bounds = Polygon([
        (32.97175827941012, -106.965486509431), 
        (32.97636658833169, -106.92471693240464), 
        (33.01113716305164, -106.93424413882553), 
        (33.00699852735377, -106.97424123965561)
    ])
    min_x, min_y, max_x, max_y = coord_bounds.bounds
    random_coordinate = Point([random.uniform(min_x, max_x), random.uniform(min_y, max_y)])
    return random_coordinate

def generate_random_packet():
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
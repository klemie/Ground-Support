import re 
import json 
import time

"""

    This function parses a line of data from a Big Red Bee GPS tracker and returns a JSON object with the following fields:
        - raw: the raw data string
        - callsign: the callsign of the tracker
        - latitude: the latitude of the tracker
        - longitude: the longitude of the tracker
        - altitude: the altitude of the tracker
        - timeStamp: the time the data was received
        - timeStampUnix: the time the data was received in unix time
        - lock: whether or not We got a lock on the GPS signal
"""
def parse_aprs (line):
    data = {}
    print(f'line: {line}')

    lat_regex = "(?P<lat1>\d{2})(?P<lat2>[0-9.]{5})(?P<latsign>[NS])"
    lon_regex = "(?P<lon1>\d{3})(?P<lon2>[0-9.]{5})(?P<lonsign>[WE])"
    alt_regex = "A=(?P<alt>\d*)"
    regex = lat_regex + ".*?" + lon_regex + ".*?" + alt_regex
    reg = re.compile(regex)
    m = re.search(regex, line)
    if m:
        print(m)
        latitude = float(m.group('lat1')) + (float(m.group('lat2')) / 60.0)
        latitude = latitude if m.group('latsign') == 'N' else -1*latitude
        longitude = float(m.group('lon1')) + (float(m.group('lon2')) / 60.0)
        longitude = longitude if m.group('lonsign') == 'E' else -1*longitude

        data['latitude'] = latitude
        data['longitude'] = longitude
        data['altitude'] = float(m.group('alt'))
        data['timeStampLocal'] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        data['timeStampUnix'] = time.time()*1000 
        data['lock'] = True
    else:
        data['lock'] = False
        data['timeStampLocal'] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        data['timeStampUnix'] = time.time()*1000 

    return data
import math

ONE_HOUR_MINUTES = 60
ONE_HOUR_SECONDS = 3600

def decimal_degrees(polarity: str, degrees: int, minutes: int, seconds: int):
    """
    Parameters
    ----------
    polarity: str 
        Latitude: N or S
        Longitude: E or W
    degree: int

    minutes: int

    seconds: int 

    Returns
    ------
    float 
        returns the decimal degrees format of a coordinates

    """
    DD = degrees + (minutes/ONE_HOUR_MINUTES) + (seconds/ONE_HOUR_SECONDS)
    polarity = 1 if (polarity=="N" or polarity=="E") else  -1
    return DD*polarity

def degree_minute_second(latitude: bool, decimal_degrees: float):
    """
    Parameters
    ----------
    latitude: bool
        specific weather coordinate is latitude or longitude
    decimal_degrees: float 

    Returns
    -------
        Coordinate in DMS format 
    """
    if latitude:
        polarity = "N" if decimal_degrees > 0 else "S"
    else:
        polarity = "E" if decimal_degrees > 0 else "W"

    decimal_degrees = -1*decimal_degrees if decimal_degrees < 0 else decimal_degrees

    degrees = math.floor(decimal_degrees)
    minutes = math.floor((decimal_degrees - degrees)*ONE_HOUR_MINUTES)
    seconds = math.floor((((decimal_degrees - degrees) - math.floor(decimal_degrees - degrees))*ONE_HOUR_MINUTES-minutes)*ONE_HOUR_MINUTES)
        
    return {
        "polarity": polarity,
        "degrees": degrees,
        "minutes": minutes,
        "seconds": seconds
    }

# print(degree_minute_second(latitude=True, decimal_degrees=-42.15188))
from enum import Enum

class Valves(Enum):
    N2OF    = "N2OF"
    N2OV    = "N2OV"
    N2F     = "N2F"
    RTV     = "RTV"
    NCV     = "NCV"
    EVV     = "EVV"
    IGPRIME = "IGPRIME"
    IGFIRE  = "IGFIRE"
    MEV     = "MEV"

class Identifiers(Enum):
    CONTROLS = 'CONTROLS'
    STATUS = 'STATUS'

class DataTypes(Enum):
    ABORT   = "ABORT"
    UNABORT = "UNABORT"
    SUMMARY = "SUMMARY"

class DataLabels(Enum):
    ARMED       = "ARMED"
    DISARMED    = "DISARMED"

class Actions(Enum):
    OPEN   = "OPEN"
    CLOSE  = "CLOSE"

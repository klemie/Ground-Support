from enum import Enum

SOURCE_TAG = "MCB"

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

class DataTypes(Enum):
    CTRL    = "CTRL"
    ABORT   = "ABORT"
    UNABORT = "UNABORT"
    ACK     = "ACK"
    CONNECT = "CONNECT"
    SUMMARY = "SUMMARY"

class DataLabels(Enum):
    N2OF        = "N2OF"
    N2OV        = "N2OV"
    N2F         = "N2F"
    RTV         = "RTV"
    NCV         = "NCV"
    EVV         = "EVV"
    IGPRIME     = "IGPRIME"
    IGFIRE      = "IGFIRE"
    MEV         = "MEV"
    ARMED       = "ARMED"
    DISARMED    = "DISARMED"

class DataValues(Enum):
    OPEN   = "OPEN"
    CLOSE  = "CLOSE"

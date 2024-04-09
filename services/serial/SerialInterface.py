# reference https://github.com/UVicRocketry/Hybrid-Controls-System/blob/33-comms-prot-fixing/src/MCC_GUI/comm.py

import serial 
import queue
import logbook
import os
import sys
from serialCommandTypes import Valves, DataTypes, DataLabels, DataValues, SOURCE_TAG

class SerialInterface:
    def __init__(self):
        self._message_queue = queue.Queue()
        self._control_queue = queue.Queue()
        self._verbose=False
        self._logger = logbook.Logger("SerialInterface")
        self._log = None
        self._port = "COM4" #set blank port if no config file
        self._connected = False
        self._desyncList=[]
        self._status="DCONN"
        self.valves= [
            Valves.N2OF,
            Valves.N2OV,
            Valves.N2F,
            Valves.RTV,
            Valves.NCV,
            Valves.EVV,
            Valves.IGPRIME,
            Valves.IGFIRE,
            Valves.MEV
        ]
        self.__configure_log()
        self.__init_stream()
    
    def __configure_log(self):
        '''
        Name:
            SerialInterface.configureLog() -> None
        Desc:
            Configures the log file
        '''
        self._log = logbook.FileHandler('serial.log', level='DEBUG', bubble=True)
        self._log.format_string = '{record.time:%Y-%m-%d %H:%M:%S.%f%z} [{record.level_name}] {record.channel}: {record.message}'
        self._log.push_application()

    def __init_stream(self):
        '''
        Name:
            SerialInterface._init_stream() -> None
        Desc:
            Initializes the serial port and sets the connection status
        '''
        try:
            self._stream = serial.Serial(port="COM4", baudrate=115200, timeout=0.1)
        except serial.SerialException as e:
            print(f"failed to open serial: {e}")
            pass
    
    
    @property
    def message_pending(self) -> bool:
        '''
        Name:
            SerialInterface.message_pending() -> bool
        Desc:
            Checks if theres any bytes in the serial buffer
        Returns:
            True if there is a message pending, False otherwise
        '''
        try:
            if self._stream.in_waiting > 0:
                return True
            else:
                return False
        except:
            return False
    

    def close(self) -> bool:
        '''
        Name:
            SerialInterface.close() -> None
        Desc:
            Closes the serial port
        Returns:
            True if the port was closed successfully, False otherwise
        '''
        try: 
            self._stream.close()
            self._connected = False
            return True
        except:
            return False

    def _abort(self):
        '''
        Name:
            SerialInterface._abort() -> None
        Desc:
            Sends an abort signal to the MCC
        '''
        with self.message_queue.mutex:
            self.message_queue.queue.clear()
           
    def _receive(self) -> bool:
        '''
        Name: 
            SerialInterface._receive() -> bool
        Desc: 
            Receives a message from the serial port. Should only be called on a 
            threaded process otherwise the program will hang.
        Returns:
            True if the message was received successfully, False otherwise
        '''
        message = ""
        try:
            message = message + self._stream.readline().decode()
            if message.endswith("\n"):
                self.message_queue.put(message)
                message = message.split(',')
                command = {''}
                for word in message[1:]:

            else: 
                self.__log.log("WARN", f"Received incomplete message: {message}")

            if "ABORT" in message:
                with self.message_queue.mutex:
                        self.message_queue.queue.clear()
                self.message_queue.put(message)

        except:
            self.__log.log("WARN", f"Failed to receive: {message}")
            return False
        return True
    
    def build_message(self, data_type, data_label, data_value, source_tag=SOURCE_TAG) -> str:
        '''
        Name:
            SerialInterface.build_message(source_tag="VC", data_type= DataTypes, data_label= DataLabels, data_value= DataValues) -> str
        Args:
            source_tag: the source of the command
            data_type: the type of data
            data_label: the label of the data
            data_value: the value of the data
        Returns:
            A string representing the command
        Desc:
            Builds a command string
        '''
        # example message f"VC,CTRL,MEV,OPEN\n"
        return f"VC,{data_type},{data_label},{data_value}\n"




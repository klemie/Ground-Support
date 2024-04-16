import websockets
import asyncio
import json
import serial
from serialCommandTypes import Valves, Actions


class WebsocketServer:
    def __init__(self, host="localhost", port=8080):
        self.__host = host
        self.__port = port
        self.server = None
        self.server_continue = None
        self.state = {
            'N2OF': 'CLOSE',
            'N2OV': 'CLOSE',
            'N2F': 'CLOSE',
            'RTV': 'CLOSE',
            'NCV': 'CLOSE',
            'EVV': 'CLOSE',
            'IGPRIME': 'CLOSE',
            'IGFIRE': 'CLOSE',
            'MEV': 'CLOSE'
        }
        try:
            self._stream = serial.Serial(port="COM4", baudrate=115200, timeout=0.1)
        except:
            print("MCB not connected")
    
    async def _stream_messages(self, websocket):
        message = self._stream.readline().decode()
        if message.endswith('\n'):
            message = message.strip().split(',')
            match message[1]:
                case 'ABORT':
                    command = {
                        'identifier': 'CONTROLS',
                        'command': 'ABORT'
                    }
                    await websocket.send(json.dumps(command))
                    
                case 'STATUS':
                    command = {
                        'identifier': 'STATUS',
                        'message': message[2]
                    }
                    await websocket.send(json.dumps(command))

                case 'SUMMARY':
                    for i in range(2, len(message), 2):
                        valve = message[i]
                        position = message[i+1]
                        if self.state[valve] != position:
                            self.state[valve] = position
                            command = {
                                'identifier': 'CONTROLS',
                                'valve': valve,
                                'action': position
                            }
                            await websocket.send(json.dumps(command))

    async def _handler(self, websocket):
        while True:    
            await self._stream_messages(websocket)
            await asyncio.sleep(0)

    async def start(self):
        '''
        Name:
            WebSocketServer.start() -> None
        Desc:
            Starts the websocket server
        '''
        async with websockets.serve(self._handler, self.__host, self.__port):
            await asyncio.Future()
    
socket = WebsocketServer()
asyncio.run(socket.start())

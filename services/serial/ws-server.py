import websockets
import serial
import asyncio
import json

class WebsocketServer:
    def __init__(self, host="localhost", port=8080):
        self.__host = host
        self.__port = port
        self.server = None
        self.server_continue = None
        try:
            self._stream = serial.Serial(port="COM4", baudrate=115200, timeout=0.1)
        except:
            print("MCB not connected")
    
    async def _stream_messages(self, websocket):
        message = self._stream.readline().decode()
        if message.endswith('\n'):
            message = message.strip()
            print(message)
            await websocket.send(message)

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

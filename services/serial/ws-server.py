import websockets
import SerialInterface
import asyncio
import json

class WebsocketServer:
    def __init__(self, host="localhost", port=8080):
        self.__host = host
        self.__port = port
        self.server = None
        self.server_continue = None
        try:
            self._serial_interface = SerialInterface()
        except:
            pass
    
    async def _handler(self, websocket):
        pass

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

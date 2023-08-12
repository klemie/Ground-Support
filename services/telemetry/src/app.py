import asyncio

from gateway import start_socket
from telemetry import aprs_loop

async def run():
    """Used to start the loop"""
    # try: 
    #     await start_socket()
    # except Exception as error:
    #     print("Could not start up socket", error)
    coroutines = []
    coroutines.append(asyncio.create_task(aprs_loop()))
    coroutines.append(asyncio.create_task(start_socket()))
    await coroutines.gather(*coroutines)

if __name__ == "__main__":
    asyncio.run(run())
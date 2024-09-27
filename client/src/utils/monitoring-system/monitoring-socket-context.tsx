import { 
    createContext, 
    PropsWithChildren, 
    useContext, 
    useEffect, 
    useState
} from 'react';

import useWebSocket from 'react-use-websocket';

import {
    IControlsPacket,
    IInstrumentationPacket
} from './monitoring-types';

export interface IMonitoringSocketContext {
    toggleConnection: () => void;
    connect: boolean;
    isConnected: boolean;
    isLabJackOn: boolean;
    isSerialOn: boolean;
    missionControlLogs: string[];
    valveCartLogs: string[];
    controlsPacketOut: IControlsPacket;
    setControlsPacketOut: (packet: IControlsPacket) => void;  
    instrumentationPacketOut: IInstrumentationPacket;
    setInstrumentationPacketOut: (packet: IInstrumentationPacket) => void;  
    instrumentationPacketIn: object;
    controlsPacketIn: object;
}

export const MonitoringContext = createContext<IMonitoringSocketContext>({
    toggleConnection: () => {},
    connect: false,
    isConnected: false,
    isLabJackOn: false,
    isSerialOn: false,
    missionControlLogs: [],
    valveCartLogs: [],
    controlsPacketOut: {} as IControlsPacket,
    setControlsPacketOut: (packet: IControlsPacket) => {},
    instrumentationPacketOut: {} as IInstrumentationPacket,
    setInstrumentationPacketOut: (packet: IInstrumentationPacket) => {},
    instrumentationPacketIn: {},
    controlsPacketIn: {}
});

// `192.168.0.1` when on cart and `localhost` for local develop
const URI = 'ws://192.168.0.1';

const SERIAL_SOCKET_URL = `${URI}:8080`;
const INSTRUMENTATION_SOCKET_URL = `${URI}:8888`;


export const MonitoringGateway = ({ children }: PropsWithChildren<any>) => {
    const [missionControlLogs, setMissionControlLogs] = useState<string[]>([]);
    const [isLabJackOn, setIsLabJackOn] = useState<boolean>(false);
    const [isSerialOn, setIsSerialOn] = useState<boolean>(false);
    const [valveCartLogs, setValveCartLogs] = useState<string[]>([]);
    const [controlsPacketOut, setControlsPacketOut] = useState<IControlsPacket>({} as IControlsPacket);
    const [instrumentationPacketOut, setInstrumentationPacketOut] = useState<IInstrumentationPacket>({} as IInstrumentationPacket);
    const [controlsPacketIn, setControlsPacketIn] = useState({});
    const [instrumentationPacketIn, setInstrumentationPacketIn] = useState({});
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [connect, setConnect] = useState<boolean>(false);
    const [serailSocketUrl, setSerialSocketUrl] = useState<string | null>(isConnected ? SERIAL_SOCKET_URL : null);
    const [instrumentationSocketUrl, setInstrumentationSocketUrl] = useState<string | null>(isConnected ? INSTRUMENTATION_SOCKET_URL : null);

    
    // Serail socket 
    const serialWebsocket = useWebSocket(serailSocketUrl, {
        // shouldReconnect: (closeEvent) => connect,
        onClose: () =>{
            console.log('Disconnected from Serial WSS');
            setValveCartLogs([]);
            setMissionControlLogs([]);
            setConnect(false);
            setIsConnected(false);
            setIsSerialOn(false);
        },
        onOpen: () => {
            console.log('Connected to Serial WSS');
            setConnect(true);
            setIsSerialOn(true);
        },
        share: true
    });

    // Instrumentation socket 
    const instrumentationWebsocket = useWebSocket(instrumentationSocketUrl, {
        shouldReconnect: (closeEvent) => connect,
        onClose: () =>{
            console.log('Disconnected from Instrumentation WSS');
            setValveCartLogs([]);
            setMissionControlLogs([]);
            setConnect(false);
            setIsConnected(false);
            setIsLabJackOn(false);
        },
        onOpen: () => {
            console.log('Connected to Instrumentation WSS');
            setConnect(true);
            setIsLabJackOn(true);
        },
        share: true
    });

    const toggleConnection = () => {
        setConnect(prevIsConnected => {
            if (prevIsConnected) {
                // If the WebSocket is currently connected, disconnect it
                setSerialSocketUrl(null);
                setInstrumentationSocketUrl(null);
            } else {
                // If the WebSocket is currently disconnected, connect it
                setSerialSocketUrl(SERIAL_SOCKET_URL);
                setInstrumentationSocketUrl(INSTRUMENTATION_SOCKET_URL);
            }
            return !prevIsConnected;
        });
    };


    useEffect(() => {
        if (serialWebsocket.lastMessage) {//|| instrumentationWebsocket.lastMessage) {
            const identifier: any = serialWebsocket.lastJsonMessage['identifier']

            console.log(`Identifier: ${identifier}`);
            console.log(serialWebsocket.lastJsonMessage);

            switch (identifier) {
                case "STARTUP":
                    if (serialWebsocket.lastJsonMessage['data'] == "S ON") {
                        console.log("serial is on")
                        setIsSerialOn(true);
                    } else if (serialWebsocket.lastJsonMessage['data'] == "VC CONNECTED") {
                        setIsConnected(true);
                    }
                    break;
                case "FEEDBACK":
                    if (serialWebsocket.lastJsonMessage['data'] != null) {
                        setControlsPacketIn(serialWebsocket.lastJsonMessage['data']);
                    }
                    break;
            }
            setValveCartLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleString()}] [INFO] - ${serialWebsocket.lastMessage.data}`]);
        }
    }, [ serialWebsocket.lastMessage ]);

    useEffect(() => {
        if (instrumentationWebsocket.lastMessage) {
            const identifier: any = instrumentationWebsocket.lastJsonMessage['identifier']

            console.log(`Identifier: ${identifier}`);
            console.log(serialWebsocket.lastJsonMessage);

            switch (identifier) {  
                case "INSTRUMENTATION":
                    console.log(instrumentationPacketIn)
                    if (instrumentationWebsocket.lastJsonMessage['data'] != null) {
                        setInstrumentationPacketIn(instrumentationWebsocket.lastJsonMessage['data'])
                        
                    }
                    break;
            }
            setValveCartLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleString()}] [INFO] - ${instrumentationWebsocket.lastMessage.data}`]);
        }
    }, [ instrumentationWebsocket.lastMessage ]);


    useEffect(() => {
        if (controlsPacketOut) {
            setMissionControlLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleString()}] [INFO] - ${JSON.stringify(controlsPacketOut)}`]);
            console.log(controlsPacketOut);
            serialWebsocket.sendJsonMessage(controlsPacketOut);
        }
    }, [controlsPacketOut]);
    
    useEffect(() => {
        if (instrumentationPacketOut) {
            // instrumentationWebsocket.sendJsonMessage(instrumentationPacketOut);
        }
    }, [instrumentationPacketOut]);

    return (
        <MonitoringContext.Provider 
            value={{ 
                toggleConnection,
                connect,
                isLabJackOn,
                isSerialOn,
                isConnected,
                valveCartLogs,
                missionControlLogs,
                controlsPacketOut,
                setControlsPacketOut,
                instrumentationPacketOut,
                setInstrumentationPacketOut,
                controlsPacketIn,
                instrumentationPacketIn
            }}
        >
            {children}
        </MonitoringContext.Provider>
    );
}

export const useMonitoringSocketContext = () => useContext<IMonitoringSocketContext>(MonitoringContext);

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
    const [socketUrl, setSocketUrl] = useState<string | null>(isConnected ? 'ws://192.168.0.1:8888' : null);

    const port = import.meta.env.MONITORING_SYSTEM_PORT 
        ? import.meta.env.MONITORING_SYSTEM_PORT 
        : 8888;
    const uri = import.meta.env.MONITORING_SYSTEM_URI 
        ? import.meta.env.MONITORING_SYSTEM_PORT
        : 'ws://localhost/';

    // TODO: change to button start socket connection
    
    const {
        sendJsonMessage,
        lastMessage,
        lastJsonMessage
    } = useWebSocket(socketUrl, {
        shouldReconnect: (closeEvent) => connect,
        onClose: () =>{
            console.log('Disconnected from Valve Cart');
            setConnect(false);
            setIsConnected(false);
            setIsLabJackOn(false);
            setIsSerialOn(false);
        },
        onOpen: () => {
            console.log('Connected to Valve Cart');
            setConnect(true);
        },
        share: true
    });

    const toggleConnection = () => {
        setConnect(prevIsConnected => {
            if (prevIsConnected) {
                // If the WebSocket is currently connected, disconnect it
                setSocketUrl(null);
            } else {
                // If the WebSocket is currently disconnected, connect it
                setSocketUrl(`ws://192.168.0.1:8888`);
            }
            return !prevIsConnected;
        });
    };


    useEffect(() => {
        if (lastJsonMessage) {
            const identifier: any = lastJsonMessage['identifier'];
            console.log(lastJsonMessage)
            switch (identifier) {
                case "STARTUP":
                    if (lastJsonMessage['data'] == "S ON") {
                        console.log("serial is on")
                        setIsSerialOn(true);
                    } else if (lastJsonMessage['data'] == "LJ ON") {
                        setIsLabJackOn(true);
                    } else if (lastJsonMessage['data'] == "VC CONNECTED") {
                        setIsConnected(true);
                    }
                    break;
            }
            setValveCartLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleString()}] [INFO] - ${lastMessage.data}`]);
        }
    }, [lastJsonMessage]);


    useEffect(() => {
        if (controlsPacketOut) {
            console.log("packet out")
            setMissionControlLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleString()}] [INFO] - ${JSON.stringify(controlsPacketOut)}`]);
            sendJsonMessage(controlsPacketOut);
        }
    }, [controlsPacketOut]);
    
    useEffect(() => {
        if (instrumentationPacketOut) {
            sendJsonMessage(instrumentationPacketOut);
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

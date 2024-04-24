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
import { useLogContext } from '../../components/logging/LogContext';

export interface IMonitoringSocketContext {
    toggleConnection: () => void;
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
    const [valveCartLogs, setValveCartLogs] = useState<string[]>([]);
    const [controlsPacketOut, setControlsPacketOut] = useState<IControlsPacket>({} as IControlsPacket);
    const [instrumentationPacketOut, setInstrumentationPacketOut] = useState<IInstrumentationPacket>({} as IInstrumentationPacket);
    const [controlsPacketIn, setControlsPacketIn] = useState({});
    const [instrumentationPacketIn, setInstrumentationPacketIn] = useState({});
    const [isConnected, setIsConnected] = useState<boolean>(false);
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
        lastJsonMessage,
        getWebSocket
    } = useWebSocket(socketUrl, {
        shouldReconnect: (closeEvent) => isConnected,
        onClose: () =>{
            console.log('Disconnected from Valve Cart');
            setIsConnected(false);
        },
        onOpen: () => {
            console.log('Connected to Valve Cart');
            setIsConnected(true);
        },
        share: true
    });

    const toggleConnection = () => {
        setIsConnected(prevIsConnected => {
            if (prevIsConnected) {
                // If the WebSocket is currently connected, disconnect it
                setSocketUrl(null);
            } else {
                // If the WebSocket is currently disconnected, connect it
                setSocketUrl(`ws://localhost:8888`);
            }
            return !prevIsConnected;
        });
    };
    useEffect(() => {
        if (lastMessage) {
            setValveCartLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleString()}] [INFO] - ${lastMessage.data}`]);
        }
    }, [lastMessage]);

    useEffect(() => {
        if (lastJsonMessage) {
            // setValveCartLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleString()}] [INFO] - ${lastMessage.data}`]);
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

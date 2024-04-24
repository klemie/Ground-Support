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
    const [connection, setConnection] = useState<boolean>(true);

    const [packetNumber, setPacketNumber] = useState<number>(0);

    const port = import.meta.env.MONITORING_SYSTEM_PORT 
        ? import.meta.env.MONITORING_SYSTEM_PORT 
        : 8888;
    const uri = import.meta.env.MONITORING_SYSTEM_URI 
        ? import.meta.env.MONITORING_SYSTEM_PORT
        : 'ws://localhost/';

    // TODO: change to button start socket connection
    const toggleConnection = () => {
        setConnection(!connection);
    };

    const {
        sendJsonMessage,
        lastMessage,
        lastJsonMessage
    } = useWebSocket(`ws://192.168.0.1:8888`, {
        onOpen: () => console.log('Connected to Valve Cart'),
        shouldReconnect: (closeEvent) => true
    });

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

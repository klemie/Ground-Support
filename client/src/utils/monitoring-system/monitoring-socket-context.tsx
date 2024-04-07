import { 
    createContext, 
    PropsWithChildren, 
    useContext, 
    useEffect, 
    useState, 
    useReducer 
} from 'react';

import useWebSocket, { ReadyState } from 'react-use-websocket';

import {
    PacketType,
    ControlsActionTypes, 
    ControlsCommandTypes, 
    ControlsValveTypes, 
    IControlsPacket,
    IInstrumentationPacket
} from './monitoring-types';

export interface IMonitoringSocketContext {
    toggleConnection: () => void;
    logs: string[];
    controlsPacketOut: IControlsPacket;
    setControlsPacketOut: (packet: IControlsPacket) => void;  
    instrumentationPacketOut: IInstrumentationPacket;
    setInstrumentationPacketOut: (packet: IInstrumentationPacket) => void;  
    instrumentationPacketIn: object;
    controlsPacketIn: object;
}

export const MonitoringContext = createContext<IMonitoringSocketContext>({
    toggleConnection: () => {},
    logs: [],
    controlsPacketOut: {} as IControlsPacket,
    setControlsPacketOut: (packet: IControlsPacket) => {},
    instrumentationPacketOut: {} as IInstrumentationPacket,
    setInstrumentationPacketOut: (packet: IInstrumentationPacket) => {},
    instrumentationPacketIn: {},
    controlsPacketIn: {}
});

export const MonitoringGateway = ({ children }: PropsWithChildren<any>) => {
    const [logs, setLogs] = useState<string[]>([]);
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
        sendMessage,
        sendJsonMessage,
        lastMessage,
        lastJsonMessage,
        readyState,
        getWebSocket
    } = useWebSocket(`ws://localhost:8888`, {
        onOpen: () => console.log('Connected to Valve Cart'),
        shouldReconnect: (closeEvent) => true
    });

    useEffect(() => {
        if (lastMessage) {
            setLogs((prevLogs) => [...prevLogs, lastMessage.data]);
        }
    }, [lastMessage]);

    useEffect(() => {
        if (lastJsonMessage) {
            console.log(lastJsonMessage);
            setLogs((prevLogs) => [...prevLogs, JSON.stringify(lastJsonMessage)]);
        }
    }, [lastJsonMessage]);


    useEffect(() => {
        if (controlsPacketOut) {
            sendJsonMessage(controlsPacketOut);
            console.log(controlsPacketOut);
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
                logs,
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

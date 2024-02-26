import { 
    createContext, 
    PropsWithChildren, 
    useContext, 
    useEffect, 
    useState, 
    useReducer 
} from 'react';

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
    const [connection, setConnection] = useState<boolean>(false);

    const [packetNumber, setPacketNumber] = useState<number>(0);

    const port = import.meta.env.MONITORING_SYSTEM_PORT 
        ? import.meta.env.MONITORING_SYSTEM_PORT 
        : 9193;
    const uri = import.meta.env.MONITORING_SYSTEM_URI 
        ? import.meta.env.MONITORING_SYSTEM_PORT
        : 'ws://localhost';

    // TODO: change to button start socket connection
    const toggleConnection = () => {
        setConnection(!connection);
    };

    const ws = new WebSocket(`${uri}:${port}`);
   
    
    const enableLiveMode = () => {
        ws.send(JSON.stringify({ type: 'establish_stream' }));
    };

    useEffect(() => {
        setConnection(!connection);
        if (!connection) {
            ws.close();
        }
        ws.onopen = () => {
            setLogs((prev) => [...prev, 'Connected to Valve Cart']);
            console.log('Connected to Valve Cart');
            enableLiveMode();
        };

        ws.onclose = () => {
            setLogs((prev) => [...prev, 'Closed Connection with Valve Cart']);
            console.log('Closed Connection with Valve Cart');
        };
    }, [connection]);

    ws.addEventListener('open', () => {
		console.log('Socket Connected');
		enableLiveMode();
	});

    /*------------ Controls Transmitting -------------*/

    const controlsPacketTransmittingHandler = (packet: IControlsPacket) => {
        ws.send(JSON.stringify(packet));
    }

    useEffect(() => {
        if (ws.OPEN) {
            controlsPacketTransmittingHandler(controlsPacketOut);
        }
    }, [controlsPacketOut]);

    /*------------ Instrumentation Transmitting -------------*/

    const instrumentationPacketTransmittingHandler = (packet: IInstrumentationPacket) => {
        ws.send(JSON.stringify(packet));
    }

    useEffect(() => {
        if (ws.OPEN) {
            instrumentationPacketTransmittingHandler(instrumentationPacketOut);
        }
    }, [instrumentationPacketIn]);

    /*------------ Receiving -------------*/

    ws.onmessage = (event: MessageEvent) => {
        const packet: IControlsPacket | IInstrumentationPacket = JSON.parse(event.data);
        const receivedTimeStamp = new Date(Date.now());
        setPacketNumber(packetNumber + 1);

        const packetString = {
            packetNumber: packetNumber,
            receivedTimeStamp: receivedTimeStamp,
            data: packet
        }
        
        switch (packet.identifier) {
            case PacketType.CONTROLS:
                setControlsPacketIn(packet);
                setLogs((prev) => [...prev, JSON.stringify(packetString)]);
                break;

            case PacketType.INSTRUMENTATION:
                setInstrumentationPacketIn(packet);
                setLogs((prev) => [...prev, JSON.stringify(packetString)]);
                break;
            
            default:
                setLogs((prev) => [...prev, JSON.stringify(packetString)]);
                break;
        }
    }

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

import { 
	createContext, 
	PropsWithChildren, 
	useContext, 
	useEffect, 
	useState, 
	useReducer 
} from 'react';
import useWebSocket from 'react-use-websocket';

interface IPacket {
	Data: {};
	Type: string;
}

enum Protocol {
	APRS = 'APRS',
	LoRa = 'LoRa'
}

export interface SocketContext {
	gpsLock: boolean;
	isConnected: boolean;
	toggleConnection: () => void;
	logs: string[];
	packet: IPacket;
	frequency: number;
	updateFrequency: (frequency: number) => void;
	protocol: string;
	updateProtocol: (protocol: Protocol) => void;
}

export const Context = createContext<SocketContext>({
	gpsLock: false,
	isConnected: false,
	toggleConnection: () => {},
	logs: [],
	packet: {} as IPacket,
	frequency: 433.92,
	updateFrequency: (frequency: number) => {},
	protocol: Protocol.APRS,
	updateProtocol: (protocol: Protocol) => {}
});

function packetReducer(state: IPacket, action: { type: string; payload: any }) {
	switch (action.type) {
		case 'SET_PACKET':
			return action.payload;

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

export const SocketGateway = ({ children }: PropsWithChildren<any>) => {
	const [logs, setLogs] = useState<string[]>([]);
	const [packet, packetDispatch] = useReducer(packetReducer, {} as IPacket);
	const [frequency, setFrequency] = useState<number>(433.92);
	const [protocol, setProtocol] = useState<string>('APRS');
    const [isConnected, setIsConnect] = useState<boolean>(false);
	const [gpsLock, setGpsLock] = useState<boolean>(false);

	const port = import.meta.env.TELEMETRY_SERVER_PORT ? import.meta.env.TELEMETRY_SERVER_PORT : 9193;
	const [uri, setUri] = useState<string | null>(isConnected ? `ws://localhost:${port}` : null);

	useEffect(() => {
		if (frequency) {
			console.log('Frequency:', frequency);	
		}

		if (protocol) {
			console.log('Protocol:', protocol);
		}
	}, [frequency, protocol]);

	const updateFrequency = (frequency: number) => {
		console.log('Frequency:', frequency);
		setFrequency(frequency);
	};

	const updateProtocol = (protocol: Protocol) => {
		console.log('Protocol:', protocol);
		setProtocol(protocol);
	};

	const {
		sendJsonMessage,
        lastMessage,
        lastJsonMessage
	} = useWebSocket(uri, {
		shouldReconnect: (_) => isConnected,
		onClose: (closeEvent) => {
			setIsConnect(false);
			console.log('Socket Closed:', closeEvent);
		}, 
		onError: (error) => {
			console.log('Socket Error:', error);
		},
		onOpen: () => {
			console.log('Telemetry socket Opened');
			setIsConnect(true);
		},
		share: true
	});

	const toggleConnection = () => {
        setIsConnect(prevIsConnected => {
            if (prevIsConnected) {
                // If the WebSocket is currently connected, disconnect it
                setUri(null);
            } else {
                // If the WebSocket is currently disconnected, connect it
                setUri(`ws://localhost:${port}`);
            }
            return !prevIsConnected;
        });
    };

	useEffect(() => {
		if (lastMessage) {
			setLogs([...logs, lastMessage]);
		}
	}, [lastMessage]);

	useEffect(() => {
		if (lastJsonMessage) {
			packetDispatch({ type: 'SET_PACKET', payload: lastJsonMessage });
		}
	}, [lastJsonMessage]);

	return (
		<Context.Provider
			value={{
				isConnected,
				gpsLock,
				toggleConnection,
				logs,
				packet,
				frequency,
				updateFrequency,
				protocol,
				updateProtocol
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useSocketContext = () => useContext<SocketContext>(Context);

import { 
	createContext, 
	PropsWithChildren, 
	useContext, 
	useEffect, 
	useState, 
	useReducer 
} from 'react';
import { io } from 'socket.io-client';
import { socket } from './socket-config';

interface IPacket {
	Data: {};
	Type: string;
}

export interface SocketContext {
	logs: string[];
	aprsPacket: IPacket;
	loRaPacket: IPacket;
	setAprsFrequency: (frequency: number) => void;
	setLoRaFrequency: (frequency: number) => void;
}

export const Context = createContext<SocketContext>({
	logs: [],
	aprsPacket: {} as IPacket,
	loRaPacket: {} as IPacket,
	setAprsFrequency: (frequency: number) => {},
	setLoRaFrequency: (frequency: number) => {}
});

function aprsReducer(state: IPacket, action: {type: string, payload: any}) {
	switch (action.type) {
		case 'SET_PACKET':
			return  action.payload;

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

function loraReducer(state: IPacket, action: {type: string, payload: any}) {
	switch (action.type) {
		case 'SET_PACKET':
			return action.payload;

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

export const SocketGateway = ({ children }: PropsWithChildren<any>) => {
	const [logs, setLogs] = useState<string[]>([]);
	const [aprsPacket, aprsDispatch] = useReducer(aprsReducer, {} as IPacket);
	const [loRaPacket, loraDispatch] = useReducer(loraReducer, {} as IPacket);
	const socket = io('http://localhost:8086/toClient');

	const setAprsFrequency = (frequency: number) => {
		// socket.emit('set_aprs_frequency', { frequency });
	};

	const setLoRaFrequency = (frequency: number) => {
		// socket.emit('set_loRa_frequency', { frequency });
	};

	useEffect(() => {
		try {
			socket.on('loRa_packet', (packet: IPacket) => {
				const p = packet as IPacket;
				loraDispatch({ type: 'SET_PACKET', payload: p});
			});
	
			socket.on('aprs_packet', (packet: IPacket) => {
				const p = packet as IPacket;
				console.log('APRS PACKET:', p);
				aprsDispatch({ type: 'SET_PACKET', payload: p});
			});
	
			socket.on('logs', (data: any) => {
				setLogs((prev) => [...prev, JSON.stringify(data)]);
			});
		}

		return () => {
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		console.log('APRS:', aprsPacket);
	}, [aprsPacket]);

	return (
		<Context.Provider
			value={{
				logs,
				aprsPacket,
				loRaPacket,
				setAprsFrequency,
				setLoRaFrequency
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useSocketContext = () => useContext<SocketContext>(Context);
import { createContext, PropsWithChildren, useContext, useEffect, useState, useReducer } from 'react';

interface IPacket {
	Data: {};
	Type: string;
}

export interface SocketContext {
	logs: string[];
	aprsPacket: IPacket;
	loRaPacket: IPacket;
	setPacketFrequency: (frequency: number) => void;
	setProtocol: (protocol: string) => void;
}

export const Context = createContext<SocketContext>({
	logs: [],
	aprsPacket: {} as IPacket,
	loRaPacket: {} as IPacket,
	setPacketFrequency: (frequency: number) => {},
	setProtocol: (protocol: string) => {}
});

function aprsReducer(state: IPacket, action: { type: string; payload: any }) {
	switch (action.type) {
		case 'SET_PACKET':
			return action.payload;

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

function loraReducer(state: IPacket, action: { type: string; payload: any }) {
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
	const [packetFrequency, setPacketFrequency] = useState<number>(3);
	const [protocol, setProtocol] = useState<string>('APRS');

	const port = import.meta.env.TELEMETRY_SERVER_PORT ? import.meta.env.TELEMETRY_SERVER_PORT : 9193;
	const ws = new WebSocket(`ws://localhost:${port}`);

	const enableLiveMode = () => {
		ws.send(JSON.stringify({ type: 'establish_stream', frequency: packetFrequency }));
	};

	const changePacketFrequency = (frequency: number) => {
		ws.send(JSON.stringify({ type: 'change_frequency', frequency: frequency }));
	};

	const changeProtocol = (protocol: string) => {
		ws.send(JSON.stringify({ type: 'change_protocol', protocol: protocol }));
	};

	useEffect(() => {
		if (ws.readyState === ws.OPEN) {
			changePacketFrequency(packetFrequency);
		}
	}, [packetFrequency]);

	useEffect(() => {
		if (ws.readyState === ws.OPEN) {
			changeProtocol(protocol);
		}
	}, [protocol]);

	ws.addEventListener('open', () => {
		console.log('Socket Connected');
		enableLiveMode();
	});

	ws.addEventListener('message', (message) => {
		const data = JSON.parse(message.data);
		console.log(data);
	});

	return (
		<Context.Provider
			value={{
				logs,
				aprsPacket,
				loRaPacket,
				setPacketFrequency,
				setProtocol
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useSocketContext = () => useContext<SocketContext>(Context);

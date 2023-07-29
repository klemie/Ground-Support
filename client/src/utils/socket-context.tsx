import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
// import { socket } from './socket-config';
import { Server } from 'socket.io';
import { io } from 'socket.io-client';

export interface SocketContext {
	logs: string[];
	aprsPacket: string | null;
	loRaPacket: string | null;
	setAprsFrequency: (frequency: number) => void;
	setLoRaFrequency: (frequency: number) => void;
}

export const Context = createContext<SocketContext>({
	logs: [],
	aprsPacket: null,
	loRaPacket: null,
	setAprsFrequency: (frequency: number) => {},
	setLoRaFrequency: (frequency: number) => {}
});

export const SocketGateway = ({ children }: PropsWithChildren<any>) => {
	const [logs, setLogs] = useState<string[]>([]);
	const [aprsPacket, setAprsPacket] = useState<string | null>(null);
	const [loRaPacket, setLoRaPacket] = useState<string | null>(null);

	const setAprsFrequency = (frequency: number) => {
		console.log('setlaf');
		// socket.emit('set_aprs_frequency', { frequency });
	};

	const setLoRaFrequency = (frequency: number) => {
		console.log('setlrf');
		// socket.emit('set_loRa_frequency', { frequency });
	};

	useEffect(() => {
		console.log('connecting');
		const socket = io('http://localhost:8086/data');

		socket.on('loRa_packet', (packet: string) => {
			console.log('sss', packet);
			setLoRaPacket(packet);
		});

		socket.on('aprs_packet', (packet: string) => {
			console.log('sas', packet);
			console.log(packet);
			setAprsPacket(packet);
		});

		socket.on('logs', (data: any) => {
			setLogs((prev) => [...prev, JSON.stringify(data)]);
		});

		return () => {
			socket.disconnect();
		};
	}, []);

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

export const useSocketContext = () => {
	return useContext<SocketContext>(Context);
};

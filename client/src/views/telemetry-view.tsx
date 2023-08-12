import React, { useState, useEffect } from 'react';
import Frequency from '../components/Frequency';
import { Grid, Card, Stack, TextField, Typography, CardContent } from '@mui/material';
import SatelliteCount from '../components/SatelliteCount';
import Header, { Breadcrumb } from '../components/Header';
import { useSocketContext } from '../utils/socket-context';
import TelemetryLog from '../components/TelemetryLog';

export default function TelemetryView() {
	const [frequency, setFrequency] = useState<number>(100);
	const [satelliteCount, setSatelliteCount] = useState<number>(50);
	const sc = useSocketContext();

	const breadCrumbs: Breadcrumb[] = [
		{ name: 'New Mission', path: '/', active: false },
		{ name: 'Telemetry View', path: '/', active: true }
	];
	let frequencySet: Boolean = true;

	const updateFrequency = (newValue: number) => {
		setFrequency(newValue);
		frequencySet = !frequencySet;
	};

	const updateSatelliteCount = (newValue: number) => {
		setSatelliteCount(newValue);
	};

	useEffect(() => {
		updateState(sc.aprsPacket?.Data?.toString() || '');
		console.log(sc.aprsPacket);
	}, [sc.aprsPacket]);


	const [log, setLog] = useState<string[]>([]);

	const updateState = (newPacket: string) => {
		setLog((prev) => [...prev, newPacket]);
	};

	return (
		<>
			<Grid container direction="column" paddingX="2rem" paddingY="2rem" gap={3}>
				{/* Page Header */}
				<Grid item>
					<Header breadCrumbs={breadCrumbs} />
				</Grid>

				{/* Parameters Controllers */}
				<Grid container direction="row" justifyContent="space-between" alignItems="center">
					<Frequency value={frequency} updateFrequency={updateFrequency} />
					<SatelliteCount value={satelliteCount} updateCount={updateSatelliteCount} />
				</Grid>
				<Grid container>
					<TelemetryLog value={log.toString()} 
					width='30%' maxRows={20}/>
				</Grid>
			</Grid>
		</>
	);
}

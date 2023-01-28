import React, { useState, useEffect } from 'react';
import Frequency from '../components/Frequency';
import { Grid, TextField, Typography } from '@mui/material';
import SatelliteCount from '../components/SatelliteCount';
import DataLog from '../components/DataLog';

export default function TelemetryView() {
	const [frequency, setFrequency] = useState<Number>(100);
	const [satelliteCount, setSatelliteCount] = useState<Number>(50);
	const [data, setData] = useState({});

	function updateFrequency(newValue: Number) {
		setFrequency(newValue);
	}

	useEffect(() => {
		console.log('parent received new frequency: ', frequency);
	}, [frequency]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('http://localhost:9090/gateway/');
			console.log(`Response: ${response}`);
			setData(response.text());
			return response;
		};
	}, []);

	return (
		<>
			<Grid container direction="column" paddingX="2rem" paddingY="1rem" gap={3}>
				{/* Page Header */}
				<Grid item>
					<Typography variant="h3">Telemetry View</Typography>
				</Grid>

				{/* Parameters Controllers */}
				<Grid container direction="row" justifyContent="space-between" alignItems="center">
					<Frequency value={frequency} updateFrequency={updateFrequency} />
					<SatelliteCount value={satelliteCount} />
				</Grid>
				<Grid item>
					<TextField multiline defaultValue={data} />
				</Grid>
			</Grid>
		</>
	);
}

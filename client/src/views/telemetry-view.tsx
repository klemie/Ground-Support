import React, { useState, useEffect } from 'react';
import Frequency from '../components/Frequency';
import { Grid, Card, Stack, TextField, Typography, CardContent } from '@mui/material';
import SatelliteCount from '../components/SatelliteCount';
import getTelemetryData from '../utils/fetchPacket';
import Header, { Breadcrumb } from '../components/Header';
import goat from '../static/images/goat.jpg';

export default function TelemetryView() {
	const [frequency, setFrequency] = useState<number>(100);
	const [satelliteCount, setSatelliteCount] = useState<number>(50);

	// Telemetry packet state
	const [longitude, setLongitude] = useState<number>(0);
	const [latitude, setLatitude] = useState<number>(0);
	const [altitude, setAltitude] = useState<number>(0);
	const [timeStamp, setTimeStamp] = useState<string>('0');

	const [telemetryData, setTelemetryData] = useState({});
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
		console.log('parent received new frequency: ', frequency);
	}, [frequency]);

	useEffect(() => {
		if (frequencySet) {
			const interval = setInterval(async () => {
				const data = await getTelemetryData();
				console.log(data.header);
				const { altitude, latitude, longitude, satellites, timeStamp } = data.header;
				console.log(altitude, latitude, longitude, satellites, timeStamp);
				setLongitude(longitude);
				setLatitude(latitude);
				setAltitude(altitude);
				setSatelliteCount(satellites);
				setTimeStamp(timeStamp);
				setTelemetryData(data);
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [timeStamp]);

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
				<Grid container justifyContent="space-evenly">
					{/* These text fields are temporary until the telemetry log component is done */}
					<Card sx={{ width: '100%' }}>
						<CardContent>
							<Stack spacing={3} width={'100%'}>
								<TextField
									variant="outlined"
									value={longitude}
									disabled
									name="Longitude"
									label="Longitude"
									size="medium"
									fullWidth
									InputLabelProps={{ shrink: true }}
								/>
								<TextField
									variant="outlined"
									value={latitude}
									disabled
									name="Latitude"
									label="Latitude"
									size="medium"
									fullWidth
									InputLabelProps={{ shrink: true }}
								/>
								<TextField
									variant="outlined"
									value={altitude}
									disabled
									name="Altitude"
									label="Altitude"
									size="medium"
									fullWidth
									InputLabelProps={{ shrink: true }}
								/>
								<TextField
									variant="outlined"
									value={timeStamp}
									disabled
									name="time-stamp"
									label="Time Stamp"
									fullWidth
									InputLabelProps={{ shrink: true }}
								/>
							</Stack>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</>
	);
}

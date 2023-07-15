import React, { useState, useEffect } from 'react';
import Frequency from '../components/Frequency';
import { Grid, Card, Stack, TextField, Typography, CardContent } from '@mui/material';
import SatelliteCount from '../components/SatelliteCount';
import getTelemetryData from '../utils/fetchPacket';
import Header, { Breadcrumb } from '../components/Header';
import goat from '../static/images/goat.jpg';
import TelemetryLog from '../components/TelemetryLog';

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
					{/* These text fields are temporary until the telemetry log component is done */}
					{/* <Card sx={{ width: '100%' }}>
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
					</Card> */}
					<TelemetryLog value="
					According to all known laws of aviation, there is no way a bee should be able to fly.
					Its wings are too small to get its fat little body off the ground.
					The bee, of course, flies anyway because bees don't care what humans think is impossible.
					Yellow, black. Yellow, black. Yellow, black. Yellow, black.
					Ooh, black and yellow!
					Let's shake it up a little.
					Barry! Breakfast is ready!
					Coming!
					Hang on a second.
					Hello?
					Barry?
					Adam?
					Can you believe this is happening?
					I can't.
					I'll pick you up.
					Looking sharp.
					Use the stairs, Your father paid good money for those.
					Sorry. I'm excited.
					Here's the graduate.
					We're very proud of you, son.
					A perfect report card, all B's.
					Very proud.
					Ma! I got a thing going here.
					You got lint on your fuzz.
					Ow! That's me!
					Wave to us! We'll be in row 118,000.
					Bye!
					" 
					width='30%' height='50%' maxRows={20}/>
				</Grid>
			</Grid>
		</>
	);
}

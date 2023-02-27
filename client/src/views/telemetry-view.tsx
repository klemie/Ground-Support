import React, { useState, useEffect } from 'react';
import Frequency from '../components/Frequency';
import { Grid, Stack, TextField, Typography } from '@mui/material';
import SatelliteCount from '../components/SatelliteCount';
import axios from 'axios';

export default function TelemetryView() {
	const [frequency, setFrequency] = useState<number>(100);
	const [satelliteCount, setSatelliteCount] = useState<number>(50);
	const [longitude, setLongitude] = useState<number>();
	const [latitude, setLatitude] = useState<number>();
	const [timeStamp, setTimeStamp] = useState<string>("0");

	const [telemetryData, setTelemetryData] = useState({});

	const updateFrequency = (newValue: number) => {
		setFrequency(newValue);
	};

	const updateSatelliteCount = (newValue: number) => {
		setSatelliteCount(newValue);
	};

	useEffect(() => {
		console.log('parent received new frequency: ', frequency);
	}, [frequency]);

	useEffect(() => {
		const getData = async () => {
			try {
				let res = await axios.get("http://127.0.0.1:5000/gateway");
				const [ lon, lat, sat, ts ] = res.data.header;
				// if packet being transmitted is old do not update data
				console.log(ts, timeStamp, ts === timeStamp)
				if (ts !== timeStamp) {
					setLongitude(lon);
					setLatitude(lat);
					setSatelliteCount(sat);
					setTimeStamp(ts);
				}
			} catch (error) {
				console.error(error);
			}
		}
		const interval = setInterval(getData, 1000);
		return () => clearInterval(interval);
	}, [telemetryData, timeStamp]);

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
					<SatelliteCount value={satelliteCount} updateCount={updateSatelliteCount}  />
				</Grid>
				<Grid container justifyContent="space-evenly">
					{/* These text fields are temporary until the telemetry log component is done */}
					<Stack spacing={3} width={"100%"}>
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
							value={timeStamp}
							disabled
							name="time-stamp"
							label="Time Stamp"
							fullWidth
							InputLabelProps={{ shrink: true }}
						/>
					</Stack>
					
				</Grid>
			</Grid>
		</>
	);
}

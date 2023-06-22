import React, { useState, useEffect } from 'react';
import Frequency from '../components/Frequency';
import { Grid, Card, Stack, TextField, CardContent } from '@mui/material';
import SatelliteCount from '../components/SatelliteCount';
import Header, { Breadcrumb } from '../components/Header';
import { IDataConfig } from '../utils/entities';
import axios from 'axios';
import DataConstructor from '../utils/data-constructor';

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
		
			interface IDataConfigResponse {
				result: IDataConfig
			}


			let dataConfig: IDataConfig;

			async function getDataConfig(id: string): Promise<boolean> {
				const response = await axios.get<IDataConfigResponse>(`http://127.0.0.1:9090/dataConfig/${id}`);
				dataConfig = response.data.result;
				return true;
			}
			const runTest = async () => {
				await getDataConfig('648d5fb2d3eb5ecf4a4cb164');
				const modules = dataConfig.Modules;
				const tableData = new DataConstructor(modules[1]);
				const flightReportData = tableData.flightReportConstructor(true, true, 100);
				console.log(flightReportData);
			}

			runTest()
		// if (frequencySet) {
		// 	const interval = setInterval(async () => {
		// 		const data = await getTelemetryData();
		// 		console.log(data.header);
		// 		const { altitude, latitude, longitude, satellites, timeStamp } = data.header;
		// 		console.log(altitude, latitude, longitude, satellites, timeStamp);
		// 		setLongitude(longitude);
		// 		setLatitude(latitude);
		// 		setAltitude(altitude);
		// 		setSatelliteCount(satellites);
		// 		setTimeStamp(timeStamp);
		// 		setTelemetryData(data);
		// 	}, 1000);
		// 	return () => clearInterval(interval);
		// }
	}, []);

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

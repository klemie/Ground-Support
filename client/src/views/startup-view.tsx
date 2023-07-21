import React, { useCallback, useEffect, useState } from 'react';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

// Components UI
import Header, { Breadcrumb } from '../components/Header';
import TelemetryLog from '../components/TelemetryLog';
import { 
	Grid, 
	Paper, 
	Stack,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	OutlinedInput,
	Box,
	Chip
} from '@mui/material';


import { IDataConfig, IMission, IModule, IRocketPopulated } from '../utils/entities';
import axios from 'axios';
import Module from '../components/Module';

interface StartUpViewProps {
	rocket?: IRocketPopulated;
	mission?: IMission;
}

export default function StartUpView(props: StartUpViewProps) {
	const [telemetrySource, setTelemetrySource] = useState<string>('');

	const breadCrumbs: Breadcrumb[] = [
		{ name: 'New Mission', path: '/', active: false },
		{ name: 'Telemetry View', path: '/', active: true }
	];

	const [dataConfigId, setDataConfigId] = useState<string>('648d526bd3eb5ecf4a4cb14b');
	const [dataConfig, setDataConfig] = useState<IDataConfig>();

	const getDataConfig = useCallback(async () => {
		try {
			const response = await axios.get(`http://127.0.0.1:9090/dataConfig/${dataConfigId}`);
			const data = response.data.result;
			setDataConfig(data);
		} catch (error) {
			console.log(error);
		}
	}, [dataConfigId]);

	const [log, setLog] = useState<string[]>([]);

	const updateState = (newPacket: string) => {
		setLog((prev) => [...prev, newPacket]);
	};

	useEffect(() => {
		getDataConfig();
	}, [getDataConfig]);

	return (
		<>
			<Grid container direction="column" paddingX="2rem" paddingY="2rem" gap={3}>
				{/* Page Header */}
				<Grid item>
					<Header breadCrumbs={breadCrumbs} />
				</Grid>

				{/* Parameters Controllers */}
				<Grid item>
					<Paper elevation={2} sx={{ padding: 2 }}>
                        <Stack direction="row" spacing={5} justifyContent={'space-between'} alignItems={'center'}>
                            <RocketLaunchIcon color={'primary'} /> 
							<FormControl sx={{ minWidth: 200 }}>
								<InputLabel id="telemetry-source-select-title">Telemetry Source</InputLabel>
								<Select
									size="small"
									labelId="telemetry-source-select-label"
									id="telemetry-source-select"
									value={telemetrySource}
									label="Rocket"
									onChange={(e) => setTelemetrySource(e.target.value as string)}
									input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
									renderValue={(selected: string) => (
										<Box
											sx={{
												display: 'flex',
												flexWrap: 'wrap',
												gap: 0.5,
												transform: 'translateY(20%)'
											}}
										>
											<Chip label={selected} />
										</Box>
									)}
									sx={{
										'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
											border: 'none !important'
										}
									}}
								>
									<MenuItem key="APRS" value="APRS">
										APRS
									</MenuItem>
									<MenuItem key="LORA" value="LORA">
										LORA
									</MenuItem>									
								</Select>
							</FormControl>
                        </Stack>
                    </Paper>
				</Grid>
				<Grid container direction={'row'}>
					<Grid item width={telemetrySource === 'APRS' ? '100%' : '30%'}>
						<TelemetryLog 
							value="
								salads
							" 
							width='100%' 
							maxRows={15}
						/>
					</Grid>
					{telemetrySource === 'LORA' && <Grid item width={'70%'}>
						{dataConfig && dataConfig.Modules.map((module: IModule) => {
							console.log(module);
							return (
								<Grid item>
									{module.Name}
								</Grid>
							)}
						)}
					</Grid>}
				</Grid>
			</Grid>
		</>
	);
}

import React, { useEffect, useState } from 'react';
import {
	Card, 
	Chip, 
	TextField, 
	CardContent, 
	Divider, 
	CardHeader, 
	Tooltip,
	Grid,
	Container,
	InputAdornment,
	IconButton
} from '@mui/material';
import { Stack } from '@mui/system';
import _ from 'lodash';
import RealTimeChart from './Graph';
import sensors, { Sensors } from '@mui/icons-material'


const CHUNK_SIZE = 3;

const statusMap = new Map<string, string>([
	['Inactive', '#FCB701'],
	['Active', '#65C464'],
	['Default', 'grey'],
	['Failed', '#C6232C']
]);

export interface Field { //set export in order to read on another file
	module: string;
	fieldName: string;
	fieldRange: [number, number];
	fieldValue: number;
}

interface ModuleProps {
	title: string;
	telemetry: boolean;
	fields: Array<Field>;
	visualize: boolean;
}

const computeStatuses = (fields?: Array<Field>) => {
	let statuses: [string] = [""];
	let status: string = 'Inactive';
	fields?.forEach((field) => {
		const max = field.fieldRange[0];
		const min = field.fieldRange[1];
		if (_.inRange(field.fieldValue, min, max)) {
			status = 'Active';
		} else if (field.fieldValue === 0) {
			status = 'Inactive';
		} else {
			status = 'Failed';
		}
		statuses.push(status);
	});
	return statuses;
};


const ComputeTimePackets = () => {
	const [time, setTime] = useState(() => {
		return new Date().getSeconds();
	}) //sets time to get seconds initially

	useEffect(() => {
		const interval = setInterval(() => {
			
		  let currentTime = new Date().getSeconds(); //gives current seconds since some data
		  let distance = Number(currentTime) - Number(time); //find the difference
		  setTime(prevTime => distance); //equivalent of saying time = distance
		}, 1000);

		 return () => {
			clearInterval(interval);
		 }
		});

		// trying to return our new time state
		return (
			<>
			   time
			</>
			);
};

//time packets go here

const Module: React.FC<ModuleProps> = (props: ModuleProps) => {
	const [statusColor, setStatusColor] = useState(statusMap.get('Inactive')); //TODO: change to state array for all fields + module status
	const [status, setStatus] = useState('Inactive');
	const { title, telemetry } = props
	useEffect(() => {
		const statuses = computeStatuses(props.fields);
		statuses.forEach((st) => {
			setStatus(st);
			setStatusColor(statusMap.get(st));
		}); // currently only the final field controls the whole status of the module
	}, [props.fields]);

	const fieldsMatrix = _.chunk(props.fields, CHUNK_SIZE);

	const fieldMatrixUI = (
		<Stack 
			spacing={3} 
			direction="row" 
			justifyContent="center"
		>
			{fieldsMatrix.map((cols: Array<any>) => {
				return ( 
					<Stack 
						spacing={3} 
						direction="column" 
						alignItems="center"
					> 
					{
						cols.map((field, i) => {
							return (
								<Tooltip 
									key={i} 
									title={field.fieldName} 
									placement="bottom"
								>
									<TextField
										key={i} 
										id="value-text-field"
										size="small" 
										label={field.fieldName} 
										value={field.fieldValue} 
										defaultValue="NaNa" 
										fullWidth
										sx= {{
											"min-width": 100,
											"max-width": 150,
											input: {
												textAlign: "center"
											}
										}}
									/>
								</Tooltip>
							)
						})
					}
					</Stack>
				)
			})}
		</Stack>
	);
	console.log(< ComputeTimePackets />)
	return (
		<>
		
			<Card variant="outlined">
				<CardHeader
					 
					title={props.title || 'Default'} 
					titleTypographyProps={{ variant: 'h6' }} 
					sx={{ padding: 2, textAlign: 'center' }} 
					
				/>{/* responsible for content above the first divider*/}
				<CardContent sx={{ paddingBlockStart: 0, paddingBlockEnd: 0, textAlign: 'center' }}> 
				{/* sx allows for CSS customization of telemetry card */}

					<Divider variant="fullWidth" /> 

					{telemetry && <>
					

							<>
								<RealTimeChart />	
							</>

					</>  }

					{/* { props.visualize ? graph : fieldMatrixUI } */}
					<Grid container spacing={0} justifyContent={'space-around'} marginTop={2}> 
						<Grid item xs={5}> 
							<TextField 
								label = "Satellite Count"
								value={"Satellite Count Goes Here."}
								
							/>
							</Grid>
						<Grid item xs={5}>
							<TextField
								label = "Time Since Last Packet"
								value={<ComputeTimePackets /> }
								InputProps={{
									startAdornment: <InputAdornment position="start"> <IconButton> <Sensors /> </IconButton> </InputAdornment>, 
									endAdornment: <InputAdornment position="start"> ms </InputAdornment>,
								}}/> 
						</Grid>								
					</Grid>
					<Divider variant="fullWidth" sx={{ my: 2 }} /> 
					<Chip // how to assign status
						color="primary" 
						sx={{ backgroundColor: String(statusColor) }} 
						label={status} 
					/>
				</CardContent>
			</Card>
		</>
	);
};

export default Module;

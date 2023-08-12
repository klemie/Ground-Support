import React, { useEffect, useState } from 'react';
import { 
	Card, 
	Chip, 
	TextField, 
	CardContent, 
	Divider, 
	CardHeader, 
	Tooltip
} from '@mui/material';
import { Stack } from '@mui/system';
import _ from 'lodash';
import RealTimeChart from './Graph';

const CHUNK_SIZE = 3;

const statusMap = new Map<string, string>([
	['Inactive', '#FCB701'],
	['Active', '#65C464'],
	['Default', 'grey'],
	['Failed', '#C6232C']
]);

export interface Field {
	module: string;
	fieldName: string;
	fieldRange: [number, number];
	fieldValue: number;
}

interface ModuleProps {
	title: string;
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

const Module: React.FC<ModuleProps> = (props: ModuleProps) => {
	const [statusColor, setStatusColor] = useState(statusMap.get('Inactive')); //TODO: change to state array for all fields + module status
	const [status, setStatus] = useState('Inactive');

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

	const graph = (
		<>
			<RealTimeChart />
		</>
	);

	return (
		<>
			<Card variant="outlined">
				<CardHeader
					 
					title={props.title || 'Default'} 
					titleTypographyProps={{ variant: 'h6' }} 
					sx={{ padding: 2, textAlign: 'center' }} 
				/>
				<CardContent sx={{ paddingBlockStart: 0, paddingBlockEnd: 0, textAlign: 'center' }}>

					<Divider variant="fullWidth" sx={{ mb: 2 }} />

					{ props.visualize ? graph : fieldMatrixUI }

					<Divider variant="fullWidth" sx={{ my: 2 }} />

					<Chip 
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

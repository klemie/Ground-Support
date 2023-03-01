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

const statusMap = new Map<string, string>([
	['Inactive', '#FCB701'],
	['Active', '#65C464'],
	['Default', 'grey'],
	['Failed', '#C6232C']
]);

export interface Field {
	module?: string;
	fieldName: string;
	fieldRange: Array<number>;
	fieldValue: number;
}

interface ModuleProps {
	title: string;
	fields: Array<Field>;
}

const computeStatuses = (fields?: Array<Field>) => {
	let statuses: Array<string> = [];
	let status: string = 'Inactive';
	fields?.forEach((field) => {
		if (_.inRange(field.fieldValue, field.fieldRange[0], field.fieldRange[1])) {
			status = 'Active';
		} else if (field.fieldValue === 0) {
			status = 'Inactive';
		} else {
			status = 'Failed';
		}
		statuses.push(status);
	});
	return statuses;
}

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

	const fieldsMatrix = _.chunk(props.fields, 3);
	
	return (
		<>
			<Card variant="outlined">
				<CardHeader 
					title={props.title || 'Default'} 
					titleTypographyProps={{ variant: 'subtitle1' }} 
					sx={{ padding: 2 }} 
				/>
				<CardContent sx={{ paddingBlockStart: 0, paddingBlockEnd: 0 }}>

					<Divider variant="fullWidth" sx={{ mb: 2 }} />

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

					<Divider variant="fullWidth" sx={{ my: 2 }} />

					<Chip 
						color="primary" 
						style={{ backgroundColor: String(statusColor) }} 
						label={status} 
					/>
				</CardContent>
			</Card>
		</>
	);
};

export default Module;

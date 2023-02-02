import React, { useEffect, useRef, useState } from 'react';
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

const statusMap = new Map<String, String>([
	['Inactive', '#FCB701'],
	['Active', '#65C464'],
	['Default', 'grey'],
	['Sus', '#C6232C']
]);

export interface Field {
	module?: String;
	fieldName: String;
	fieldRange: Array<Number>;
	fieldValue: Number;
}

interface ModuleProps {
	title: String;
	fields: Array<Field>;
}

const Module: React.FC<ModuleProps> = (props: ModuleProps) => {
	const [statusColor, setStatusColor] = useState(statusMap.get('Inactive'));
	const [status, setStatus] = useState('Inactive');

	// useEffect(() => {
	// 	for (const i in props.fieldValues) {
	// 		const v = props.fieldValues;
	// 		const r = props.fieldRanges;
	// 		if (v[i] > r[i][1] || v[i] < r[i][0]) {
	// 			setStatusColor(statusMap.get('Sus'));
	// 			setStatus('Failed');
	// 			return;
	// 		} else if (v[i] == 0) {
	// 			setStatusColor(statusMap.get('Inactive'));
	// 			setStatus('Inactive');
	// 		} else {
	// 			setStatusColor(statusMap.get('Active'));
	// 			setStatus('Active');
	// 		}
	// 	}
	// }, [props.fieldValues]);

	/* ----------
	with the code below I was trying to push group of 3 Modules into an array of fieldGrid 

	// let fieldGrid = [];
	// for (let i = 0; i < props.fields.length; i += 3) {
	// 	const fieldNames3 = props.fields.slice(i, i + 3);
	// 	const fieldValues3 = props.fieldValues.slice(i, i + 3);

	// 	// const gridItems = fieldNames3.map((fieldName, i) => {
	// 	// 	return;
	// 	// 	<Grid item>
	// 	// 		<TextField key={i} id="value-text-field" label={fieldName} value={fieldValues3[i]} defaultValue="Value"></TextField>
	// 	// 	</Grid>;
	// 	// });

	// 	fieldGrid.push(<Grid container>{gridItems}</Grid>);
	// }
	 ------ */

	const fieldsMatrix = _.chunk(props.fields, 3);
	
	useEffect(() => {
		console.log(fieldsMatrix);
	}, []);
	
	return (
		<>
			<Card variant="outlined">
				<CardHeader title={props.title || 'Default'} titleTypographyProps={{ variant: 'subtitle1' }} sx={{ padding: 2 }} />
				<CardContent sx={{ paddingBlockStart: 0, paddingBlockEnd: 0 }}>
					<Divider variant="fullWidth" sx={{ mb: 2 }} />

					<Stack spacing={3} direction="row" justifyContent="center">
						{fieldsMatrix.map((cols: Array<any>) => {
							return ( 
								<Stack spacing={3} direction="column" alignItems="center"> {
									cols.map((field, i) => {
										return (
											<Tooltip key={i} title={field.fieldName} placement="bottom">
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

					<Divider 
						variant="fullWidth" 
						sx={{ my: 2 }} 
					/>
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

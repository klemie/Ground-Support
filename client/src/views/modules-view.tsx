import React, { useEffect, useRef, useState } from 'react';
import Module from '../components/module';

import { dataConfigParser } from './data-parser';
import { Typography, Grid } from '@mui/material';

type Field = {
	fieldName: String;
	fieldValue: String;
	fieldRange: Array<Number>;
}

export default function ModulesView() {
	const input = require('./sample-data.json');
	const dataConfig = dataConfigParser(input);
	debugger;

	const [fieldValues, setFieldValues] = useState();

	return (
		<>
			<Typography
				variant="h3" 
				sx={{ py: 3 }}
			>
				Modules View
			</Typography>

			<Grid 
				container 
				spacing={2}
				sx={{ px: 3 }}
			>
				{dataConfig.map((module, index) => {
					// For testing: use lower bound of fieldRanges as current values
					const testValues = module['fieldRanges'].map(([a, b]) => {
						return a;
					});
					debugger;

					const f: Field = {
						fieldName: module.fields[0],
						fieldRange: module.fieldRanges[0],
						fieldValue: Math.random(module['fieldRanges'][0][0], module['fieldRanges'][0][1]).toFixed(4)
					};

					return (
						<Grid 
							item 
							key={'grid-' + module['module']} 
							md={3}
						>
							<Module 
								key={'module-' + module['module']} 
								title={module['module'] || 'Title'} 
								fields={f} 
							/>
						</Grid>
					);
				})}
			</Grid>
		</>
	);
}

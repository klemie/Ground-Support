import React, { useEffect, useRef, useState } from 'react';
import Module from '../components/module';

import { dataConfigParser } from './data-parser';
import { Typography, Grid } from '@mui/material';

export default function ModulesView() {
	const input = require('./sample-data.json');
	const dataConfig = dataConfigParser(input);

	const [fieldValues, setFieldValues] = useState();

	return (
		<>
			<Typography variant="h5">Modules View</Typography>

			<Grid container spacing={2}>
				{dataConfig.map((module, index) => {
					//console.log(module);

					// For testing: use lower bound of fieldRanges as current values
					const testValues = module['fieldRanges'].map(([a, b]) => {
						return a;
					});

					return (
						<Grid item key={'grid-' + module['module']} md={3}>
							<Module key={'module-' + module['module']} title={module['module'] || 'Title'} fields={module['fields']} fieldRanges={module['fieldRanges']} fieldValues={testValues} />
						</Grid>
					);
				})}
			</Grid>
		</>
	);
}

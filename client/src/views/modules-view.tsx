import React, { useEffect, useRef, useState } from 'react';
import Module, { Field } from '../components/module';
import _ from 'lodash';

import { dataConfigParser } from './data-parser';
import { Typography, Grid } from '@mui/material';

export default function ModulesView() {
	const input = require('./sample-data.json');
	const dataConfig = dataConfigParser(input);
	
	const formattedModules = dataConfig.map((module) => {
		let mo = [];
		for (let index in module.fields) {
			const [min, max] = module.fieldRanges[index];
			debugger;
			const field: Field = {
				module: module.module,
				fieldName: module.fields[index],
				fieldRange: module.fieldRanges[index],
				fieldValue: _.round(_.random(min, max, true), 3)
			};
			mo.push(field);
		}
		return mo;
	});

	const [fieldValues, setFieldValues] = useState();

	return (
		<>
			<Typography
				variant="h3" 
				sx={{ py: 2 }}
			>
				Modules View
			</Typography>

			<Grid 
				container 
				spacing={3}
				direction="row"
				sx={{ 
					pl: 3,
					display: "flex"
				}}
				justifyContent="space-between"
				alignItems="stretch"
			>
				{formattedModules.map((module, index) => {
					return (
						<Grid 
							item 
							key={'grid-' + module[0].module} 
							alignItems="stretch"
						>
							<Module 
								key={'module-' + module[0].module} 
								title={module[0].module || 'Title'} 
								fields={module} 
							/>
						</Grid>
					);
				})}
			</Grid>
		</>
	);
}

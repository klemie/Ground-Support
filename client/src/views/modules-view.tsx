import React, {  useState } from 'react';
import Module, { Field } from '../components/Module_';
import _ from 'lodash';

import { dataConfigParser } from '../utils/data-parser';
import { Typography, Grid } from '@mui/material';

export default function ModulesView() {
	const [ dataConfig, setDataConfig ] = useState(dataConfigParser(require('../utils/sample-data.json')));
	
	// Call dataConfig endpoint
	// useEffect(() => {
	// 	setDataConfig();
	// }, [dataConfig]);

	const formattedModules = dataConfig.map((module) => {
		let fields = [];
		for (let index in module.fields) {
			const [min, max] = module.fieldRanges[index];
			const field: Field = {
				module: module.module,
				fieldName: module.fields[index],
				fieldRange: module.fieldRanges[index],
				fieldValue: _.round(_.random(min, max, true), 3)
			};
			fields.push(field);
		}
		return fields;
	});

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
				{formattedModules.map((module) => {
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

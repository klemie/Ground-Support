import React, { useEffect, useRef, useState } from 'react';
import Module, { Field } from '../components/module';
import Header, { Breadcrumb } from "../components/Header";

import _ from 'lodash';

import { dataConfigParser } from './data-parser';
import { Typography, Grid, Container } from '@mui/material';

export default function ModulesView() {
	const input = require('./sample-data.json');
	const dataConfig = dataConfigParser(input);
	const [fieldValues, setFieldValues] = useState();

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
	const breadCrumbs: Breadcrumb[] = [
		{ name: "New Mission", path: "/", active: false },
		{ name: "Module View", path: "/", active: true },
	];

	return (
		<>
		<Grid 
			container
			direction="column"
			paddingX="2rem"
			paddingY="2rem"
			gap={3}
		>
			{/* <Typography
				variant="h3" 
				sx={{ py: 2 }}
			>
				Modules View
			</Typography> */}
			<Grid item>
				<Header breadCrumbs={breadCrumbs} />
			</Grid>

			<Grid 
				container 
				spacing={3}
				direction="row"
				sx={{ 
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
		</Grid>
		</>
	);
}

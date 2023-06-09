import React, {  useState } from 'react';
import Module, { Field } from '../components/Module';
import Header, { Breadcrumb } from "../components/Header";
import { Typography, Grid } from '@mui/material';
import { dataConfigParser } from '../utils/data-parser';
import _ from 'lodash';

const ROUND_TO = 3;
const FLOATING = true;

export default function ModulesView() {
	const [ dataConfig, setDataConfig ] = useState(dataConfigParser(require('../utils/sample-data.json')));
	
	// Call dataConfig endpoint
	// useEffect(() => {
	// 	setDataConfig();
	// }, [dataConfig]);
	const breadCrumbs: Breadcrumb[] = [
		{ name: "New Mission", path: "/", active: false },
		{ name: "Module View", path: "/", active: true }
	];
	const formattedModules = dataConfig.map((module) => {
		let fields = [];
		for (let index in module.fields) {
			const [min, max] = module.fieldRanges[index];
			const field: Field = {
				module: module.module,
				fieldName: module.fields[index],
				fieldRange: module.fieldRanges[index],
				fieldValue: _.round(_.random(min, max, FLOATING), ROUND_TO)
			};
			fields.push(field);
		}
		return fields;
	});

	return (
		<>
		<Grid 
			container 
			direction="column" 
			paddingX="2rem" 
			paddingY="2rem" 
			gap={3}
		>
			<Grid container>
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
				{formattedModules.map((module) => {
					return (
						<Grid 
							item 
							key={'grid-' + module[0].module} 
							alignItems="stretch"
						>
							<Module 
								visualize={true}
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

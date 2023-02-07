import React, { useEffect, useRef, useState } from 'react';
import Module, { Field } from '../components/module';
import { dataConfigParser } from './data-parser';
import { Typography, Grid } from '@mui/material';
import _ from 'lodash';
import axios from 'axios';

export default function ModulesView() {
	const input = require('./sample-data.json');
	const dataConfig = dataConfigParser(input);
	const [fieldValues, setFieldValues] = useState<any>([]);

	let formattedModules = dataConfig.map((module) => {
		let fields = [];
		for (let index in module.fields) {
			const field: Field = {
				module: module.module,
				fieldName: module.fields[index],
				fieldRange: module.fieldRanges[index],
				fieldValue: 0
			};
			fields.push(field);
		}
		return fields;
	});

	useEffect(() => {
		debugger;
		const getData = async () => {
			try {
				let response = await axios({ method: 'get', url: '/gateway', baseURL: 'http://localhost:9090' });
				const data = await response.data;
				setFieldValues(data);
				return data;
			} catch (error) {
				console.error(error);
			}
		};
		getData();
		console.log(fieldValues);
	}, [fieldValues]);
	// useEffect(() => {
	// 	formattedModules.map((module) => {
	// 		module.map((field) => {
	// 			if (field.value)
	// 		});
	// 	});
	// }, [fieldValues]);

	return (
		<>
			<Typography
				variant="h3" 
				sx={{ py: 2 }}
			>
				Modules View
			</Typography>

			{/* {fieldValues.map((value: any) => {
				return(
					<>
						{value}
					</>
				);
			})} */}

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

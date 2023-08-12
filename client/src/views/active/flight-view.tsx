import React, {  useState } from 'react';
import Header, { Breadcrumb } from "../../components/Header";
import { Grid } from '@mui/material';


export default function FlightView() {
	
	const breadCrumbs: Breadcrumb[] = [
		{ name: "New Mission", path: "/", active: false },
		{ name: "Module View", path: "/", active: true }
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
			</Grid>
		</Grid>
		</>
	);
}

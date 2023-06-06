import { useState, useEffect } from "react"
import Header, { Breadcrumb } from "../components/Header";
import MUIDataTable from "mui-datatables";
import MapWithPins from "../components/MapDemo";

import RealTimeChart from "../components/RealTimeChartDemo";
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import { Drawer, Grid, List, ListItem, ListItemIcon, ListItemText, Tab } from '@mui/material';
import '../styles/componentDocs.css';
import VerticalLayout from "../components/ComponentDocumenation";

const drawerHeight = '10vh';

interface ComponentDocument {
	ComponentName: string;
	Props: object;
	Description: string;
}

export default function ComponentDocs() {
    const [ currentComponentName, setCurrentComponentName ] = useState("");

	const breadCrumbs: Breadcrumb[] = [
		{ name: "Component Docs", path: "/", active: false },
		{ name: currentComponentName, path: "/", active: true }
	];
	
	const components = ["Header", "Module", "Mission Configuration Popup", "Rocket Profile Popup", "Mui Data Table", "Real Time Chart"];

	const [ currentComponent, setCurrentComponent ] = useState(0);
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setCurrentComponent(newValue);
	};
	const colors: string[] = [
		'rgba(255, 197, 87, 1)',
		'rgba(214, 91, 79, 1)',
		'rgba(0, 94, 184, 1)',
		'rgba(69, 136, 201, 1)'
	];

	return(
		<div style={{ display: 'flex' }}>
			<Drawer
				variant="permanent"
				sx={{
					display: { xs: 'block'},
					'& .MuiDrawer-paper': { boxSizing: 'border-box', height: drawerHeight },
				}}
				anchor="bottom"
			>
				<Tabs
				  variant="scrollable"
				  scrollButtons
				  value={currentComponent}
				  onChange={handleChange}
				  sx={{
					[`& .${tabsClasses.scrollButtons}`]: {
					  '&.Mui-disabled': { opacity: 0.3 },
					},
					height: "10vh"
				  }}
				>
					{components.map((componentName: string) => {
						return(
							<Tab sx={{ height: "10vh" }} label={componentName} />
						)
					})}
				</Tabs>
			</Drawer>
			<main>
			<div style={{ width: '100vw', height: '89vh' }}>
				<Grid
					container
					direction="column"
					paddingX="2rem"
					paddingY="2rem"
					gap={3}
					sx={{ height: '100%', width: '100%' }}
				>
					{/* Page Header */}
					<Grid item>
						<Header breadCrumbs={breadCrumbs} />
					</Grid>

					{/* Rocket Selection */}
					<Grid container justifyContent="center" alignItems="center" style={{ height: '80%', overflowY: 'scroll', padding: 16 }}>
						<VerticalLayout />
					</Grid>
						
				</Grid>
				
				<div>
					{colors.map((color) => {
						return (
							<div
								style={{
									backgroundColor: color,
									width: '25%',
									height: '1vh',
									float: 'left'
								}}
							/>
						);
					})}
				</div>	
			</div>
				
			</main>
		</div>			
    );
}
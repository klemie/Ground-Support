import React from 'react';
import './App.css';
import { Grid } from '@mui/material';

import TelemetryView from '../views/telemetry-view';
import UtilitiesView from '../views/utilities-view';

import ModulesView from '../views/modules-view';

function App() {
	// useState for currentView
	return (
		<div className="App">
			<Grid container spacing={2} direction="row">
				{/* Any views should be rendered within this grid item */}
				<Grid item xs={10}>
					<ModulesView />
				</Grid>

				<Grid item xs={2}>
					<UtilitiesView />
				</Grid>
			</Grid>
		</div>
	);
}

export default App;

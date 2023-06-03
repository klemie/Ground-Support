import React, { useState } from 'react';
import './App.css';
import { Button, Grid } from '@mui/material';
import { Stepper, Step, StepButton } from '@mui/material';
// Components
import SettingsDialog from '../components/SettingsDialog';
import DataLog from '../components/DataLog';
// Views
import TelemetryView from '../views/telemetry-view';
import RocketSelectionView from '../views/rocket-selection-view';
import ModulesView from '../views/modules-view';
import ComponentModal from '../components/modals/ComponentModal';

function App() {
	const [activeStep, setActiveStep] = useState(0);
	const [completed, setCompleted] = useState<{
		[k: number]: boolean;
	}>({});

	const steps = ['Start up', 'Standby', 'Flight', 'Recovery', 'Flight Report'];

	const handleStep = (step: number) => () => {
		// check step number and handle view change here
		setActiveStep(step);
	};
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	const handleSettingsDialog = () => {
		setIsSettingsOpen(!isSettingsOpen);
	};

	const [currentView, setCurrentView] = useState('Rocket_Selection');

	const updateView = (viewName: string) => {
		setCurrentView(viewName);
	};

	function returnView(view: number) {
		switch (view) {
			case 0:
				return <TelemetryView />;
			case 1:
				return <TelemetryView />;
			case 2:
				return <ModulesView />;
			default:
				return <DataLog />;
		}
	}

	const fullHeight = {
		height: '100vh',
		overflow: 'auto'
	};

	return (
		<div className="App">
			{currentView === 'Rocket_Selection' && <RocketSelectionView setCurrentView={updateView} />}
			{currentView === 'Active_Rocket' && (
				<Grid container spacing={2} direction="row">
					{/* Any views should be rendered within this grid item */}
					<Grid item xs={10}>
						{returnView(activeStep)}
					</Grid>

					<Grid item xs={2}>
						<Grid
							paddingX="1rem"
							paddingY="1rem"
							container
							direction="column"
							justifyContent="space-between"
							height="100%"
							style={fullHeight}
						>
							{/* TODO: Should call a Setting pop up */}
							<Grid item>
								<SettingsDialog isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
								<Button variant="outlined" onClick={() => handleSettingsDialog()}>
									Settings
								</Button>
							</Grid>

							<ComponentModal></ComponentModal>

							{/* Page change stepper */}
							<Grid container justifyContent="center">
								<Stepper nonLinear activeStep={activeStep} orientation="vertical">
									{steps.map((label, index) => (
										<Step key={label} completed={completed[index]}>
											<StepButton color="inherit" onClick={handleStep(index)}>
												{label}
											</StepButton>
										</Step>
									))}
								</Stepper>
							</Grid>

							{/* TODO: Should terminate all data readings */}
							<Grid item>
								<Button
									fullWidth={true}
									variant="contained"
									color="error"
									onClick={() => setCurrentView('Rocket_Selection')}
								>
									End Mission
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			)}
		</div>
	);
}

export default App;

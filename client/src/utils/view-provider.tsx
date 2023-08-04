import React, { useEffect, useState } from 'react';
import { Button, Grid, Step, StepButton, Stepper } from '@mui/material';

import '../root/App.css'
// Views
import TelemetryView from '../views/telemetry-view';
import RocketSelectionView from '../views/rocket-selection-view';
import ModulesView from '../views/modules-view';
import ComponentDocs from '../views/component-docs-view';
import SettingsDialog from '../components/SettingsDialog';
import RocketDetailsView from '../views/rocket-details-view';
import DataConfigView from '../views/data-config-view';

const ROCKET_SELECT_KEY = 'ROCKET_SELECT';
const COMPONENT_DOCUMENT_KEY = 'COMPONENT_DOCUMENT';
// const MISSION_REPLAY_KEY = 'MISSION_REPLAY';

// Rocket Details
const ROCKET_DETAILS_KEY = 'ROCKET_DETAILS';
// const COMPONENT_DETAILS_KEY = 'COMPONENT_DETAILS';
// const MISSION_DETAILS_KEY = 'MISSION_DETAILS';
const DATA_CONFIG_KEY = 'DATA_CONFIG';

// Active Flight
const TELEMETRY_KEY = 'START_UP';
const FLIGHT_KEY = 'FLIGHT';
const RECOVERY_KEY = 'RECOVERY';
const FLIGHT_REPORT_KEY = 'FLIGHT_REPORT';

interface ViewProviderProps {
    currentView?: () => void
}

export default function ViewProvider(props: ViewProviderProps) {
	const [currentViewKey, setCurrentViewKey] = useState<string>(ROCKET_SELECT_KEY);
    const [currentRocketID, setCurrentRocketID] = useState<string>("");

    const updateView = (key: string) => {
        setCurrentViewKey(key);
    }

    const updateRocketID = (id: string) => {
        setCurrentRocketID(id);
    }

    const fullHeight = {
		height: '100vh',
		overflow: 'auto'
	};
    
    //Active Events
	const [activeStep, setActiveStep] = useState<number>(0);
    const [completedStep, setCompletedStep] = useState<{
		[k: number]: boolean;
	}>({});
    const handleStep = (step: number) => () => {
		setActiveStep(step);
	};
    interface IActiveKeys {
        [key: number]: string;
    }
    const activeKeys: IActiveKeys = {
        0: TELEMETRY_KEY,
        1: FLIGHT_KEY,
        2: RECOVERY_KEY,
        3: FLIGHT_REPORT_KEY
    }
    const activeStepKeys = ['Start up', 'Flight', 'Recovery', 'Flight Report'];
	
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    
   
	const handleSettingsDialog = () => {
		setIsSettingsOpen(!isSettingsOpen);
	};

    function currentView(viewKey: string) {
        switch (viewKey) {
            case ROCKET_SELECT_KEY:
                return <RocketSelectionView setCurrentView={updateView} setRocketID={updateRocketID}/>;
            case COMPONENT_DOCUMENT_KEY:
                return <ComponentDocs />;
			case ROCKET_DETAILS_KEY:
				return <RocketDetailsView rocketID={currentRocketID}/>;
            case TELEMETRY_KEY:
                return <TelemetryView />;
            case FLIGHT_KEY:
                return <ModulesView />;
			case DATA_CONFIG_KEY:
				return <DataConfigView DataConfigID='648d526bd3eb5ecf4a4cb14b'/>;
            default:
                return <RocketSelectionView setCurrentView={updateView} setRocketID={updateRocketID} />;
        }   
    }

    useEffect(() => {
        console.log(currentViewKey);
    }, [currentViewKey])
    return (
		<div className='app'>
            {currentViewKey === (ROCKET_SELECT_KEY)  && currentView(ROCKET_SELECT_KEY)}
			{currentViewKey === (ROCKET_DETAILS_KEY) && currentView(ROCKET_DETAILS_KEY)}
			{currentViewKey === (DATA_CONFIG_KEY) && currentView(DATA_CONFIG_KEY)}
            {currentViewKey === (TELEMETRY_KEY || FLIGHT_KEY || RECOVERY_KEY || FLIGHT_REPORT_KEY)  && (
				<Grid container spacing={2} direction="row">
					{/* Any views should be rendered within this grid item */}
					<Grid item xs={10}>
						{currentView(activeKeys[activeStep])}
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

							{/* Page change stepper */}
							<Grid container justifyContent="center">
								<Stepper nonLinear activeStep={activeStep} orientation="vertical">
									{activeStepKeys.map((label, index) => (
										<Step key={label} completed={completedStep[index]}>
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
									onClick={() => setCurrentViewKey(ROCKET_SELECT_KEY)}
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
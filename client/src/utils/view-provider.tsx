import React, { useEffect, useReducer, useState } from 'react';
import { Button, Grid, Step, StepButton, Stepper } from '@mui/material';

import '../root/App.css'
// Views
import RocketSelectionView from '../views/rocket-selection-view';
import ComponentDocs from '../views/component-docs-view';
import RocketDetailsView from '../views/rocket-details-view';
import DataConfigView from '../views/data-config-view';
import ActiveMissionView from '../views/active-mission';

const ROCKET_SELECT_KEY = 'ROCKET_SELECT';
const COMPONENT_DOCUMENT_KEY = 'COMPONENT_DOCUMENT';
// const MISSION_REPLAY_KEY = 'MISSION_REPLAY';

// Rocket Details
const ROCKET_DETAILS_KEY = 'ROCKET_DETAILS';
const DATA_CONFIG_KEY = 'DATA_CONFIG';

// Active Flight
const ACTIVE_FLIGHT_KEY = 'ACTIVE_FLIGHT';

interface ViewProviderProps {
    currentView?: () => void
}

export default function ViewProvider(props: ViewProviderProps) {
	const [currentViewKey, setCurrentViewKey] = useState<string>(ROCKET_SELECT_KEY);
    const [currentRocketID, setCurrentRocketID] = useState<string>("");
	const [currentMissionId, setCurrentMissionId] = useState<string>("");

    const updateView = (key: string) => {
        setCurrentViewKey(key);
    }

	const updateMissionId = (id: string) => {
		setCurrentMissionId(id);
	}

    const updateRocketID = (id: string) => {
        setCurrentRocketID(id);
    }

	const handleBackToRocketSelect = () => {
		viewDispatch({ type: ROCKET_SELECT_KEY });
	};

	const handleBackToRocketDetails = () => {
		viewDispatch({ type: ROCKET_DETAILS_KEY });
	};

	function viewReducer(state: any, action: any) {
		switch (action.type) {
			case ROCKET_SELECT_KEY:
				return {
					view: ROCKET_SELECT_KEY,
					currentView: <RocketSelectionView setCurrentView={updateView} setRocketID={updateRocketID}/>
				}
			case COMPONENT_DOCUMENT_KEY:
				return {
					view: COMPONENT_DOCUMENT_KEY,
					currentView: <ComponentDocs />
				}
			case ROCKET_DETAILS_KEY:
				return {
					view: ROCKET_DETAILS_KEY,
					currentView: <RocketDetailsView setActiveView={updateView} openActiveMission={updateMissionId} rocketID={currentRocketID}/>
				}
			case DATA_CONFIG_KEY:
				return {
					view: DATA_CONFIG_KEY,
					currentView: <DataConfigView DataConfigID='648d526bd3eb5ecf4a4cb14b'/>
				}
			case ACTIVE_FLIGHT_KEY:
				return {
					view: ACTIVE_FLIGHT_KEY,
					currentView: <ActiveMissionView rocketId={currentRocketID} missionId={currentMissionId} backToRocketSelection={handleBackToRocketSelect}/>
				}
			default:
				throw Error(`Unknown action type: ${action.type}`);
		}
	}

	const [viewState, viewDispatch] = useReducer(viewReducer, {
		view: ROCKET_SELECT_KEY,
		currentView: <RocketSelectionView setCurrentView={updateView} setRocketID={updateRocketID}/>
	});

    useEffect(() => {
        console.log(currentViewKey);
    }, [currentViewKey])

    return (
		<div className='app'>
			{viewState.currentView}
            {currentViewKey === (ACTIVE_FLIGHT_KEY)  && (
				<ActiveMissionView 
					backToRocketSelection={handleBackToRocketDetails}
					rocketId={currentRocketID} 
					missionId={currentMissionId}
				/>
			)}
        </div>
    );
}
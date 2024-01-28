import { useReducer, useState } from 'react';

import '../root/App.css'
// Views
import RocketSelectionView from '../views/rocket-selection-view';
import ComponentDocs from '../views/component-docs-view';
import RocketDetailsView from '../views/rocket-details-view';
import DataConfigView from '../views/data-config-view';
import ActiveMissionView from '../views/active-mission';
import { ActiveMissionProvider } from './ActiveMissionContext';
import { SocketGateway } from './socket-context';

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
    const [currentRocketId, setCurrentRocketId] = useState<string>("");
	const [currentMissionId, setCurrentMissionId] = useState<string>("");
	const [currentDataConfigId, setCurrentDataConfigId] = useState<string>("");

	const updateMissionId = (id: string) => {
		setCurrentMissionId(id);
	};

    const updateRocketID = (id: string) => {
        setCurrentRocketId(id);
    };

	const handleToDataConfig = (id: string) => {
		setCurrentDataConfigId(id);
		viewDispatch({ type: DATA_CONFIG_KEY });
	};

	const handleToComponentDocs = () => {
		viewDispatch({ type: COMPONENT_DOCUMENT_KEY });
	};

	const handleToActiveFlight = () => {
		viewDispatch({ type: ACTIVE_FLIGHT_KEY });
	};

	const handleToRocketSelect = () => {
		viewDispatch({ type: ROCKET_SELECT_KEY });
	};

	const handleToRocketDetails = (): any => {
		viewDispatch({ type: ROCKET_DETAILS_KEY });
	};

	function viewReducer(state: any, action: any) {
		switch (action.type) {
			case ROCKET_SELECT_KEY:
				return {
					view: ROCKET_SELECT_KEY,
					currentView: <RocketSelectionView 
						setCurrentView={handleToRocketDetails} 
						setRocketID={updateRocketID}
					/>
				}
			case COMPONENT_DOCUMENT_KEY:
				return {
					view: COMPONENT_DOCUMENT_KEY,
					currentView: <ComponentDocs />
				}
			case ROCKET_DETAILS_KEY:
				return {
					view: ROCKET_DETAILS_KEY,
					currentView: <RocketDetailsView 
						toDataConfig={handleToDataConfig} 
						setActiveView={handleToActiveFlight} 
						openActiveMission={updateMissionId} 
						rocketID={currentRocketId}
					/>
				}
			case DATA_CONFIG_KEY:
				return {
					view: DATA_CONFIG_KEY,
					currentView: <DataConfigView 
						onClickBack={handleToRocketDetails} 
						DataConfigID={currentDataConfigId}
					/>
				}
			case ACTIVE_FLIGHT_KEY:
				return {
					view: ACTIVE_FLIGHT_KEY,
					currentView: <SocketGateway>
						<ActiveMissionView 
							rocketId={currentRocketId} 
							missionId={currentMissionId} 
							backToRocketSelection={handleToRocketDetails}
						/>
					</SocketGateway>
				}
			default:
				throw Error(`Unknown action type: ${action.type}`);
		}
	}

	const [viewState, viewDispatch] = useReducer(viewReducer, {
		view: ROCKET_SELECT_KEY,
		currentView: <RocketSelectionView 
			setCurrentView={handleToRocketDetails} 
			setRocketID={updateRocketID}
		/>
	});

    return (
		<div className='app'>
			<ActiveMissionProvider>
				{viewState.currentView}
			</ActiveMissionProvider>
        </div>
    );
}
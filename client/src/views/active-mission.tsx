import React, { useEffect, useState, useReducer, useCallback } from "react";

// Utils
import { ActiveMissionProvider, useActiveMission } from "../utils/ActiveMissionContext";
import { IMissionPopulated, IRocketPopulated } from "../utils/entities";
import api from "../services/api";

// Icons
import TuneIcon from '@mui/icons-material/Tune';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

// Views
import StartUpView from './active/startup-view';
import FlightView from './active/flight-view';
import RocketSelectionView from './flight-report-view';

// Components UI
import { Button, Grid, Stack, Step, StepButton, Stepper, IconButton } from "@mui/material";
import SettingsDialog from "../components/SettingsDialog";

// Active Mission Keys
const START_UP_KEY = "START_UP";
const FLIGHT_KEY = "FLIGHT";
const RECOVERY_KEY = "RECOVERY";
const FLIGHT_REPORT_KEY = "FLIGHT_REPORT"; 
    
interface ViewProviderProps {
    rocketId: string;
    missionId: string;
    backToRocketSelection: () => void;
}

const ActiveMissionView: React.FC<ViewProviderProps> = (props: ViewProviderProps) => {
    const { rocketId, missionId, backToRocketSelection } = props;

    function phaseReducer(state: any, action: any) {
        switch (action.type) {
            case START_UP_KEY:
                return {
                    phase: START_UP_KEY,
                    currentView: <StartUpView rocket={rocket} />
                }
            case FLIGHT_KEY:
                return {
                    phase: FLIGHT_KEY,
                    currentView: <FlightView />
                }
            case RECOVERY_KEY:
                return {
                    phase: RECOVERY_KEY,
                    currentView: <></>
                }
            case FLIGHT_REPORT_KEY:
                return {
                    phase: FLIGHT_REPORT_KEY,
                    currentView: <RocketSelectionView />
                }
            default:
                throw Error(`Unknown action type: ${action.type}`);
            }
    }
    const [rocket, setRocket] = useState<IRocketPopulated>({} as IRocketPopulated);

    const [activePhaseState, activePhaseDispatch] = useReducer(phaseReducer, {
        phase: START_UP_KEY,
        currentView: <StartUpView rocket={rocket}/>
    });

    // Stepper State
    const activeStepKeys = [
        'Start up', 
        'Flight', 
        'Recovery', 
        'Flight Report'
    ];
    
    interface IActiveKeys {
        [key: number]: string;
    }

    const activeKeys: IActiveKeys = {
        0: START_UP_KEY,
        1: FLIGHT_KEY,
        2: RECOVERY_KEY,
        3: FLIGHT_REPORT_KEY
    }

    const [activeStep, setActiveStep] = useState<number>(0);
    const [completedStep, setCompletedStep] = useState<{
		[k: number]: boolean;
	}>({});

    const handleStep = (step: number) => () => {
		setActiveStep(step);
        activePhaseDispatch({ type: activeKeys[step] });
	};

    // Settings Dialog
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    
	const handleSettingsDialog = () => {
		setIsSettingsOpen(!isSettingsOpen);
	};

    // Context initial State
    const [mission, setActiveMission] = useState<IMissionPopulated>({} as IMissionPopulated);
    const activeContext = useActiveMission();

    const getActiveMission = async (): Promise<IMissionPopulated> => {
        console.log(missionId)
        const response = await api.getMission(missionId);
        const data = response.data as IMissionPopulated;
        activeContext.activeMissionDispatch({ type: 'SET_MISSION', payload: data });
        setActiveMission(data);
        return data; 
    };

    const handleRocketUpdate = () => {
        // activeContext.rocketDispatch({ type: 'SET_ROCKET', payload: rocket });
        setRocket(rocket);
    };

    const getActiveRocket = useCallback(async (): Promise<IRocketPopulated> => {
        console.log(rocketId);
        const response = await api.getRocket(rocketId);
        const data = response.data as IRocketPopulated;
        handleRocketUpdate();
        setRocket(data);
        return data;
    }, [rocketId]);

    useEffect(() => {
        // getActiveMission();
        getActiveRocket();
        // activeContext.rocketDispatch({ type: 'SET_ROCKET', payload: rocket });
        // activeContext.activeMissionDispatch({ type: 'SET_MISSION', payload: mission });
        console.log(activeContext);
    }, [rocketId, missionId]);

    return (
        <Grid container spacing={2} direction="row">
            {/* Any views should be rendered within this grid item */}
            <Grid item xs={10}>
                {activePhaseState.currentView}
            </Grid>

            <Grid item xs={2}>
                <Grid
                    paddingX="1rem"
                    paddingY="1rem"
                    container
                    direction="column"
                    justifyContent="space-between"
                    height="100%"
                    style={{ height: '100vh', overflow: 'auto' }}
                >
                    {/* TODO: Should call a Setting pop up */}
                    <Grid item justifyContent="end" alignContent={'end'}>
                        <SettingsDialog isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
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
                        <Stack direction={'row'} gap={2}>
                            <Button
                                startIcon={<NavigateBeforeIcon />}
                                fullWidth={true}
                                variant="contained"
                                color="primary"
                                onClick={backToRocketSelection}
                            >
                                Back
                            </Button>
                            <SettingsDialog isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
                            <IconButton color='primary' aria-label="settings" onClick={() => handleSettingsDialog()}>
                                <TuneIcon />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ActiveMissionView;

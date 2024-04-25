import React, { useEffect, useState, useReducer, useCallback } from "react";

// Utils
import { useActiveMission } from "../../utils/ActiveMissionContext";
import api from "../../services/api";

// Icons
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import WifiTetheringIcon from '@mui/icons-material/WifiTethering';
import BuildIcon from '@mui/icons-material/Build';
import ForumIcon from '@mui/icons-material/Forum';

// Panels
import ControlsPanel from "../../components/pdp-monitoring/ControlsPanel";

// Components UI
import { Box, Button, Grid, Paper, Stack, Typography, Tooltip, Fab, useTheme, useMediaQuery, BottomNavigation, BottomNavigationAction } from "@mui/material";

import Header, { Breadcrumb } from "../../components/Header";
import StartSequencePanel from "../../components/pdp-monitoring/StartSequencePanel";
import TelemetryLog from "../../components/logging/TelemetryLog";
import InstrumentationPanel from "../../components/pdp-monitoring/InstrumentationPanel";
import ConnectionDialog from "../../components/pdp-monitoring/ConnectionDialog";
import { IAprsTelemetryPacket } from "../../utils/TelemetryTypes";
import { Chat, InsertInvitation, Settings } from "@mui/icons-material";
import { useMonitoringSocketContext } from "../../utils/monitoring-system/monitoring-socket-context";
import EngineLogDialog from "../../components/logging/EngineLog";
import ConfigurationDialog from "../../components/pdp-monitoring/ConfigurationDialog";
import groundSupportDarkMode from  "../../static/images/groundSupportDarkMode.svg"
import { MCBSocketTesting } from "../../utils/monitoring-system/mcb-monitoring-context";
import useWebSocket from "react-use-websocket";
import { ControlsActionTypes, ControlsCommandTypes, ControlsValveTypes, IControlsPacket, PacketType } from "../../utils/monitoring-system/monitoring-types";

interface IPhoneViewProps {
   openSettings: () => void;
   openLog: () => void;
}

const PhoneView: React.FC<IPhoneViewProps> = (props: IPhoneViewProps) => {
    const [value, setValue] = useState<string>();
    return(
        <Box sx={{ width: '100vw', height: '100vh' }}>
            <Paper elevation={5} sx={{ padding: 2, borderRadius: 0 }}>
                <Stack direction="row" alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction="row" alignItems={'center'} spacing={2}>
                        <img src={groundSupportDarkMode} alt="Ground Support Icon" height={30}/>
                        <Typography align='left' variant='h6' fontWeight={'bold'}>
                            PDP Monitoring
                        </Typography>
                    </Stack> 
                </Stack>
            </Paper>  
            <Stack
                height={'100%'}
                padding={3}
                direction="column"
                gap={3}
                overflow={'none'}
            >
                {/* <InstrumentationPanel phone /> */}
                <Stack direction="row" spacing={2} sx={{ position: "absolute", bottom: 20 }}>
                    <Tooltip title="PDP Configuration" placement="top" arrow followCursor>
                        <Fab 
                            color="primary"                 
                            sx={{ borderRadius: 2 }}
                            onClick={() => props.openSettings()}
                        >
                            <Settings />
                        </Fab>
                    </Tooltip>
                    <Fab 
                        color="primary"
                        onClick={() => props.openLog()}
                        sx={{ borderRadius: 2 }}
                    >
                        <ForumIcon />
                    </Fab>
                </Stack>
            </Stack>
        </Box>
    );
};
interface IComputerViewProps {
    openSettings: () => void;
    openLog: () => void;
}

const ComputerView: React.FC<IComputerViewProps> = (props: IComputerViewProps) => {
    const colors: string[] = [
		'rgba(255, 197, 87, 1)',
		'rgba(214, 91, 79, 1)',
		'rgba(0, 94, 184, 1)',
		'rgba(69, 136, 201, 1)'
	];

    const breadCrumbs: Breadcrumb[] = [
		{ name: 'Rocket Selection', path: '/', active: false },
		{ name: 'PDP Monitoring', path: '/', active: true }
	];
    

    const {
        sendMessage,
        sendJsonMessage,
        lastMessage,
        lastJsonMessage,
        readyState,
        getWebSocket
    } = useWebSocket(`ws://localhost:8080`, {
        onOpen: () => console.log('Connected to MCB'),
        shouldReconnect: (closeEvent) => true
    });


    useEffect(() => {
        if (lastJsonMessage) {

            let receivedValve: any;
            const valveValue:string = lastJsonMessage['valve'];
            switch (valveValue){
                case 'MEV':
                    receivedValve = ControlsValveTypes.MEV;
                    break;
                case 'N2OF':
                    receivedValve = ControlsValveTypes.N2OFlow;
                    break;
                case 'N2OV':
                    receivedValve = ControlsValveTypes.N2OVent;
                    break;
                case 'N2F':
                    receivedValve = ControlsValveTypes.N2Flow;
                    break;
                case 'N2V':
                    receivedValve = ControlsValveTypes.N2Vent;
                    break;
                case 'RTV':
                    receivedValve = ControlsValveTypes.RTV;
                    break;
                case 'NCV':
                    receivedValve = ControlsValveTypes.NCV;
                    break;
                case 'EVV':
                    receivedValve = ControlsValveTypes.EVV;
                    break;
                default:
                    break;
            }

            const payload: IControlsPacket = {
                identifier: PacketType.CONTROLS,
                command: ControlsCommandTypes.CONTROL,
                valve: receivedValve,
                action: lastJsonMessage['action'] == 'OPEN' ? ControlsActionTypes.OPEN : ControlsActionTypes.CLOSE
            };
            console.log(payload)
            socketContext.setControlsPacketOut(payload)
        }
    }, [lastJsonMessage]);

    return (
        <Box sx={{ width: '100vw', height: '100vh' }}>
            <Stack
                height={'100%'}
                padding={3}
                direction="column"
                gap={3}
                overflow={'none'}
            >
                {/* Page Header */}
                <Grid item >
                    <Header breadCrumbs={breadCrumbs} />
                </Grid>
                {/* Rocket Title */}
                <Grid item>
                    <Paper elevation={2} sx={{ padding: 2 }}>
                        <Stack direction="row" alignItems={'center'} justifyContent={'space-between'}>
                            <Stack direction="row" alignItems={'center'} spacing={2}>
                                <LocalFireDepartmentIcon color={'primary'} /> 
                                <Typography align='left' variant='h6'>
                                    PDP Monitoring System
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <Tooltip title="PDP Configuration" placement="top" arrow followCursor>
                                    <Button variant={'contained'} onClick={() =>props.openSettings()}>
                                        <Settings />
                                    </Button>
                                </Tooltip>
                                <Button 
                                    variant={'contained'}
                                    onClick={() => props.openLog()}
                                    >
                                    <ForumIcon />
                                </Button>
                                <Button 
                                    variant="contained" 
                                    size={'large'} 
                                >
                                    Instrumentation
                                </Button>
                                <Button 
                                    variant="contained" 
                                    size={'large'} 
                                    startIcon={<WifiTetheringIcon/>} 
                                >
                                    Connect
                                </Button>
                            </Stack>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item>
                    <Stack direction="row" spacing={2}>
                        <Stack direction="column" spacing={2} alignItems={'center'}>
                            <ControlsPanel />
                            <StartSequencePanel />
                        </Stack>
                        <InstrumentationPanel />
                    </Stack>
                </Grid>
            </Stack>
            <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
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
           
        </Box>
    );
}

interface ViewProviderProps {
    rocketId?: string;
    missionId?: string;
    backToRocketSelection: () => void;
}

const EngineMonitoringView: React.FC<ViewProviderProps> = (props: ViewProviderProps) => {
    // const { rocketId, missionId, backToRocketSelection } = props;
    const theme = useTheme();
    const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'));

    // Context initial State
    const socketContext = useMonitoringSocketContext();
    
    const [currentPacket, setCurrentPacket] = useState({});
    const [openConnection, setOpenConnection] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);
    const [openLog, setOpenLog] = useState(false);

    useEffect(() => {
        if (currentPacket) {
            setCurrentPacket(socketContext.logs);
        }
    }, [currentPacket]);

    return (
        <>
            {!isNotMobile ?
                <PhoneView 
                    openSettings={() => setOpenSettings(true)}
                    openLog={() => setOpenLog(true)}
                />
                :
                <ComputerView 
                    openSettings={() => setOpenSettings(true)}
                    openLog={() => setOpenLog(true)}
                />
            }
            
            <ConnectionDialog 
                isOpen={openConnection} 
                onClose={() => setOpenConnection(false)}
            />
            <EngineLogDialog
                isOpen={openLog}
                onClose={() => setOpenLog(false)}
                isMobile={!isNotMobile}
            />
            <ConfigurationDialog 
                isOpen={openSettings} 
                onClose={() => setOpenSettings(false)}
            />
        </>
    );
    
}

export default EngineMonitoringView;

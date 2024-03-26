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
import { Box, Button, Grid, Paper, Stack, Typography, Tooltip } from "@mui/material";

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

interface ViewProviderProps {
    rocketId?: string;
    missionId?: string;
    backToRocketSelection: () => void;
}

const EngineMonitoringView: React.FC<ViewProviderProps> = (props: ViewProviderProps) => {
    // const { rocketId, missionId, backToRocketSelection } = props;

    const colors: string[] = [
		'rgba(255, 197, 87, 1)',
		'rgba(214, 91, 79, 1)',
		'rgba(0, 94, 184, 1)',
		'rgba(69, 136, 201, 1)'
	];

    
    // Context initial State
    const activeContext = useActiveMission();
    const socketContext = useMonitoringSocketContext();
    
	const breadCrumbs: Breadcrumb[] = [
		{ name: 'Rocket Selection', path: '/', active: false },
		{ name: 'PDP Monitoring', path: '/', active: true }
	];
    
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
                                    <Button variant={'contained'} onClick={() => setOpenSettings(openSettings => !openSettings)}>
                                        <Settings />
                                    </Button>
                                </Tooltip>
                                <Button 
                                    variant={'contained'}
                                    onClick={() => setOpenLog(openLog => !openLog)}
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
                                    onClick={() => {
                                        setOpenConnection(!openConnection);  
                                        socketContext.toggleConnection
                                    }}
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
                <Grid item>
                    
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
            <ConnectionDialog 
                isOpen={openConnection} 
                onClose={() => setOpenConnection(false)}
            />
            <EngineLogDialog
                isOpen={openLog}
                onClose={() => setOpenLog(false)}
            />
            <ConfigurationDialog 
                isOpen={openSettings} 
                onClose={() => setOpenSettings(false)}
            />
        </Box>
    );
}

export default EngineMonitoringView;

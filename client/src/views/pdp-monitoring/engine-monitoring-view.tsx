import React, { useEffect, useState, useReducer, useCallback } from "react";

// Utils
import { useActiveMission } from "../../utils/ActiveMissionContext";
import api from "../../services/api";

// Icons
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import WifiTetheringIcon from '@mui/icons-material/WifiTethering';
import BuildIcon from '@mui/icons-material/Build';

// Panels
import ControlsPanel from "../../components/pdp-monitoring/ControlsPanel";

// Components UI
import { Box, Button, Grid, Paper, Stack, Typography, Tooltip } from "@mui/material";

import Header, { Breadcrumb } from "../../components/Header";
import StartSequencePanel from "../../components/pdp-monitoring/StartSequencePanel";
import TelemetryLog from "../../components/logging/TelemetryLog";
import InstrumentationPanel from "../../components/pdp-monitoring/InstrumentationPanel";

import { IAprsTelemetryPacket } from "../../utils/TelemetryTypes";
import { InsertInvitation } from "@mui/icons-material";
import { useMonitoringSocketContext } from "../../utils/monitoring-system/monitoring-socket-context";

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
    
    const [currentPacket, setCurrentPacket] = useState<IAprsTelemetryPacket>({
		Raw: [''],
		Parsed: {
			timeStampLocal: '0-0-0',
			timeStampUnix: '0.0',
			latitude: 0,
			longitude: 0,
			altitude: 0,
			lock: false,
		}
	});
    
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
                                    <Button variant={'contained'}>
                                        <BuildIcon />
                                    </Button>
                                </Tooltip>
                                <Button 
                                    variant="contained" 
                                    size={'large'} 
                                    startIcon={<WifiTetheringIcon/>} 
                                    onClick={socketContext.toggleConnection}
                                >
                                    Connect
                                </Button>
                            </Stack>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item>
                    <Stack direction="row" spacing={2}>
                        <ControlsPanel />
                        <TelemetryLog width={'auto'} maxRows={10} packet={currentPacket} telemetryConnected={true} />
                        <InstrumentationPanel />
                    </Stack>
                </Grid>
                <Grid item>
                    <StartSequencePanel />
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

export default EngineMonitoringView;

import React, { useEffect, useState, useReducer, useCallback } from "react";

// Utils
import { useActiveMission } from "../../utils/ActiveMissionContext";
import { IDataPoint, IMission, IMissionPopulated, IRocketPopulated } from "../../utils/entities";
import api from "../../services/api";

// Icons
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import WifiTetheringIcon from '@mui/icons-material/WifiTethering';

// Panels
import ControlsPanel from "../../components/pdp-monitoring/ControlsPanel";

// Components UI
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import Header, { Breadcrumb } from "../../components/Header";
import StartSequencePanel from "../../components/pdp-monitoring/StartSequencePanel";

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

	const breadCrumbs: Breadcrumb[] = [
		{ name: 'Rocket Selection', path: '/', active: false },
		{ name: 'PDP Monitoring', path: '/', active: true }
	];
    
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
                            <Button 
                                variant="contained" 
                                size={'large'} 
                                startIcon={<WifiTetheringIcon/>} 
                            >
                                Connect
                            </Button>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item>
                    <ControlsPanel />
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

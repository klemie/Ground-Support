import React, { useCallback, useEffect, useState } from 'react';

import api from '../../services/api';
import { IRocketPopulated } from '../../utils/entities';
import { Alert, AlertTitle, Box, Button, ButtonGroup, IconButton, Link, Skeleton, Snackbar, SnackbarContent, Stack, Tooltip, Typography } from '@mui/material';
import Header, { Breadcrumb } from '../../components/Header';
import { ViewKeys } from '../../utils/viewProviderContext';
import { useActiveMission } from '../../utils/ActiveMissionContext';
import { Chat, Settings, WifiTethering, Save, Close } from '@mui/icons-material';
import TelemetryStatus from '../../components/rocket-monitoring/TelemetryStatus';
import ConnectionDialog from '../../components/rocket-monitoring/ConnectionDialog';
import { useSocketContext } from '../../utils/socket-context';
import TelemetryPacket from '../../components/rocket-monitoring/TelemetryPacket';
import TelemetryLog from '../../components/logging/TelemetryLog';
import TelemetryAltitudeGraph from '../../components/rocket-monitoring/TelemetryAltitudeGraph';
import TelemetryMap from '../../components/rocket-monitoring/TelemetryMap';
import { useTheme } from '@emotion/react';

interface IRocketMonitoringViewProps {
    // rocketId: string;
}

const RocketMonitoringView: React.FC<IRocketMonitoringViewProps> = (props: IRocketMonitoringViewProps) => {
    const [rocket, setRocket] = useState<IRocketPopulated>({} as IRocketPopulated);

    // const getActiveRocket = useCallback(async (): Promise<IRocketPopulated> => {
    //     const response = await api.getRocket(rocketId || '');
    //     const data = response.data as IRocketPopulated;
    //     setRocket(data);
    //     return data;
    // }, [rocketId]);

    useEffect(() => {
        // getActiveRocket();
    }, []);
    
    const activeContext = useActiveMission();
    const theme = useTheme();

    const breadCrumbs: Breadcrumb[] = [
		{ name: "Ground Support", viewKey: ViewKeys.PLATFORM_SELECTION_KEY, active: false },
		{ name: activeContext.rocket.Name, viewKey: ViewKeys.ROCKET_DETAILS_KEY, active: false },
		{ name: activeContext.activeMission.Name || "New Mission", viewKey: ViewKeys.ACTIVE_FLIGHT_KEY, active: true }
	];

    const [openConnection, setOpenConnection] = useState<boolean>(false);
    const socketContext = useSocketContext();
    const [launchAltitude, setLaunchAltitude] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [publishMission, setPublishMission] = useState<boolean>(false);

    useEffect(() => {
        if (socketContext.isConnected) {
            const interval = setInterval(() => {
                setLoading(false);
            }, 2500);
            return () => {
                clearInterval(interval);
                setLoading(true);
            }
        }
    }, [socketContext.isConnected]);


    return (
        <Box sx={{ width: '100vw', height: '100vh', overflowX: 'none' }}>
            <Stack
                height={'100%'}
                padding={4}
                direction="column"
                gap={2}
                overflow={'none'}
            >
                <Stack direction="row" alignItems={'center'} justifyContent={'space-between'}>
                    <Header icon="ROCKET_MONITORING" breadCrumbs={breadCrumbs} />
                    <Stack direction="row" spacing={1}>
                        <Stack direction="column" spacing={1}>
                            <ButtonGroup
                                variant="contained"
                            >
                                <Button
                                    startIcon={<Save/>}
                                    disabled={!socketContext.isConnected}
                                    onClick={() => setPublishMission(true)}
                                >
                                    Publish Mission
                                </Button>
                                <Button 
                                    variant="contained" 
                                    size={'large'} 
                                    startIcon={<WifiTethering/>} 
                                    onClick={() => {
                                        if (socketContext.isConnected) {
                                            socketContext.toggleConnection();
                                        } else {
                                            setOpenConnection(!openConnection);  
                                        }
                                    }}
                                >
                                    {socketContext.isConnected ? "Disconnect" : "Connect"}
                                </Button>
                            </ButtonGroup>
                            <Snackbar
                                open={publishMission}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            >
                                <Alert 
                                    severity="warning"
                                    onClose={() => setPublishMission(false)}
                                >
                                    <AlertTitle>Are you sure?</AlertTitle>
                                    <Stack alignItems={'end'} gap={1}>
                                        Once a mission is published no more data can be recorded and the mission be available in replay mode only.  
                                        <Button
                                            color="inherit"
                                            variant='contained'
                                            size="small"
                                            sx={{
                                                width: 'fit-content',
                                            }}
                                            onClick={() => {
                                                activeContext.activeMission.Published = true;
                                                // TODO: update mission with published status & data
                                                setPublishMission(false)
                                            }}
                                        >
                                            Continue
                                        </Button>
                                    </Stack>
                                </Alert>
                            </Snackbar>
                        </Stack>
                    </Stack>
                </Stack>
                <TelemetryStatus launchAltitude={launchAltitude} />
                {socketContext.isConnected ? loading ? (
                    <Stack gap={2}>
                        <Stack direction="row" gap={2}>
                            <Skeleton variant="rectangular" height={300} width={'20%'} sx={{ borderRadius: 2 }} />
                            <Skeleton variant="rectangular" height={300} width={'40%'} sx={{ borderRadius: 2 }} />
                            <Skeleton variant="rectangular" height={300} width={'40%'} sx={{ borderRadius: 2 }} />
                        </Stack>
                        <Skeleton variant="rectangular" height={300} width={'100%'} sx={{ borderRadius: 2 }} />
                    </Stack>

                ) :(
                        <Stack direction="column" gap={2} width={'100%'}>
                            <Stack direction="row" gap={2}>
                                <TelemetryPacket />
                                <TelemetryLog />
                                <TelemetryMap />
                            </Stack>
                            <TelemetryAltitudeGraph />
                        </Stack>
                ) : (
                    <Alert severity="info">
                        Connect to telemetry to see data. <Link href='#' color={'inherit'}>FAQ</Link> for common issues and solutions.
                    </Alert>
                )}
            </Stack>
            <ConnectionDialog 
                updateAltitude={setLaunchAltitude} 
                isOpen={openConnection} 
                onClose={() => setOpenConnection(false)} 
            />
        </Box>
    );
};

export default RocketMonitoringView;
import React, { useCallback, useEffect, useState } from 'react';

import api from '../../services/api';
import { IRocketPopulated } from '../../utils/entities';
import { Alert, Box, Button, ButtonGroup, Skeleton, Stack, Tooltip } from '@mui/material';
import Header, { Breadcrumb } from '../../components/Header';
import { ViewKeys } from '../../utils/viewProviderContext';
import { useActiveMission } from '../../utils/ActiveMissionContext';
import { Settings, WifiTethering } from '@mui/icons-material';
import TelemetryStatus from '../../components/rocket-monitoring/TelemetryStatus';
import ConnectionDialog from '../../components/rocket-monitoring/ConnectionDialog';
import { useSocketContext } from '../../utils/socket-context';
import TelemetryPacket from '../../components/rocket-monitoring/TelemetryPacket';
import TelemetryLog from '../../components/logging/TelemetryLog';

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

    const breadCrumbs: Breadcrumb[] = [
		{ name: "Ground Support", viewKey: ViewKeys.PLATFORM_SELECTION_KEY, active: false },
		{ name: activeContext.rocket.Name, viewKey: ViewKeys.ROCKET_DETAILS_KEY, active: false },
		{ name: activeContext.activeMission.Name || "New Mission", viewKey: ViewKeys.ACTIVE_FLIGHT_KEY, active: true }
	];

    const [openConnection, setOpenConnection] = useState<boolean>(false);
    const socketContext = useSocketContext();
    const [launchAltitude, setLaunchAltitude] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

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
        <Box sx={{ width: '100vw', height: '100vh' }}>
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
                        <Tooltip title="Configuration" placement="top">
                            <Button variant={'text'} onClick={() => {}}>
                                <Settings />
                            </Button>
                        </Tooltip>
                        <ButtonGroup
                            variant="contained"
                        >
                            <Button 
                                aria-readonly
                                disabled
                                color={"success"}
                            >
                                Server Connected
                            </Button>
                            <Button 
                                variant="contained" 
                                size={'large'} 
                                startIcon={<WifiTethering/>} 
                                sx={{ width: 180 }}
                                onClick={() => {
                                    setOpenConnection(!openConnection);  
                                }}
                            >
                                {socketContext.isConnected ? "Disconnect" : "Connect"}
                            </Button>
                        </ButtonGroup>
                    </Stack>
                </Stack>
                <TelemetryStatus launchAltitude={launchAltitude} />
                {socketContext.isConnected ? loading ? (
                    <Stack direction="row" gap={2}>
                        <Skeleton variant="rectangular" height={300} width={'30%'} sx={{ borderRadius: 2 }} />
                        <Skeleton variant="rectangular" height={300} width={'70%'} sx={{ borderRadius: 2 }} />
                    </Stack>
                ) :(
                    <Stack direction="row" gap={2}>
                        <TelemetryPacket />
                        <TelemetryLog />
                    </Stack>
                ) : (
                    <Alert severity="info">
                        Connect to telemetry to see data
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
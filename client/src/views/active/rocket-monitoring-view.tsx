import React, { useCallback, useEffect, useState } from 'react';

import api from '../../services/api';
import { IRocketPopulated } from '../../utils/entities';
import { Box, Button, ButtonGroup, Stack, Tooltip } from '@mui/material';
import Header, { Breadcrumb } from '../../components/Header';
import { ViewKeys } from '../../utils/viewProviderContext';
import { useActiveMission } from '../../utils/ActiveMissionContext';
import { Settings, WifiTethering } from '@mui/icons-material';

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

    return (
        <Box sx={{ width: '100vw', height: '100vh' }}>
            <Stack
                height={'100%'}
                padding={4}
                direction="column"
                gap={4}
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
                            <Tooltip title={"Serial Status"}>
                                <Button 
                                    aria-readonly
                                    disabled
                                    color={"success"}
                                >
                                    Telemetry Lock
                                </Button>
                            </Tooltip>
                            <Button 
                                variant="contained" 
                                size={'large'} 
                                startIcon={<WifiTethering/>} 
                                sx={{ width: 180 }}
                                onClick={() => {
                                    // setOpenConnection(!openConnection);  
                                    // socketContext.toggleConnection();
                                }}
                            >
                                Connect
                                {/* {socketContext.connect ? "Disconnect" : "Connect"} */}
                            </Button>
                        </ButtonGroup>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
};

export default RocketMonitoringView;
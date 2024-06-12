import { Button, Chip, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSocketContext } from '../../utils/socket-context';

import { GpsFixed, GpsOff, GpsNotFixed } from '@mui/icons-material';

interface ITelemetryStatusProps {
    launchAltitude?: number;
}

const TelemetryStatus: React.FC<ITelemetryStatusProps> = (props: ITelemetryStatusProps) => {
    const socketContext = useSocketContext();

    const [protocol, setProtocol] = useState<string>('APRS');
    useEffect(() => {
        setProtocol(socketContext.protocol);
    }, [socketContext.protocol]);

    const [frequency, setFrequency] = useState<number>(433.92);
    useEffect(() => {
        setFrequency(socketContext.frequency);
    }, [socketContext.frequency]);

    const [ launchAltitude, setLaunchAltitude ] = useState<number>(0);

    useEffect(() => {
        if (props.launchAltitude) {
            setLaunchAltitude(props.launchAltitude);
        }
    }, [props.launchAltitude]);

    return (
        <Paper
            sx={{     
                borderRadius: 2,
                padding: 2
            }}
        >
            <Stack spacing={2} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant='h6' fontWeight={600}>Telemetry Information</Typography>
                <Stack spacing={2} direction={'row'} alignItems={'center'}>
                    <Tooltip title={'GPS Lock if green'}>
                        <IconButton 
                            disabled={!socketContext.isConnected}
                            color={socketContext.gpsLock ? 'success' : 'error'}
                        >
                            {socketContext.isConnected ? 
                                socketContext.gpsLock ? 
                                    (<GpsNotFixed />) 
                                    : ( <GpsFixed />) 
                            : (
                                <GpsOff />
                            )}   
                        </IconButton>
                    </Tooltip>
                    <Chip
                        label={`Launch Altitude: ${launchAltitude} FT`} 
                        sx={{ 
                            fontWeight: 600, 
                            borderRadius: 1 
                        }} 
                        color='default' 
                    />
                    <Chip
                        label={`Frequency: ${frequency} MHz`} 
                        sx={{ 
                            fontWeight: 600, 
                            borderRadius: 1 
                        }} 
                        color='default' 
                    />
                    <Chip 
                        label={`Protocol: ${protocol}`} 
                        sx={{ 
                            fontWeight: 600, 
                            borderRadius: 1 
                        }} 
                        color='default' 
                    />
                </Stack>
            </Stack>
        </Paper>
    );
}

export default TelemetryStatus;
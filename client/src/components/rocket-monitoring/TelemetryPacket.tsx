import { Button, Chip, Icon, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSocketContext } from '../../utils/socket-context';
import { Badge, Public, Height, ShowChart, HorizontalRule } from '@mui/icons-material';

interface IPacketContent {
    label: string;
    value: string;
    icon: any;
}

const TelemetryPacket: React.FC = () => {
    const socketContext = useSocketContext();

    const content: IPacketContent[] = [
        {
            label: 'Call Sign',
            value: 'N/A',
            icon: <Badge />
        },
        {
            label: 'Altitude',
            value: 'ft (AGL)',
            icon: <ShowChart />
        },
        {
            label: 'Longitude',
            value: '0.00 °',
            icon: <Height />
        },
        {
            label: 'Latitude',
            value: '0.00 °',
            icon: <HorizontalRule />
        }
    ]

    useEffect(() => {
        console.log(socketContext.packet);
    }, [socketContext.packet]);

    return (
        <Paper
            sx={{     
                borderRadius: 2,
                padding: 2,
                width: 250
            }}
        >
            <Stack spacing={2} direction={'column'}>
                <Typography variant='h6' fontWeight={600}>
                    Telemetry Packet
                </Typography>
                {content.map((item: IPacketContent, index: number) => (
                    <Stack direction={'row'} justifyContent={'space-between'} key={index}>
                        <Stack spacing={1} direction={'row'} alignItems={'center'}>
                            {item.icon}
                            <Typography fontWeight={500}>
                                {item.label}
                            </Typography>
                        </Stack>
                        <Chip
                            label={item.value} 
                            sx={{ 
                                fontWeight: 600, 
                                borderRadius: 1 
                            }} 
                            color='default' 
                        />
                    </Stack>
                ))}
            </Stack>
        </Paper>
    );
}

export default TelemetryPacket;
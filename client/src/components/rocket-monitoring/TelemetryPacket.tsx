import { Button, Chip, Icon, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSocketContext } from '../../utils/socket-context';
import { Badge, Height, ShowChart, HorizontalRule, Timer } from '@mui/icons-material';



const TelemetryPacket: React.FC = () => {
    const socketContext = useSocketContext();

    const [timeSincePacket, setTimeSincePacket] = useState<number>(0);

    useEffect(() => {
        if ((socketContext.packet && socketContext.isConnected)) {        
            const interval = setInterval(() => {
                setTimeSincePacket(timeSincePacket + 1);    
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timeSincePacket, socketContext.packet]);

    interface IPacketContent {
        label: string;
        value: string;
        icon: any;
    }

    const content: IPacketContent[] = [
        {
            label: 'Call Sign',
            value: 'N/A',
            icon: <Badge />
        },
        {
            label: 'Altitude',
            value: 'ft (ALG)',
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
                width: 300,
                minWidth: 'fit-content',
            }}
        >
            <Stack spacing={2} direction={'column'}>
                <Typography variant='h6' fontWeight={600}>
                    Current Packet
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
                            size='small'
                        />
                    </Stack>
                ))}
                <Chip 
                    label={`Time Since: ${timeSincePacket}s`}
                    icon={<Timer />}
                    size='medium'
                    sx={{ 
                        fontWeight: 600, 
                        borderRadius: 1 
                    }} 
                    color='default'
                />
            </Stack>
        </Paper>
    );
}

export default TelemetryPacket;
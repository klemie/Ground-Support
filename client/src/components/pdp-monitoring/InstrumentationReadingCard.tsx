import { MoreVert } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface IProps {
  // props
}

const InstrumentationReadingCard: React.FC<IProps> = (props: IProps) => {

    useEffect(() => {

    }, []);

    return (
        <Card sx={{ maxWidth: 250, maxHeight: 250 }}>
            <CardHeader
                sx={{ backgroundColor: '#42464D', color: 'white'}}
                title="Combustion"
                action={
                    <Stack direction={"row"} marginX={1}>
                        <Tooltip title="Visualization Type">
                            <IconButton>
                                <MoreVert/>
                            </IconButton>
                        </Tooltip>
                        <Box
                            sx={{ 
                                backgroundColor: 'rgba(255, 197, 87, 1)',
                                color: 'white',
                                borderRadius: 1,
                                padding: 1,
                                width: 35,
                                height: 35
                            }}
                            textAlign={'center'}
                        >
                            <Typography paddingRight={0.25} margin={0} sx={{ fontWeight: "bold" }}>T</Typography>
                        </Box>
                    </Stack>
                }
            />
            <CardContent>
                <div>
                    <p>Temperature: 0</p>
                    <p>Pressure: 0</p>
                    <p>Altitude: 0</p>
                </div>
            </CardContent>
            <CardActions>
                <div>
                    <p>Time: 0</p>
                </div>
            </CardActions>
        </Card>
    );
};

export default InstrumentationReadingCard;
import { MoreVert } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, Paper, Popper, Stack, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

export enum InstrumentationType_t {
    TEMPERATURE = 'Temperature',
    PRESSURE = 'Pressure',
    LOAD = 'Load'
}

interface IInstrumentationReadingType {
    label: string;
    color: string;
}

interface IInstrumentationModuleProps {
    title: string;
    type: InstrumentationType_t;
}

export const InstrumentationModule: React.FC<IInstrumentationModuleProps> = (props: IInstrumentationModuleProps) => {
    const { title, type } = props;

    const [InstrumentationType, setInstrumentationType] = useState<IInstrumentationReadingType>({
        label: "",
        color: ""
    });

    useEffect(() => {
        switch (type) {
            case InstrumentationType_t.TEMPERATURE:
                setInstrumentationType({
                    label: "T",
                    color: "#D65B4F"
                });
                break;
            case InstrumentationType_t.LOAD:
                setInstrumentationType({
                    label: "L",
                    color: "#FFC557"
                });
                break;
            case InstrumentationType_t.PRESSURE:
                setInstrumentationType({
                    label: "P",
                    color: "#005EB8"
                });
                break;
        }
    }, []);

    return (
        <Card sx={{ maxWidth: 250, maxHeight: 250 }}>
            <CardHeader
                sx={{ backgroundColor: '#42464D', color: 'white'}}
                title={title}
                action={
                    <Stack direction={"row"} marginX={1}>
                        <Popper
                            open={false}
                            placement="bottom-start"
                            disablePortal={false}
                            modifiers={[
                                {
                                name: 'flip',
                                enabled: true,
                                options: {
                                    altBoundary: true,
                                    rootBoundary: 'document',
                                    padding: 8,
                                },
                                },
                                {
                                name: 'preventOverflow',
                                enabled: true,
                                options: {
                                    altAxis: true,
                                    altBoundary: true,
                                    tether: true,
                                    rootBoundary: 'document',
                                    padding: 8,
                                },
                                },
                                {
                                name: 'arrow',
                                enabled: false,
                                },
                            ]}
                        >
                            <Paper>
                                <Stack direction="column">
                                    <Button>Settings</Button>
                                    <Button>Calibrate</Button>
                                </Stack>
                            </Paper>
                        </Popper>

                        <Tooltip title="Visualization Type">
                            <IconButton>
                                <MoreVert/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip 
                            title={`${type} Reading`}
                        >
                            <Box
                                sx={{ 
                                    backgroundColor: InstrumentationType.color,
                                    color: 'white',
                                    borderRadius: 1,
                                    padding: 1,
                                    width: 35,
                                    height: 35
                                }}
                                textAlign={'center'}
                            >
                                <Typography margin={0} sx={{ fontWeight: "bold" }}>{InstrumentationType.label}</Typography>
                            </Box>
                        </Tooltip>
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

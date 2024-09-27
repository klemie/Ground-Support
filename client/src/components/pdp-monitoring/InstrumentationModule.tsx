import { MoreVert } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, Paper, Popper, Stack, Typography } from '@mui/material';
import { Menu, MenuItem, } from '@mui/material';
import VisualizationMenu from "./VisualizationMenu"; //In progress to make the menu code a component
import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis  } from 'recharts';

export enum IInstrumentationType {
    TEMPERATURE = 'Temperature',
    PRESSURE = 'Pressure',
    LOAD = 'Load',
    MASS = 'Mass'
}

interface IInstrumentationReadingType {
    label: string;
    color: string;
    threshold: number; //Threshold to show yellow
    max: number; //Threshold to show red
    unit: "N" | "PSI" | "KG" | "°C"
}

interface IInstrumentationModuleProps {
    title: string;
    type: IInstrumentationType;
    reading: number;
    hide: () => void;
}

interface IChartItem {
    packetNumber: number;
    reading: number;
}

export const InstrumentationModule: React.FC<IInstrumentationModuleProps> = (props: IInstrumentationModuleProps) => {
    const { title, type, reading, hide } = props;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    
    const open = Boolean(anchorEl);
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    const [InstrumentationType, setInstrumentationType] = useState<IInstrumentationReadingType>({} as IInstrumentationReadingType);

    const [moduleVisualizationType, setModuleVisualizationType] = useState<'graph' | 'value' | 'both' | string>('both');

    const [data, setData] = useState<IChartItem[]>([]);

    enum ReadingColorType {
        DEFAULT = '#515356',
        IN_RANGE = '#419769',
        WARNING = '#D79C00',
        DANGER = '#D65B4F'
    } 

    const [readingColor, setReadingColor] = useState<ReadingColorType>(ReadingColorType.DEFAULT);

    useEffect(() => {
        switch (type) {
            case IInstrumentationType.TEMPERATURE:
                setInstrumentationType({
                    label: "T",
                    color: "#D65B4F",
                    threshold: 773, 
                    max: 973,
                    unit: "°C"
                });
                break;
            case IInstrumentationType.LOAD:
                setInstrumentationType({
                    label: "L",
                    color: "#FFC557",
                    threshold: 20,
                    max:30,
                    unit: "N"
                });
                break;
            case IInstrumentationType.PRESSURE:
                setInstrumentationType({
                    label: "P",
                    color: "#005EB8",
                    threshold: 750,
                    max: 800,
                    unit: "PA"
                });
                break;
            case IInstrumentationType.MASS:
                setInstrumentationType({
                    label: "M",
                    color: "#3FB684",
                    threshold: 25,
                    max: 50,
                    unit: "KG"
                });
                break;
        }
    }, []);

    useEffect(() => {
        if (reading == null) return;
        setData(prevData => {
            const packetNumber = prevData.length != 0 ? prevData[prevData.length - 1].packetNumber + 1 : 1;
            
            const newData = prevData.length >= 10 ? prevData.slice(1) : prevData;

            return [...newData, {
                packetNumber: packetNumber,
                reading: reading
            }];
        });

        if (reading > InstrumentationType.threshold && reading < InstrumentationType.max) {
            setReadingColor(ReadingColorType.WARNING);
        } else if (reading > InstrumentationType.max) {
            setReadingColor(ReadingColorType.DANGER);
        } else {
            setReadingColor(ReadingColorType.IN_RANGE);
        }

    }, [reading]);
   

    return (
        <Card
            sx={{
                height: 'min-content',
            }}
        >
            <CardHeader
                sx={{ backgroundColor: '#42464D', color: 'white' }}
                titleTypographyProps={{
                    variant: "button",
                    fontWeight: "bold"
                }}
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

                        <Stack>
                            <IconButton
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <MoreVert/>
                            </IconButton>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={() => {
                                    setModuleVisualizationType('graph');
                                    handleClose();
                                }}>Graph</MenuItem>
                                <MenuItem onClick={() => {
                                    setModuleVisualizationType('value');
                                    handleClose();
                                }}>Value</MenuItem>
                                <MenuItem onClick={() => {
                                    setModuleVisualizationType('both');
                                    handleClose();
                                }}>Graph and Value</MenuItem>
                            </Menu>
                        </Stack>
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
                    </Stack>
                }
            />
            <CardContent>
                <Stack spacing={1}>
                    {
                        (moduleVisualizationType == 'graph' || moduleVisualizationType == 'both') ?
                        <ResponsiveContainer width={200} height={150}>
                            <LineChart  
                                data={data}
                                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                            >
                                <Line 
                                    type="monotone" 
                                    dataKey="reading" 
                                    stroke={"#515356"}
                                    strokeWidth={3} 
                                    activeDot={{r: 5}}
                                    isAnimationActive={false}
                                />
                                <XAxis dataKey={'packetNumber'} />
                                <YAxis   />
                                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                <Tooltip />
                            </LineChart>
                        </ResponsiveContainer>
                        :
                        <></>
                    }
                    {
                        (moduleVisualizationType == 'value' || moduleVisualizationType == 'both') ?
                        <Box
                            sx={{ 
                                backgroundColor: readingColor,
                                color: 'white',
                                borderRadius: 1,
                                padding: 1,
                            }}
                        >
                            <Stack justifyContent={'space-between'} direction={'row'} marginX={1}>
                                <Typography margin={0} sx={{ fontWeight: "bold" }}>{Math.round(reading) ?? '—'}</Typography>
                                <Typography margin={0} sx={{ fontWeight: "bold" }}>{InstrumentationType.unit}</Typography>
                            </Stack>
                        </Box>
                        :
                        <></>
                    }
                </Stack>
            </CardContent>
        </Card>
    );
};

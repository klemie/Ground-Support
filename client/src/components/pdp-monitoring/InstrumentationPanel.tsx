import { Chip, Grid, IconButton, Paper, Stack, Switch, Tooltip, Typography, styled, } from '@mui/material';
import React, { useEffect, useState } from 'react';

import SensorsIcon from '@mui/icons-material/Sensors';
import { InstrumentationModule, IInstrumentationType } from './InstrumentationModule';
import { useMonitoringSocketContext } from '../../utils/monitoring-system/monitoring-socket-context';
import SettingsInputCompositeIcon from '@mui/icons-material/SettingsInputComposite';

interface InstrumentationPanelProps {
    onClickConfigure: () => void;
}

const InstrumentationPanel: React.FC<InstrumentationPanelProps> = (props: InstrumentationPanelProps) => {
    const { onClickConfigure } = props;
    const socketContext = useMonitoringSocketContext();
    const [data, setData] = useState<{
        [key: string]: number;
    } | null>(null);

    useEffect(() => {
        setData(socketContext.instrumentationPacketIn);
    }, [socketContext.instrumentationPacketIn]);
    
    const sensors = [
        {
            label: "Run Tank",
            key: "T_RUN_TANK",
            type: IInstrumentationType.TEMPERATURE,
            display: true
        },
        // {
        //     label: "Injector",
        //     key: "T_INJECTOR",
        //     type: IInstrumentationType.TEMPERATURE,
        //     display: true
        // },
        {
            label: "Comb Chamber",
            key: "T_COMBUSTION_CHAMBER",
            type: IInstrumentationType.TEMPERATURE,
            display: true
        },
        // {
        //     label: "Pre Combu",
        //     key: "T_POST_COMBUSTION",
        //     type: IInstrumentationType.TEMPERATURE,
        //     display: true
        // },
        {
            label: "N2O Flow",
            key: "P_N2O_FLOW",
            type: IInstrumentationType.PRESSURE,
            display: true
        },
        {
            label: "N2 Flow",
            key: "P_N2_FLOW",
            type: IInstrumentationType.PRESSURE,
            display: true
        },
        {
            label: "Run Tank",
            key: "P_RUN_TANK",
            type: IInstrumentationType.PRESSURE,
            display: true
        },
        // {
        //     label: "Injector",
        //     key: "P_INJECTOR",
        //     type: IInstrumentationType.PRESSURE,
        //     display: true
        // },
        // {
        //     label: "Comb Chamber",
        //     key: "P_COMBUSTION_CHAMBER",
        //     type: IInstrumentationType.PRESSURE,
        //     display: true
        // },
        {
            label: "Run Tank",
            key: "L_RUN_TANK",
            type: IInstrumentationType.LOAD,
            display: true
        },
        // {
        //     label: "Trust",
        //     key: "L_TRUST",
        //     type: IInstrumentationType.LOAD,
        //     display: true
        // },
        // {
        //     label: "Shunt Current",
        //     key: "SHUNT",
        //     type: IInstrumentationType.MASS,
        //     display: true
        // }
    ]
    return (
        <Stack spacing={2} width={'100%'}>
            <Paper elevation={2} sx={{ padding: 2 }}>
                <Stack direction="row" alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction="row" alignItems={'center'} spacing={2}>
                        {/* <SensorsIcon color={'primary'} />  */}
                        <Typography align='left' variant='h6'>
                            Instrumentation
                        </Typography>
                    </Stack>
                    <IconButton
                        // color='primary'
                        onClick={() => onClickConfigure()}
                    >
                        <SettingsInputCompositeIcon />
                    </IconButton>
                </Stack>
            </Paper>
            <Grid 
                container
                gap={2}
            >
                {
                    sensors.map((sensor, index) => {
                        const el = sensor.display ?
                            <InstrumentationModule 
                                key={index}
                                title={sensor.label} 
                                type={sensor.type}
                                reading={data ? data[sensor.key] : 0}
                                hide={() => {
                                    sensor.display = !sensor.display;
                                }}
                            />
                            : 
                            <></>
                        return el
                    })
                }
            </Grid>
        </Stack>
    );
};

export default InstrumentationPanel;
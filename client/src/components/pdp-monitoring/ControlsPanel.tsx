import { Button, Chip, FormControl, FormControlLabel, FormGroup, Paper, Stack, Switch, Tooltip, Typography, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ControlsActionTypes, ControlsCommandTypes, ControlsValveTypes, IControlsPacket, PacketType } from '../../utils/monitoring-system/monitoring-types';
import { useMonitoringSocketContext } from '../../utils/monitoring-system/monitoring-socket-context';

interface IValveControlProps {
    valveName: ControlsValveTypes;
}

const ValveControl = (props: IValveControlProps) => {
    const { valveName } = props;
    const socketContext = useMonitoringSocketContext();
    const [feedBackColor, setFeedBackColor] = useState<any>("default");
    const [feedBackLabel, setFeedBackLabel] = useState<string>("CLOSED");

    const sendCommand = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        // default closed
        const payload: IControlsPacket = {
            identifier: PacketType.CONTROLS,
            command: ControlsCommandTypes.CONTROL,
            valve: valveName,
            action: ControlsActionTypes.CLOSE
        };

        if (checked) {
            payload.action = ControlsActionTypes.OPEN;
            setFeedBackLabel({});
        }
        socketContext.setControlsPacketOut(payload);
    }

    useEffect(() => {
        // Feedback logic
        
    }, [socketContext.controlsPacketIn]);

    return (
        <Stack direction="column" spacing={0} alignItems={'center'} minWidth={140} marginY={0.5}>
            <FormControlLabel 
                sx={{ width: "fit-content" }} 
                control={<Switch onChange={sendCommand}/>} 
                label={<Typography>{valveName}</Typography>} 
                labelPlacement='end' 
            />
            <Tooltip title="Valve Cart feedback" placement="top" arrow followCursor>
                <Chip 
                    color={feedBackColor}
                    size="small" 
                    label={feedBackLabel} 
                    sx={{ width: "90%", borderRadius: 1 }}
                />
            </Tooltip>
        </Stack>
    );
} 

interface IProps {
  // props
}

const ControlsPanel: React.FC<IProps> = (props: IProps) => {
    // state
    const [data, setData] = useState<any>(null);

    // render
    return (
        <Paper
            elevation={2}
            sx={{ padding: 2, width: "fit-content" }}
        >
            <FormControl component="fieldset">
                <Stack direction={'row'}>
                    <ValveControl valveName={ControlsValveTypes.N2OFlow} />
                    <ValveControl valveName={ControlsValveTypes.N2OVent} />
                </Stack>
                <Stack direction={'row'}>
                    <ValveControl valveName={ControlsValveTypes.N2Flow} />
                    <ValveControl valveName={ControlsValveTypes.N2Vent} />
                </Stack>
                <Stack direction={'row'}>
                    <ValveControl valveName={ControlsValveTypes.RTV} />
                    <ValveControl valveName={ControlsValveTypes.NCV} />
                </Stack>
                <FormGroup>
                    <ValveControl valveName={ControlsValveTypes.EVV} />
                </FormGroup>
                <FormControlLabel 
                    sx={{ marginTop: 1 }}
                    control={<Button fullWidth variant='contained' color="error" disabled>ENERGIZED</Button>} 
                    label={<Typography alignSelf='start'>Run Tank</Typography>}
                    labelPlacement='top' 
                />
            </FormControl>
        </Paper>
    );
};

export default ControlsPanel;
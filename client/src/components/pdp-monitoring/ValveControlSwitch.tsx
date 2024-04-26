import React, { useEffect, useState } from 'react';
import { ControlsActionTypes, ControlsCommandTypes, ControlsValveTypes, IControlsPacket, PacketType } from '../../utils/monitoring-system/monitoring-types';
import { Chip, FormControlLabel, Stack, Switch, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useMonitoringSocketContext } from '../../utils/monitoring-system/monitoring-socket-context';

interface IValveControlProps {
    valveName: ControlsValveTypes;
    disabled?: boolean;
    onFlip?: () => void;
}

const ValveControl = (props: IValveControlProps) => {
    const { valveName, disabled, onFlip } = props;
    const socketContext = useMonitoringSocketContext();
    const [feedBackColor, setFeedBackColor] = useState<any>("default");
    const [feedBackLabel, setFeedBackLabel] = useState<string>("CLOSED");
    const theme = useTheme();
    const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'));

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
        }
        onFlip && onFlip();
        socketContext.setControlsPacketOut(payload);
    }

    useEffect(() => {
        // Feedback logic

    }, [socketContext.controlsPacketIn]);

    const ComputerView = () => (
        <Stack direction="column" spacing={0} alignItems={'center'} minWidth={140} marginY={0.5}>
            <FormControlLabel 
                sx={{ width: "fit-content" }} 
                disabled={disabled}
                control={<Switch 
                    disabled={disabled} 
                    onChange={sendCommand}
                />} 
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

    const PhoneView = () => (
        <Stack direction="column" spacing={0} alignItems={'center'} minWidth={140} marginY={0.5}>
            <Typography>{valveName}</Typography>
            <Chip 
                color={feedBackColor}
                size="small" 
                label={feedBackLabel} 
                sx={{ width: "90%", borderRadius: 1 }}
            />
        </Stack>
    );

    return (
        <>
            {!isNotMobile ? <PhoneView /> : <ComputerView />}
        </>
    );
} 

export default ValveControl;
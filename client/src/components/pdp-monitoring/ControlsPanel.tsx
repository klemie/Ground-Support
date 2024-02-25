import { Box, Button, Chip, FormControl, FormControlLabel, FormGroup, Grid, Paper, Stack, Switch, Tooltip, Typography, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';

const ResponseType = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1A2027',
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    width: "90%",
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

interface IValveControlProps {
    valveName: string;
    onValveChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ValveControl = (props: IValveControlProps) => {
    const { valveName, onValveChange } = props;
    return (
        <Stack direction="column" spacing={0} alignItems={'center'} minWidth={140} marginY={0.5}>
            <FormControlLabel 
                sx={{ width: "fit-content" }} 
                control={<Switch onChange={() => onValveChange}/>} 
                label={<Typography>{valveName}</Typography>} 
                labelPlacement='end' 
            />
            <Tooltip title="Valve Cart" placement="top" arrow followCursor>
                <Chip 
                    color="default" 
                    size="small" 
                    label={"CLOSED"} 
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
                    <ValveControl valveName='N2O Flow' />
                    <ValveControl valveName='N2O Vent' />
                </Stack>
                <Stack direction={'row'}>
                    <ValveControl valveName='N2 Flow' />
                    <ValveControl valveName='N2 Vent' />
                </Stack>
                <Stack direction={'row'}>
                    <ValveControl valveName='RTV' />
                    <ValveControl valveName='NCV' />
                </Stack>
                <FormGroup >
                    <ValveControl valveName='EVV' />
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
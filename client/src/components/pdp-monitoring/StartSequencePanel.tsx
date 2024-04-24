import { Button, ButtonGroup, FormControl, FormControlLabel, FormGroup, Paper, Stack, Switch, Typography } from '@mui/material';
import React, { useEffect, useState, useReducer } from 'react';
import { sequenceReducer, updateSequence } from './sequenceReducer';
import { ControlsActionTypes, ControlsCommandTypes, ControlsValveTypes, IControlsPacket, PacketType } from '../../utils/monitoring-system/monitoring-types';

// Icons
import KeyIcon from '@mui/icons-material/Key';
import { useMonitoringSocketContext } from '../../utils/monitoring-system/monitoring-socket-context';
import ValveControl from './ValveControlSwitch';
import useWebSocket from 'react-use-websocket';

interface IProps {
  // props
}

const StartSequencePanel: React.FC<IProps> = (props: IProps) => {
    // state
    const [keyIn, setKeyIn] = useState(false);
    const [sequence, dispatch] = useReducer(sequenceReducer, { state: 'key' });
    const [overRide, setOverRide] = useState(false);
    // effects
    useEffect(() => {
        if (sequence.state === "key" && keyIn) {
            updateSequence(sequence, dispatch);
        }
    }, [sequence.state]);

    const socketContext = useMonitoringSocketContext();

    const sendAbortCommand = () => {
        // default closed
        const payload: IControlsPacket = {
            identifier: PacketType.CONTROLS,
            command: ControlsCommandTypes.ABORT
        };

        socketContext.setControlsPacketOut(payload);
    }

    // render
    return (
        <Stack spacing={2} direction={'column'}>
             <Button 
                    variant='contained'
                    color='error'
                    sx={{ width: "100%", height: 80 }}
                    onClick={() => sendAbortCommand()}
                >
                    <Typography variant='h4'>ABORT</Typography>
            </Button>
            <Paper
                elevation={2}
                sx={{ padding: 2, width: "fit-content" }}
            >
                <FormControl component="fieldset">
                    <Stack direction={'row'}>
                        <ButtonGroup variant="contained" color="primary" aria-label="key-button-group" orientation='vertical'>
                            <Button 
                                variant='contained' 
                                startIcon={<KeyIcon />} 
                                disabled={!keyIn} 
                                color="primary"
                                aria-readonly={true}
                            >
                                KEY
                            </Button>
                            <Button 
                                color={overRide ? "primary" : "grey" }
                                variant='contained' 
                                onClick={() => setOverRide(!overRide)}
                            >
                                OVERRIDE
                            </Button>
                        </ButtonGroup>
                        <ValveControl 
                            valveName={ControlsValveTypes.PRIME} 
                            disabled={!(sequence.state === "prime") && !overRide} 
                            onFlip={() => sequence.state === "prime" ? updateSequence(sequence, dispatch) : null } 
                        />
                        <Button 
                            variant="contained" 
                            disabled={!overRide  &&  !(sequence.state === "ignite")}
                            onClick={() => sequence.state === "ignite" ? updateSequence(sequence, dispatch) : null}
                        >
                            Ignite
                        </Button>
                        <ValveControl 
                            valveName={ControlsValveTypes.MEV} 
                            disabled={!overRide &&  !(sequence.state === "mev")} 
                            onFlip={() => sequence.state === "mev" ? updateSequence(sequence, dispatch) : null}
                        />
                    </Stack>
                </FormControl>
            </Paper>
        </Stack>
    );
};

export default StartSequencePanel;
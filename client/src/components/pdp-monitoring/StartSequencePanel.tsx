import { Button, Fab, FormControl, FormControlLabel, FormGroup, Paper, Stack, Switch, Typography } from '@mui/material';
import React, { useEffect, useState, useReducer } from 'react';
import { sequenceReducer, updateSequence } from './sequenceReducer';

// Icons
import KeyIcon from '@mui/icons-material/Key';

interface IProps {
  // props
}

const StartSequencePanel: React.FC<IProps> = (props: IProps) => {
    // state
    const [receivedFeedback, setReceivedFeedback] = useState(true);
    const [sequence, dispatch] = useReducer(sequenceReducer, { state: 'key' });
    // effects
    useEffect(() => {


    }, []);

    // render
    return (
        <Stack spacing={2} direction={'row'}>
            <Paper
                elevation={2}
                sx={{ padding: 2, width: "fit-content" }}
            >
                <FormControl component="fieldset">
                    <FormGroup row sx={{ justifyContent:"center" }}>
                        <Fab 
                            variant="extended" 
                            color="success" 
                            disabled={!receivedFeedback && sequence.state === "key"}
                            onClick={() =>  sequence.state === "key" ? updateSequence(sequence, dispatch) : null}
                        >
                            <KeyIcon color={'inherit'} />
                        </Fab>
                        <FormControlLabel 
                            sx={{ width: "fit-content" }} 
                            control={<Switch disabled={!(sequence.state === "prime")} onChange={() => sequence.state === "prime" ? updateSequence(sequence, dispatch) : null} />} 
                            label="Prime" 
                            labelPlacement='bottom' 
                        />
                        <Button 
                            variant="contained" 
                            disabled={!(sequence.state === "ignite")}
                            onClick={() => sequence.state === "ignite" ? updateSequence(sequence, dispatch) : null}
                        >
                            Ignite
                        </Button>
                        <FormControlLabel 
                            sx={{ width: "fit-content" }} 
                            control={<Switch disabled={!(sequence.state === "mev")} />} 
                            label="MEV" 
                            labelPlacement='bottom' 
                            onChange={() => sequence.state === "mev" ? updateSequence(sequence, dispatch) : null}
                        />
                    </FormGroup>
                </FormControl>
            </Paper>
            <Button 
                variant='contained'
                color='error'
            >
                ABORT
            </Button>
        </Stack>
    );
};

export default StartSequencePanel;
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSocketContext } from "../../utils/socket-context";

interface IConnectionDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const ConnectionDialog: React.FC<IConnectionDialogProps> = (props: IConnectionDialogProps) => {
    const socketContext = useSocketContext();
    const [protocol, setProtocol] = useState<string>('APRS');
    const [frequency, setFrequency] = useState<number>(433.92);
    const [launchAltitude, setLaunchAltitude] = useState<number>(0);

    // useEffect(() => {
    //     setProtocol(socketContext.protocol);
    //     setFrequency(socketContext.frequency);
    // }, [socketContext.protocol, socketContext.frequency]);

    return(
        <Dialog open={props.isOpen}>
            <DialogTitle sx={{ fontWeight: 600 }}>Connection Status</DialogTitle>
            <DialogContent>
                <Stack direction="column" spacing={2} alignItems="center" sx={{ paddingTop: 1 }}>
                    <Autocomplete  
                        fullWidth
                        options={['APRS', 'LoRa' ]}
                        value={protocol}
                        renderInput={
                            (params) => 
                            <TextField 
                                {...params} 
                                label="Protocol" 
                                variant="outlined" 
                                size="small" 
                            />
                        }
                        onChange={(_: any, value: any) => {
                            setProtocol(value);
                        }}
                    />
                    <TextField 
                        fullWidth
                        required
                        value={frequency}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setFrequency(event.target.value as number);
                        }}
                        label="Frequency"
                        variant="outlined"
                        size="small"
                        type="number"
                        InputProps={{
                            endAdornment: <Typography>MHz</Typography>,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        required
                        value={launchAltitude}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setLaunchAltitude(event.target.value as number);
                        }}
                        label="Launch Altitude"
                        variant="outlined"
                        size="small"
                        type="number"
                        InputProps={{
                            endAdornment: <Typography>FT</Typography>,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button 
                    variant={"text"} 
                    component="label" 
                    onClick={props.onClose}
                >
                    Cancel
                </Button>
                <Button 
                    variant={"contained"} 
                    component="label" 
                    onClick={
                        () => {
                            // socketContext.setProtocol(protocol);
                            socketContext.setFrequency(frequency);
                            // socketContext.toggleConnection();
                            props.onClose()
                        }
                    }
                >
                    Connect
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConnectionDialog;
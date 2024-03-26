import React, {useCallback, useEffect, useState} from "react";
import { Button, Dialog, TextField, Stack, DialogContent, Typography, DialogActions, DialogTitle, Select, MenuItem, InputLabel, Tooltip } from "@mui/material";
import { webusb } from 'usb';
import { Info } from "@mui/icons-material";


interface ConnectionDialogProps {
    isOpen: boolean;
    onClose: () => void
}

const ConnectionDialog: React.FC<ConnectionDialogProps> = (props: ConnectionDialogProps) => {
    const {isOpen, onClose} = props;
    const [open, setOpen] = useState<boolean>(props.isOpen);
    const [devices, setDevices] = useState([]); // [WebUSBDevice, WebUSBDevice, ...]
   
    const [port, setPort] = useState<string>('COM2');
    // this must happen in the server
    // const readUSBs = useCallback(async () => {
    //     // Uses blocking calls, so is async
    //     try {
    //         const devices = await webusb.getDevices();
    //         for (const device of devices) {
    //             console.log(device); // WebUSB device
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         setDevices(devices)
    //     }
    // }, []);

    useEffect(() => {
        // readUSBs();
        console.log(isOpen)
    }, [isOpen]);

    const handleClose = () => {
        setOpen(false);
        onClose();
    }

    const handleSave = () => {
        // Save changes
        handleClose();
    }

    const handleChange = (event: any) => {
        setPort(event.target.value as string);
    }

    return(
        <Dialog 
            open={props.isOpen}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">
                {"Connection Settings"}
            </DialogTitle>
            <DialogContent>
                {devices}
                <InputLabel id="usb-port">Usb Port</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={port}
                    label="Age"
                    onChange={handleChange}
                    fullWidth
                >
                    <MenuItem value={'COM2'}>COM 2</MenuItem>
                    <MenuItem value={'COM3'}>COM 3</MenuItem>
                    <MenuItem value={'COM4'}>COM 4</MenuItem>
                    <MenuItem value={'COM5'}>COM 5</MenuItem>
                    <MenuItem value={'COM6'}>COM 6</MenuItem>
                </Select>
            </DialogContent>
            <DialogActions>
                <Button variant={"contained"} component="label" onClick={() => handleSave()}>
                    Connect
                </Button>
                <Button variant={"contained"} component="label" onClick={() => handleClose()}>
                    Close
                </Button>
            </DialogActions>

        </Dialog>
    );
}

export default ConnectionDialog;
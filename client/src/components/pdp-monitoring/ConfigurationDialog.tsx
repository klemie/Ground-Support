import React, {useCallback, useEffect, useState} from "react";
import { Button, Dialog, TextField, Stack, DialogContent, Typography, DialogActions, DialogTitle, Select, MenuItem, InputLabel, Tooltip, Chip } from "@mui/material";
import { webusb } from 'usb';
import { Info } from "@mui/icons-material";


interface ConfigurationDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const ConfigurationDialog: React.FC<ConfigurationDialogProps> = (props: ConfigurationDialogProps) => {
    const {isOpen, onClose} = props;
    const [open, setOpen] = useState<boolean>(props.isOpen);

    const [controlsPanel, setControlsPanel] = useState<boolean>(false);
    const [instrumentationPanel, setInstrumentationPanel] = useState<boolean>(false);
    const [feedSystemVisual, setFeedSystemVisual] = useState<boolean>(false);

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

    return(
        <Dialog 
            open={props.isOpen}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">
                {"Panel Configuration"}
            </DialogTitle>
            <DialogContent>
                <Stack gap={2}>
                    <Chip label="Control Panel" variant={controlsPanel ? "filled" : "outlined"} onClick={() => setControlsPanel(controlsPanel => !controlsPanel)} />
                    <Chip label="Instrumentation Panel" variant={instrumentationPanel? "filled" : "outlined"} onClick={() => setInstrumentationPanel(instrumentationPanel => !instrumentationPanel)} />
                    <Chip label="Feed System Visual" variant={feedSystemVisual? "filled" : "outlined"} onClick={() => setFeedSystemVisual(feedSystemVisual => !feedSystemVisual)} />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant={"contained"} component="label" onClick={() => handleClose()}>
                    Close
                </Button>
                <Button variant={"contained"} component="label" onClick={() => handleSave()}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfigurationDialog;
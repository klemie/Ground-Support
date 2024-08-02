import React, {useCallback, useEffect, useState} from "react";
import { Button, Dialog, TextField, Stack, DialogContent, Typography, DialogActions, DialogTitle, Select, MenuItem, InputLabel, Tooltip, Chip, IconButton, ButtonGroup } from "@mui/material";
import { Info } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';

export interface IConfiguration {
    controlsPanel: boolean;
    instrumentationPanel: boolean;
    feedSystemVisualPanel: boolean;
}

interface ConfigurationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    configuration: IConfiguration;
    setConfiguration: (config: IConfiguration) => void;
}

const PanelConfigurationDialog: React.FC<ConfigurationDialogProps> = (props: ConfigurationDialogProps) => {
    const { isOpen, onClose, configuration, setConfiguration } = props;

    const [controls, setControlsPanel] = useState<boolean>(configuration.controlsPanel);
    const [instrumentation, setInstrumentationPanel] = useState<boolean>(configuration.instrumentationPanel);
    const [feedSystemVisual, setFeedSystemVisual] = useState<boolean>(configuration.feedSystemVisualPanel);


    const handleSave = () => {
        // Save changes
        setConfiguration({
            controlsPanel: controls,
            instrumentationPanel: instrumentation,
            feedSystemVisualPanel: feedSystemVisual
        });
        onClose();
    }

    return(
        <Dialog 
            open={isOpen}
            onClose={onClose}
            sx={{ padding: 2 }}
        >
            <DialogTitle id="alert-dialog-title" width={300}>
                <Stack direction="row" justifyContent="space-between">
                    {"Panel Configuration"}
                    <IconButton aria-label="info" size="small" onClick={() => onClose()}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </DialogTitle>
            <DialogContent>
                
            </DialogContent>
            <DialogActions>
                <Button 
                    variant={"contained"} 
                    component="label" 
                    onClick={() => handleSave()} 
                    fullWidth
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PanelConfigurationDialog;
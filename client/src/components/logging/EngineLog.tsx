import React, {useCallback, useEffect, useState} from "react";
import { Button, Dialog, TextField, Stack, DialogContent, Typography, DialogActions, DialogTitle, Select, MenuItem, InputLabel, Tooltip, TextareaAutosize, FormControlLabel, Checkbox } from "@mui/material";
import { webusb } from 'usb';
import { Download, Info } from "@mui/icons-material";


interface EngineLogDialogProps {
    isOpen: boolean;
    onClose: () => void
}

const EngineLogDialog: React.FC<EngineLogDialogProps> = (props: EngineLogDialogProps) => {
    const {isOpen, onClose} = props;
    
    const handleClose = () => {
        onClose();
    }

    const handleDownload = () => {
        // download logs
    }

    return(
        <Dialog 
            open={props.isOpen}
            onClose={handleClose}
            maxWidth={"md"}
            fullWidth
            scroll={"paper"}
        >
            <DialogTitle id="alert-dialog-title">
                {"Communication Log"}
            </DialogTitle>
            <DialogContent>
                <Stack direction={'column'} gap={2}>
                    <Typography variant="subtitle1">VC Log</Typography>
                    <TextareaAutosize
                        style={{
                            borderRadius: "10px",
                            border: "none",
                            backgroundColor: "#22272E",
                            color: "#ffffff"
                        }}
                        minRows={10}
                        maxRows={15}
                        readOnly
                        placeholder="Valve Cart Log"
                    />
                    <Typography variant="subtitle1">MC Log</Typography>
                    <TextareaAutosize
                        style={{
                            borderRadius: "10px",
                            border: "none",
                            backgroundColor: "#22272E",
                            color: "#ffffff"
                        }}
                        minRows={10}
                        maxRows={15}
                        readOnly
                        placeholder="Mission Control Log"
                    />
                    <Stack direction="row" justifyContent="space-between">
                        <Button 
                            variant={"contained"} 
                            component="label" 
                            startIcon={<Download />}
                            onClick={() => handleDownload()}
                        >
                            Packet Log
                        </Button>
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Verbose Logging"
                            labelPlacement="end"
                        />
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant={"contained"} component="label" onClick={() => handleClose()}>
                    Cancel
                </Button>
            </DialogActions>

        </Dialog>
    );
}

export default EngineLogDialog;
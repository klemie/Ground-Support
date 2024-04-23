import React, {useCallback, useEffect, useState} from "react";
import { Button, Dialog, TextField, Stack, DialogContent, Typography, DialogActions, DialogTitle, Select, MenuItem, InputLabel, Tooltip, TextareaAutosize, FormControlLabel, Checkbox } from "@mui/material";
import { Download, Info } from "@mui/icons-material";
import { useLogContext } from "./LogContext";
import { useMonitoringSocketContext } from "../../utils/monitoring-system/monitoring-socket-context";

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

    const MonitoringContext = useMonitoringSocketContext();

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
                    <Typography variant="subtitle1">Valve Cart Log</Typography>
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
                        value={MonitoringContext.valveCartLogs.join('\n')}
                    />
                    <Typography variant="subtitle1">Mission Control Log</Typography>
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
                        value={MonitoringContext.missionControlLogs.join('\n')}
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
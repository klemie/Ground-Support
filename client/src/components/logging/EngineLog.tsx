import React, {useCallback, useEffect, useState} from "react";
import { Button, Dialog, TextField, Stack, DialogContent, Typography, DialogActions, DialogTitle, Select, MenuItem, InputLabel, Tooltip, TextareaAutosize, FormControlLabel, Checkbox, Card, Paper, CardContent } from "@mui/material";
import { Download, Info } from "@mui/icons-material";
import { useLogContext } from "./LogContext";
import { useMonitoringSocketContext } from "../../utils/monitoring-system/monitoring-socket-context";

interface EngineLogDialogProps {
    isOpen: boolean;
    onClose: () => void
    dialog: boolean;
}

const EngineLogDialog: React.FC<EngineLogDialogProps> = (props: EngineLogDialogProps) => {
    const {isOpen, onClose, dialog} = props;
    const handleClose = () => {
        onClose();
    }
    
    const handleDownload = () => {
        // download logs
    }

    const MonitoringContext = useMonitoringSocketContext();
    const Content = () => (
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
                maxRows={10}
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
                maxRows={10}
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
    );
    if (dialog) {
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
                    <Content />
                </DialogContent>
                <DialogActions>
                    <Button variant={"contained"} component="label" onClick={() => handleClose()}>
                        Close
                    </Button>
                </DialogActions>
    
            </Dialog>
        );
    } else {
        return(
            <Card sx={{ width: "100%", height: "80%" }}>
                <CardContent >
                    <Content />
                </CardContent>
            </Card>
        );
    }
}

export default EngineLogDialog;
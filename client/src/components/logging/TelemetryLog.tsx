import React, { useState, useEffect } from "react";
import { Button, InputAdornment, Paper, Stack, TextField, TextareaAutosize, Tooltip } from "@mui/material";
import { Box } from "@mui/material";
import { Download } from "@mui/icons-material";
import GpsOffIcon from '@mui/icons-material/GpsOff';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import TimerIcon from '@mui/icons-material/Timer';
import { IAprsTelemetryPacket, formatPacket } from "../../utils/TelemetryTypes";
import { useActiveMission } from "../../utils/ActiveMissionContext";
import { saveAs } from "file-saver";

interface TelemetryLogProps {
    packet?: any;
    width?: string;
    maxRows?: number;
    telemetryConnected?: boolean;
}

const TelemetryLog: React.FC<TelemetryLogProps> = (props: TelemetryLogProps) => {
    const [locked, setLocked] = useState<boolean>(false);
    const [timeSincePacket, setTimeSincePacket] = useState<number>(0);
    const [telemetryConnected, setTelemetryConnected] = useState<boolean>(false);
    const activeContext = useActiveMission();

    const exportLog = () => {
        const blob = new Blob([JSON.stringify(activeContext.logs)], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "packet-log.txt");
    }

    const [log, setLog] = useState<string[]>(activeContext.logs.map((log) => log.Log));

    // useEffect(() => {
    //     if (props.packet) {
    //         setLog((prev) => [...prev, JSON.stringify(props.packet)]);
    //         setTimeSincePacket(0);
    //     }
    // }, [props.packet]);

    // useEffect(() => {
    //     setTelemetryConnected(props.telemetryConnected);
    //     if (telemetryConnected) {
    //         setTimeSincePacket(0);
    //     }
    // }, [props.telemetryConnected]);

    useEffect(() => {
        if (telemetryConnected) {        
            const interval = setInterval(() => {
                setTimeSincePacket(timeSincePacket + 1);    
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timeSincePacket, telemetryConnected]);

    return (
        <Paper 
            sx={{
                borderRadius: 2,
                width: '100%',
                minWidth: 'fit-content',
                height: 'fit-content'
            }}
        >
            <Stack direction={"column"}>
                <TextareaAutosize
                    style={{
                        border: "none",
                        backgroundColor: "#23282F",
                        color: "#ffffff",
                        paddingTop: 10,
                        paddingLeft: 10
                    }}
                    minRows={10}
                    maxRows={10}
                    readOnly
                    placeholder="Telemetry Log"
                    value={log}
                />
                <Stack direction={'row'} bottom={0}>
                    {[
                        'uvr.red',
                        'uvr.yellow',
                        'uvr.lightBlue',
                        'uvr.darkBlue'
                    ].map((c) => <Box sx={{backgroundColor: c}} width={'25%'} height={10}/>)}
                </Stack>
                <Stack direction='row' padding={2} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction='row' gap={2}>
                        <Tooltip title="GPS lock">
                            <Button 
                                disabled
                                variant={"contained"} 
                                sx={{ color: 'grey' }}
                            > {locked ? <GpsFixedIcon color="success"/> : <GpsOffIcon color="error"/>} </Button>
                            
                        </Tooltip>
                        <Tooltip title="Time since last packet">
                            <TextField
                                size="small"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><TimerIcon/></InputAdornment>,
                                    endAdornment: <InputAdornment position="end">s</InputAdornment>,
                                }}
                                value={timeSincePacket}
                                sx={{ width: 100 }}
                            />
                        </Tooltip>
                    </Stack>
                    <Button 
                        variant={"contained"} 
                        color="primary"
                        startIcon={<Download />}
                        onClick={exportLog}
                    > 
                        Packet Log 
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    );
}

export default TelemetryLog;
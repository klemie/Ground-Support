import React, { useState, useEffect } from "react";
import { Button, InputAdornment, Stack, TextField, Tooltip } from "@mui/material";
import { Box } from "@mui/material";
import { Download } from "@mui/icons-material";
import GpsOffIcon from '@mui/icons-material/GpsOff';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import TimerIcon from '@mui/icons-material/Timer';
import { IAprsTelemetryPacket, formatPacket } from "../utils/TelemetryTypes";
import { useActiveMission } from "../utils/ActiveMissionContext";
import { saveAs } from "file-saver";

interface TelemetryLogProps {
    packet: IAprsTelemetryPacket;
    width: string;
    maxRows: number;
    telemetryConnected: boolean;
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

    useEffect(() => {
        if (props.packet) {
            setLog((prev) => [...prev, formatPacket(props.packet)]);
            setTimeSincePacket(0);
        }
    }, [props.packet]);

    useEffect(() => {
        setTelemetryConnected(props.telemetryConnected);
        if (telemetryConnected) {
            setTimeSincePacket(0);
        }
    }, [props.telemetryConnected]);

    useEffect(() => {
        if (telemetryConnected) {        
            const interval = setInterval(() => {
                setTimeSincePacket(timeSincePacket + 1);    
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timeSincePacket, telemetryConnected]);


    useEffect(() => {
        if (props.packet?.Parsed?.lock) {
            setLocked(true);
        } else {
            setLocked(false);
        }
    }, [props.packet]);

    return (
        <Box style={{
                backgroundColor: "#282C34",
                borderRadius: 5,
                width: props.width
            }}
            boxShadow={3}
        >
            <Stack direction={"column"}>
                <TextField 
                    value={log}
                    variant={"standard"}
                    multiline
                    rows={props.maxRows}
                    style={{
                        color: "#CA4D33",
                        backgroundColor: "#282C34",
                        borderRadius: 13,
                        padding: "0px 0px 0px 20px"
                    }}
                    InputProps={{
                        disableUnderline: true,
                        readOnly: true,
                        style: {
                            color: "white",
                        },
                        multiline: true,
                        rows: props.maxRows,
                    }}
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
                                sx={{ width: 110 }}
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
        </Box>
    );
}

export default TelemetryLog;
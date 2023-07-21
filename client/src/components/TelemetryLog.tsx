import React, {useState, useEffect} from "react";
import { Button, InputAdornment, Stack, TextareaAutosize, TextField } from "@mui/material";
import { Box } from "@mui/material";
import { Download } from "@mui/icons-material";

interface TelemetryLogProps {
    value: string;
    width: string;
    maxRows: number
}

const TelemetryLog: React.FC<TelemetryLogProps> = (props: TelemetryLogProps) => {

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
                    value={props.value}
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
                <Button 
                    variant={"contained"} 
                    color="error"
                    style={{
                        width: "150px",
                        margin: "20px"
                    }}
                    startIcon={<Download />}
                > Packet Log </Button>
            </Stack>
        </Box>
    );
}

export default TelemetryLog;
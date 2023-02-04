import React, {useState, useEffect} from "react";
import { Button, InputAdornment, TextareaAutosize, TextField } from "@mui/material";
import { Box } from "@mui/material";

interface TelemetryLogProps {
    value: any;
    width: string;
    height: string
}

const TelemetryLog: React.FC<TelemetryLogProps> = (props: TelemetryLogProps) => {

    return (
        <Box>
        <TextField 
            value={props.value}
            variant={"standard"}
            multiline
            rows="20"
            style={{
            width: props.width,
            height: props.height,
            padding: "20px",
            color: "#CA4D33",
            backgroundColor: "#282C34",
            borderRadius: 13
            }}
            InputProps={{
                readOnly: true,
                style: {
                    color: "white"
                },
                endAdornment:
                <InputAdornment position="end">
                    <Button 
                        variant={"contained"} 
                        color="error"
                    > Packet Log </Button>
                </InputAdornment>}}
        /> 
        </Box>
    );
}

export default TelemetryLog;
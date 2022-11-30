import React, { useEffect, useRef, useState } from "react";
import { 
    Card, 
    Chip, 
    TextField, 
    CardContent,
    Divider,
    CardHeader
} from "@mui/material";
import { Stack } from "@mui/system";
import _ from "lodash";

const statusMap = new Map<String, String> ([
    ["Inactive", "#FCB701"],
    ["Active", "#65C464"],
    ["Default", "grey"],
    ["Sus", "#C6232C"]
]);

interface ModuleProps {
    title: String,
    fields: Array<String>
    fieldValues: Array<Number>,
    fieldRanges: Array<Array<Number>>
}

const Module: React.FC<ModuleProps> = (props: ModuleProps) => {
    const [statusColor, setStatusColor] = useState(statusMap.get("Inactive"));
    const [status, setStatus] = useState("Inactive");

    useEffect(() => {
        for (const i in props.fieldValues) {
            const v = props.fieldValues
            const r = props.fieldRanges
            if (v[i] > r[i][1] || v[i] < r[i][0]) {
                setStatusColor(statusMap.get("Sus"));
                setStatus("Failed")
                return;
            } else if (v[i] == 0) {
                setStatusColor(statusMap.get("Inactive"));
                setStatus("Inactive")
            } else {
                setStatusColor(statusMap.get("Active"));
                setStatus("Active")
            }
        }
    }, [props.fieldValues]);

    return(
        <>
            <Card
                variant="outlined"
                sx={{ minWidth: 100 }}
            >
                <CardContent>
                    <CardHeader title={props.title || "Default"}/>
                    <Stack spacing={3} >
                    <Divider/>
                            
                        { props.fields.map((fieldName, i) => 
                            
                            { return(
                            <TextField
                                key={i}
                                id="value-text-field"
                                label={ fieldName }
                                value={ props.fieldValues[i] }
                                defaultValue="Value"
                            >
                            </TextField> )}

                        )}

                        <Divider/>

                        <Chip
                            color="primary"
                            style={{ backgroundColor: String(statusColor) }}
                            label={ status }
                        />

                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}


export default Module;
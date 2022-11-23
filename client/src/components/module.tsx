import React from "react";
import { 
    Card, 
    Chip, 
    TextField, 
    CardContent, 
    CardActionArea, 
    Typography,
    Divider,
    CardHeader
} from "@mui/material";
import { Stack } from "@mui/system";


const statusMap = new Map<String, String> ([
    ["Inactive", "#FCB701"],
    ["Active", "#65C464"],
    ["Sus", "#C6232C"]
]);


interface ModuleProps {
    value?: Object,
    title?: String,
    status?: String,
    fields: Array<String>
}

const Module: React.FC<ModuleProps> = (props: ModuleProps) => {

    const [value, setValue] = React.useState(props.value);
    const [status, setStatus] = React.useState(props.status);
    
    const updateStatus = () => {
        setStatus(props.status);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

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
                                label={fieldName}
                                value={value}
                                onChange={handleChange}
                                defaultValue="Value"
                            >
                            </TextField> )}

                        )}

                        <Divider/>

                        <Chip
                            color="primary"
                            label={ status }
                        />

                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}


export default Module;
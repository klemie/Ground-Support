import React, { ReactText } from "react";
import { Card, Chip, TextField,
    CardContent, 
    CardActionArea, 
    Typography, 
    CardHeader
} from "@mui/material";
import { Stack } from "@mui/system";


const statusMap = new Map<String, String> ([
    ["Inactive", "FCB701"],
    ["Active", "#65C464"],
    ["sus", "#FFF"]
])

interface ModuleProps {
    value?: Object,
    Title?: String,
    status?: String
}

const Module: React.FC<ModuleProps> = ( props: ModuleProps) => {
    const [value, setValue] = React.useState(props.value);
    const [status, setStatus] = React.useState(props.status);

    const updateStatus = () => {
        setStatus('random string');
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    return (
        <>
            <Card
                variant = "outlined"
                sx = {{ minWidth: 363 }}
            >
                <CardContent>
                    <CardHeader title = {props.Title || "Module" }>

                    </CardHeader>
                    <Stack direction="column">
                    <TextField
                        id="value-text-feild"
                        label = "Jack's Typing Box (not Really)"
                        value={ value }
                        defaultValue=':) hey. hows it going'
                        onChange={handleChange}
                    >
                    </TextField>
                    </Stack>
                <CardActionArea>
                    <Chip
                        color='primary'
                        label={ status }
                    />

                </CardActionArea>
                </CardContent>
            </Card>
        </>
    )
}

export default Module;
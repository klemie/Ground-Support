import React from 'react';
import { 
    Card, 
    Chip, 
    TextField, 
    CardContent, 
    CardActionArea,
    CardHeader,
    Stack, 
    Divider
} from '@mui/material';

const statusMap = new Map<String, String>([
    ["Inactive", "#FCB701"],
    ["Active", "#65C464"],
    ["sus", "#C6232C"]
]);


interface ModuleProps {
    title?: String,
    value?: Object,
    status?: {
        text?: String,
        color?: String
    },
    numFields?: {
        default: 1,
        type: Number 
    }
};

const Module: React.FC<ModuleProps> = (props: ModuleProps) => {
    
    const [value, setValue] = React.useState(props.value);
    const [status, setStatus] = React.useState(props.status?.text || "Active");
    const [statusColor, setStatusColor] = React.useState(props.status?.color || '"success"');
    const updateStatus = () => {
        setStatus("Inactive");
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
                    <CardHeader title={ props.title || "Module" }>
                    </CardHeader>
                    <Stack direction="column" spacing={3}>
                        <Divider />
                        <TextField 
                            id="value-text-field-1"
                            label="Value 1"
                            value={ value }
                            onChange={ handleChange }
                            defaultValue="Value"
                            InputProps={{
                                readOnly: true
                            }}
                        >
                        </TextField>
                        <TextField
                            id="value-text-field-2"
                            label="Value 2"
                            value={ value }
                            onChange={ handleChange }
                            defaultValue="Value"
                            InputProps={{
                                readOnly: true
                            }}
                        >
                        </TextField>
                        <Divider />
                        <Chip
                            color="success" 
                            label={ status }
                        />
                    </Stack>
                </CardContent>
            </Card>
        </>
    );
}

export default Module;
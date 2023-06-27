import React, { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, Chip, IconButton, Stack, Typography } from '@mui/material';
import { IComponent } from '../utils/entities';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import ComponentModal from './modals/ComponentModal';
import { Delete } from '@mui/icons-material';

interface ComponentDetails extends IComponent {
    Id?: string;
}

interface ComponentCardProps {
    componentId: string;
    onDelete: () => void;
}

interface IComponentDetails {
	result: IComponent;
}

const ComponentCard: React.FC<ComponentCardProps> = (props: ComponentCardProps) => {
    const {  componentId, onDelete } = props;

    const [componentModalOpen, setComponentModalOpen] = useState<boolean>(false);

    enum TelemetrySource {
        lora = "LORA",
        aprs = "APRS"
    }

    const [component, setComponent] = useState<ComponentDetails>({
        Id: componentId,
        Name: '',
        Details: '',
        TelemetrySource: '',
        DataConfig: ''
    });

	const deleteComponent = async () => {
		try {
			await axios.delete(`http://127.0.0.1:9090/component/${componentId}`);
		} catch (error) {
            console.log(error);
		}
        onDelete();
	};

    useEffect(() => {
		async function getComponent() {
			try {
                const response = await axios.get<IComponentDetails>(`http://localhost:9090/component/${componentId}`);
                console.log(response.data.result)
                if (response.data.result) {
                    setComponent({
                        Id: componentId,
                        Name: response.data.result.Name,
                        Details: response.data.result.Details,
                        TelemetrySource: response.data.result.TelemetrySource,
                        DataConfig: response.data.result.DataConfig
                    });
                }
			} catch (error: any) {
				console.log(error);
			}
		}
		getComponent();
	}, [componentId]);

    const handleDataConfig = () => {
        return;
    }

    const handleEdit = () => {
        setComponentModalOpen(true);
        return;
    }

    return (
        <>
            <Card sx={{ width: 275 }}>
                <CardHeader title={component.Name} />
                <CardContent>
                    <Stack direction='column' spacing={1}>
                        <Typography variant='subtitle1' color={'gray'}>
                            Description
                        </Typography>
                        <Typography variant='body1'>
                            {component.Details}
                        </Typography>
                        <Typography variant='subtitle1' color={'gray'}>
                            Telemetry Source
                        </Typography>
                        <Stack direction='row' spacing={1}>
                            <Chip label={component.TelemetrySource || 'None'} />
                        </Stack>
                    </Stack>
                </CardContent>
                <CardActions>
                    <Stack direction={'row'} alignContent={'space-between'} justifyContent="space-between" alignItems="center">
                        <Button onClick={handleDataConfig}>
                            Data Config
                        </Button>
                        <IconButton onClick={handleEdit} aria-label="edit">
                            <EditIcon />    
                        </IconButton>
                        <IconButton onClick={deleteComponent} color='error'><Delete/></IconButton>

                    </Stack>
                </CardActions>
            </Card>
            <ComponentModal component={component} isOpen={componentModalOpen} onSave={() => {}} onClose={() => setComponentModalOpen(false)}/>
        </>
    );
}

export default ComponentCard;
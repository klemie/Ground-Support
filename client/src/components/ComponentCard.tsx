import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, Chip, IconButton, Stack, Typography } from '@mui/material';
import { IComponent, IRocket } from '../utils/entities';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import ComponentModal from './modals/ComponentModal';
import { Delete } from '@mui/icons-material';

interface RocketDetails extends IRocket {
	Id?: string;
}

interface ComponentDetails extends IComponent {
    Id?: string;
}

interface ComponentCardProps {
    componentId: string;
    rocket: RocketDetails;
    onDelete: () => void;
    updateComponent: () => void;
}

interface IComponentDetails {
	result: IComponent;
}

const ComponentCard: React.FC<ComponentCardProps> = (props: ComponentCardProps) => {
    const {  componentId, onDelete, updateComponent, rocket } = props;
    const [componentModalOpen, setComponentModalOpen] = useState<boolean>(false);

    const [component, setComponent] = useState<ComponentDetails>({
        Id: componentId,
        Name: '',
        Details: '',
        TelemetrySource: '',
        DataConfig: ''
    });

    // TODO: this is a temporary fix to remove all references to the component from the rocket on delete
    // once the backend is updated to handle this, this can be removed
    const detachComponentFromRocket = async () => {
        const removedId = rocket.Components.filter((cId, idx, arr) => {
            if (cId === componentId) {
                arr.splice(idx, 1);
                return true;
            } 
            return false;
        });

        console.log(removedId);

        try {
            await axios.patch(`http://127.0.0.1:9090/rocket/${rocket?.Id}`, rocket);
        } catch (error) {
            console.log(error);
        }
        
    };

	const deleteComponent = async () => {
        console.log("Delete component");
		try {
			await axios.delete(`http://127.0.0.1:9090/component/${componentId}`);
            await detachComponentFromRocket();
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
    }

    return (
        <>
            <Card sx={{ width: 275 }}>
                <CardHeader title={component.Name} />
                <CardContent sx={{ paddingY: 0.5 }}>
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
                    <Stack direction={'row'} alignContent={'center'} justifyContent="space-between" width={'100%'}>
                        <Button onClick={handleDataConfig}>
                            Data Config
                        </Button>
                        <ButtonGroup variant="outlined"  >
                            <IconButton onClick={handleEdit} aria-label="edit">
                                <EditIcon />    
                            </IconButton>
                            <IconButton onClick={deleteComponent} aria-label="delete"><Delete/></IconButton>
                        </ButtonGroup>
                    </Stack>
                </CardActions>
            </Card>
            <ComponentModal component={component} isOpen={componentModalOpen} onSave={updateComponent} onClose={() => setComponentModalOpen(false)}/>
        </>
    );
}

export default ComponentCard;
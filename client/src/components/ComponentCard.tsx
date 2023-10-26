import api from '../services/api';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, Chip, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { IComponentPopulated, IRocket, IRocketPopulated } from '../utils/entities';
import EditIcon from '@mui/icons-material/Edit';
import PlusIcon from '@mui/icons-material/Add'
import { Delete } from '@mui/icons-material';

import ComponentModal from './modals/ComponentModal';
import ModuleEditor from './ModuleEditor'

interface ComponentCardProps {
    componentId: string;
    rocket: IRocketPopulated;
    onDelete: () => void;
    updateComponent: () => void;
    onDataConfigClick: (id: string) => void;
}

const ComponentCard: React.FC<ComponentCardProps> = (props: ComponentCardProps) => {
    const { componentId, onDelete, updateComponent, rocket, onDataConfigClick } = props;
    const [moduleEditorOpen, setModuleEditorOpen] = useState<boolean>(false);
    const [componentModalOpen, setComponentModalOpen] = useState<boolean>(false);
    const [component, setComponent] = useState<IComponentPopulated>({} as IComponentPopulated);

	const deleteComponent = async () => {
        const r: IRocket = {
            _id: rocket._id,
            Name: rocket.Name,
            Mass: rocket.Mass,
            Height: rocket.Height,
            Class: rocket.Class,
            Motor: rocket.Motor,
            MotorType: rocket.MotorType,
            Components: rocket.Components.map(c => c._id as string),
            Missions: rocket.Missions.map(m => m._id as string)
        };
        api.deleteComponent(componentId, r);
        onDelete();
	};

    useEffect(() => {
		async function getComponent() {
            const response = await api.getComponent(componentId);
            const data = response.data as IComponentPopulated;
            setComponent({
                _id: componentId,
                Name: data.Name,
                Details: data.Details,
                TelemetrySource: data.TelemetrySource,
                DataConfigId: data.DataConfigId
            });
		
		}
		getComponent();
	}, [componentId]);

    const handleViewDataConfig = () => {
        onDataConfigClick(component.DataConfigId._id as string);
    }

    const handleAddModule = () => {
        setModuleEditorOpen(true)
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
                        <ButtonGroup variant='contained'>
                            <Tooltip title="View Modules">
                                <Button onClick={handleViewDataConfig} disabled={!component.DataConfigId}>
                                    Modules
                                </Button>
                            </Tooltip>
                            <Tooltip title="New Module">
                                <IconButton 
                                    onClick={handleAddModule} 
                                    disabled={!component.DataConfigId} 
                                    aria-label='add module'
                                    sx={{
                                        borderTopRightRadius: 4, 
                                        borderBottomRightRadius: 4,
                                        borderTopLeftRadius: 0,
                                        borderBottomLeftRadius: 0
                                    }}>
                                    <PlusIcon/>
                                </IconButton>
                            </Tooltip>
                        </ButtonGroup>
                        <ButtonGroup variant="outlined">
                            <Tooltip title="Edit Component">
                                <IconButton onClick={handleEdit} aria-label="edit component"><EditIcon/></IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Component">
                                <IconButton onClick={deleteComponent} aria-label="delete component"><Delete/></IconButton>
                            </Tooltip>
                        </ButtonGroup>
                    </Stack>
                </CardActions>
            </Card>
            <ModuleEditor DataConfigID={component.DataConfigId._id as string} isOpen={moduleEditorOpen} onClose={() => setModuleEditorOpen(false)}/>
            <ComponentModal component={component} isOpen={componentModalOpen} onSave={updateComponent} onClose={() => setComponentModalOpen(false)}/>
        </>
    );
}

export default ComponentCard;
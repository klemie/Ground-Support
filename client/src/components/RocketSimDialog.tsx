import React, { useEffect, useState } from 'react';
import { IRocketSim } from '../utils/entities';
import api from '../services/api';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, Stack, TextField } from '@mui/material';


interface IRocketSimDialogProps {
    id?: string;
    isOpen: boolean;
    onClose: () => void;
}

const RocketSimDialog: React.FC<IRocketSimDialogProps> = (props: IRocketSimDialogProps) => {
    const { id, isOpen, onClose } = props;

    // rocket sim properties states
    const [name, setName] = useState<string | null>(null);
    const [dryMass, setDryMass] = useState<number | null>(null);
    const [wetMass, setWetMass] = useState<number | null>(null);
    const [centerOfGravity, setCenterOfGravity] = useState<number | null>(null);
    const [centerOfPressure, setCenterOfPressure] = useState<number | null>(null);
    const [diameter, setDiameter] = useState<number | null>(null);
    const [fuselageLength, setFuselageLength] = useState<number | null>(null);
    const [rocketLength, setRocketLength] = useState<number | null>(null);
    
    const rocketSimProperties = [
        { label: 'Name', value: name, setter: setName, type: 'text', units: '' },
        { label: 'Dry Mass', value: dryMass, setter: setDryMass, type: 'number', units: 'kg' },
        { label: 'Wet Mass', value: wetMass, setter: setWetMass, type: 'number', units: 'kg' },
        { label: 'Center of Gravity', value: centerOfGravity, setter: setCenterOfGravity, type: 'number', units: 'm' },
        { label: 'Center of Pressure', value: centerOfPressure, setter: setCenterOfPressure, type: 'number', units: 'm' },
        { label: 'Diameter', value: diameter, setter: setDiameter, type: 'number', units: 'inches' },
        { label: 'Fuselage Length', value: fuselageLength, setter: setFuselageLength, type: 'number', units: 'm' },
        { label: 'Rocket Length', value: rocketLength, setter: setRocketLength, type: 'number', units: 'm' },
    ];


    useEffect(() => {
        handleLoad();
    }, [id]);

    const handleChange = (e: any, setState: Function) => {
		setState(e.target.value as string);
	};

    const handleLoad = async () => {
        if (id == null) return;
        const response = await api.getRocketSim(id);
        const responseData = response.data as IRocketSim;
        setName(responseData.Name);
        setDryMass(responseData.DryMass);
        setWetMass(responseData.WetMass);
        setCenterOfGravity(responseData.CenterOfGravity);
        setCenterOfPressure(responseData.CenterOfPressure);
        setDiameter(responseData.FuselageDiameter);
        setFuselageLength(responseData.FuselageLength);
        setRocketLength(responseData.RocketLength);
    };
    
    const handleSave = async () => {
        const payload: IRocketSim = {
            Name: name!,
            DryMass: dryMass!,
            WetMass: wetMass!,
            CenterOfGravity: centerOfGravity!,
            CenterOfPressure: centerOfPressure!,
            FuselageDiameter: diameter!,
            FuselageLength: fuselageLength!,
            RocketLength: rocketLength!,
        };
        let success: boolean;
        if (id) {
            success = !(await api.updateRocketSim(id, payload)).error.error;
        } else {
            success = !(await api.createRocketSim(payload)).error.error;
        }

        if (success) {
            handleClose();
        }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth>
            <DialogTitle>{id ? 'Edit' : 'Create'} Rocket Sim</DialogTitle>
            <DialogContent>
                <Stack spacing={3}>
                    {rocketSimProperties.map((property, index) => (
                        <TextField
                            key={index}
                            label={property.label}
                            value={property.value}
                            onChange={(event) => handleChange(event, property.setter)}
                            type={property.type}
                            required
                            InputProps={{
								endAdornment: <InputAdornment position="start">{property.units}</InputAdornment>
							}}
                        />
                    ))}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default RocketSimDialog;
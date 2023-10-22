import React, { useState, useEffect } from 'react';
import { IRocketSimModel } from '../utils/entities';
import api from '../services/api';
import { Alert, Button, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

interface IRocketSimModalProps {
    isOpen: boolean;
    onClose: () => void;
    id?: string;
}

const RocketSimDialog: React.FC<IRocketSimModalProps> = (props: IRocketSimModalProps) => {
    const { isOpen, onClose, id } = props;
    
    const [alert, setAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    // RocketSimModel Properties
    const [dryMass, setDryMass] = useState<number | null>(null);
    const [wetMass, setWetMass] = useState<number | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [centerOfGravity, setCenterOfGravity] = useState<number | null>(null);
    const [centerOfPressure, setCenterOfPressure] = useState<number | null>(null);
    const [rocketLength, setRocketLength] = useState<number | null>(null);
    const [fuselageDiameter, setFuselageDiameter] = useState<number | null>(null);
    const [fuselageLength, setFuselageLength] = useState<number | null>(null);

    const rocketSimProperties = [
        { label: "Name", value: name, setter: setName, type: 'none' },
        { label: "Dry Mass", value: dryMass, setter: setDryMass, type: 'numeric', units: 'kg' },
        { label: "Wet Mass", value: wetMass, setter: setWetMass, type: 'numeric', units: 'kg' },
        { label: "Center of Gravity", value: centerOfGravity, setter: setCenterOfGravity, type: 'numeric', units: 'ft' },
        { label: "Center of Pressure", value: centerOfPressure, setter: setCenterOfPressure, type: 'numeric', units: 'ft' },
        { label: "Rocket Length", value: rocketLength, setter: setRocketLength, type: 'numeric', units: 'ft' },
        { label: "Fuselage Length", value: fuselageLength, setter: setFuselageLength, type: 'numeric', units: 'ft' },
        { label: "Fuselage Diameter", value: fuselageDiameter, setter: setFuselageDiameter, type: 'numeric', units: 'Inches' },
    ];

    const handleSave = async () => {
        const payload: IRocketSimModel = {
            Name: name!,
            DryMass: dryMass!,
            WetMass: wetMass!,
            CenterOfGravity: centerOfGravity!,
            CenterOfPressure: centerOfPressure!,
            RocketLength: rocketLength!,
            FuselageDiameter: fuselageDiameter!,
            FuselageLength: fuselageLength!,
        };

        if (id) {
            // update rocketSim
            setSuccess(!(await api.updateRocketSim(id, payload)).error.error);
        } else {
            // create rocketSim
            setSuccess(!(await api.createRocketSim(payload)).error.error);
        }
        console.log(success)
        setAlertMessage(success ? 'RocketSim updated successfully' : 'RocketSim failed to update. Fill in all fields');
        setAlert(!success);
        if (success) {
            onClose();
        }
    };

    const handleClose = () => {
        onClose();
    };

    const handleChange = (e: any, setState: Function) => {
		setState(e.target.value as string);
	};
    
    useEffect(() => {
        async function fetchRocketSim() {
            if (id) {
                // fetch rocketSim
                const response = await api.getRocketSim(id);
                const rocketSim = response.data as IRocketSimModel;
               
                setName(rocketSim.Name);
                setDryMass(rocketSim.DryMass);
                setWetMass(rocketSim.WetMass);
                setCenterOfGravity(rocketSim.CenterOfGravity);
                setCenterOfPressure(rocketSim.CenterOfPressure);
                setRocketLength(rocketSim.RocketLength);
                setFuselageDiameter(rocketSim.FuselageDiameter);
                setFuselageLength(rocketSim.FuselageLength);
            }
        }
        fetchRocketSim();
    }, [id]);

    return (
        <Dialog open={isOpen} fullWidth onClose={handleClose}>
            <DialogTitle>
                <Typography variant="h4">Rocket Sim Input</Typography>
            </DialogTitle>
            <DialogContent>
                <Collapse in={alert}>
                    <Alert
                        severity={success ? "success" : "error"}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setAlert(false);
                                }}
                            >
                                <Close fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        {alertMessage}
                    </Alert>
                </Collapse>
                <Stack spacing={3} sx={{ paddingY: 1 }}>
                    {rocketSimProperties.map((property, index) => (
                        <TextField
                            key={index}
                            label={property.label}
                            value={property.value}
                            onChange={(e) => handleChange(e, property.setter)}
                            required 
                            variant="outlined"
                            InputProps={{
								endAdornment: <InputAdornment position="start">{property.units}</InputAdornment>
							}}
                        />
                    ))}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave} disabled={!fuselageLength}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default RocketSimDialog;
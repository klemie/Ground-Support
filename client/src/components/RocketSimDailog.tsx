import React, { useState, useEffect } from 'react';
import { IRocketSimModel } from '../utils/entities';
import api from '../services/api';
import { Dialog, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

interface IRocketSimModalProps {
    isOpen: boolean;
    onClose: () => void;
    id?: string;
}

const RocketSimDialog: React.FC<IRocketSimModalProps> = (props: IRocketSimModalProps) => {
    const { isOpen, onClose, id } = props;
    
    const [loading, setLoading] = useState<boolean>(false);
    // RocketSimModel Properties
    const [dryMass, setDryMass] = useState<number | null>(null);
    const [wetMass, setWetMass] = useState<number | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [centerOfGravity, setCenterOfGravity] = useState<number | null>(null);
    const [centerOfPressure, setCenterOfPressure] = useState<number | null>(null);
    const [rocketLength, setRocketLength] = useState<number | null>(null);
    const [rocketDiameter, setRocketDiameter] = useState<number | null>(null);
    const [fuselageDiameter, setFuselageDiameter] = useState<number | null>(null);
    const [fuselageLength, setFuselageLength] = useState<number | null>(null);

    const rocketSimProperties = [
        { label: "Name", value: name, setter: setName },
        { label: "Dry Mass", value: dryMass, setter: setDryMass },
        { label: "Wet Mass", value: wetMass, setter: setWetMass },
        { label: "Center of Gravity", value: centerOfGravity, setter: setCenterOfGravity },
        { label: "Center of Pressure", value: centerOfPressure, setter: setCenterOfPressure },
        { label: "Rocket Length", value: rocketLength, setter: setRocketLength },
        { label: "Rocket Diameter", value: rocketDiameter, setter: setRocketDiameter },
        { label: "Fuselage Diameter", value: fuselageDiameter, setter: setFuselageDiameter },
        { label: "Fuselage Length", value: fuselageLength, setter: setFuselageLength },
    ];

    const handleSave = async () => {
        const payload: IRocketSimModel = {
            Name: name!,
            DryMass: dryMass!,
            WetMass: wetMass!,
            CenterOfGravity: centerOfGravity!,
            CenterOfPressure: centerOfPressure!,
            RocketLength: rocketLength!,
            RocketDiameter: rocketDiameter!,
            FuselageDiameter: fuselageDiameter!,
            FuselageLength: fuselageLength!,
        };

        let success: boolean = false;
        setLoading(!success);
        if (id) {
            // update rocketSim
            success = (await api.updateRocketSim(id, payload)).error.error;
        } else {
            // create rocketSim
            success = (await api.createRocketSim(payload)).error.error;
        }
        setLoading(!success);

        onClose();
        
    };

    const handleClose = async () => {
        await handleSave();
        onClose();
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
                setRocketDiameter(rocketSim.RocketDiameter);
                setFuselageDiameter(rocketSim.FuselageDiameter);
                setFuselageLength(rocketSim.FuselageLength);
            }
        }
        fetchRocketSim();
    }, [id]);

    

    return (
        <Dialog open={isOpen} fullScreen onClose={handleClose}>
            <DialogTitle>
                <Typography variant="h4">Rocket Simulation</Typography>
            </DialogTitle>
            <DialogContent>
                <Stack spacing={3}>
                    {rocketSimProperties.map((property, index) => (
                        <TextField
                            key={index}
                            label={property.label}
                            value={property.value}
                            onChange={(e) => property.setter(Number(e.target.value))}
                            variant="outlined"
                            type="number"
                        />
                    ))
                    
                    }
                </Stack>
            </DialogContent>
        </Dialog>
    );
}

export default RocketSimDialog;
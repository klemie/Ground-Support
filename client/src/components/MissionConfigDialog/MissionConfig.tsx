import React, { useCallback, useEffect, useState } from "react";
import { Button, Dialog, TextField, Stack, DialogContent, Typography, Checkbox, FormControlLabel, InputAdornment, Tooltip, IconButton, DialogActions, Select, MenuItem, OutlinedInput, Box, Chip, FormControl, InputLabel  } from "@mui/material";
import { IComponent, IMission, IRocket, IRocketPopulated } from "../../utils/entities";
import api from "../../services/api";

interface MissionConfigProps {
    missionId?: string;
    rocket: IRocketPopulated;
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250
		}
	}
};

const MissionConfig: React.FC<MissionConfigProps> = (props: MissionConfigProps) => {
    const { rocket, missionId, isOpen, onClose, onSave } = props;
    const [missionName, setMissionName] = useState<string>();
    const [latitude, setLatitude] = useState<number>();
    const [longitude, setLongitude] = useState<number>();
    const [launchDate, setLaunchDate] = useState<Date>();
    const [altitude, setAltitude] = useState<number>();
    const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
    const [components, setComponents] = useState<string[]>([]);

    const getComponents = useCallback(async () => {
        try {
            if (rocket) {
                rocket.Components.map( async (component: IComponent) => {
                    setComponents((prev) => [...prev, component.Name]);
                });
            }
        } catch (error) {
            console.error(error);
        } 
    }, []);

    const handleSave = useCallback(async() => {
        const payload: IMission = {
            Name: missionName,
            Date: launchDate,
            IsTest: false,
            IsActive: false,
            Coordinates: {
                Longitude: longitude,
                Latitude: latitude
            },
            LaunchAltitude: altitude,
            Published: false,
            Components: selectedComponents
        } as IMission;
        if (missionId) {
            await api.updateMission(missionId, payload);
        } else {
            await api.createMission(payload, rocket);
        }
        // const [missionData, rocketData] = response;
        onClose();
    }, []);

    const handleChange = (e: any, setState: Function) => {
		setState(e.target.value as string);
	};

    useEffect(() => {
        // clear the components array
        setComponents([]);
        getComponents();
    }, []);

    return(
        <Dialog open={props.isOpen} fullWidth>
            <DialogContent>
                <Stack direction="column" spacing={3} alignItems="left">
                    <Typography variant="h4" align="left"> Mission Configuration </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <TextField 
                            required
                            variant="outlined" 
                            type="String"
                            fullWidth
                            size="small"
                            label="Mission Name"
                            value={missionName}
                            onChange={(e) => handleChange(e, setMissionName)}
                        />
                        <Tooltip title="Data Collected is for testing purposes">
                            <FormControlLabel 
                                value="Test" 
                                control={<Checkbox defaultChecked />} 
                                label="Test"
                                labelPlacement="start"
                            />
                        </Tooltip>
                        {/* still need to add a state for the checkbox */}
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <TextField 
                            required
                            variant="outlined" 
                            type="String"
                            fullWidth
                            size="small"
                            label="Mission Location (Latitude)"
                            value={latitude}
                            onChange={(e) => handleChange(e, setLatitude)}
                        />
                        <TextField 
                            required
                            variant="outlined" 
                            type="String"
                            fullWidth
                            size="small"
                            label="Mission Location (Longitude)"
                            value={longitude}
                            onChange={(e) => handleChange(e, setLongitude)}
                        />
                    </Stack>
                    <TextField 
                        required
                        variant="outlined" 
                        type="Date"
                        fullWidth
                        size="small"
                        label="Launch Date"
                        InputLabelProps={{ shrink: true }}
                        value={launchDate}
                        onChange={(e) => handleChange(e, setLaunchDate)}
                    />
                    <TextField 
                        required
                        variant="outlined" 
                        type="Number"
                        fullWidth
                        size="small"
                        label="Launch Altitude"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">ft</InputAdornment>,
                        }}
                        value={altitude}
                        onChange={(e) => handleChange(e, setAltitude)}
                    />
                    <FormControl fullWidth variant="filled" required>
						<InputLabel id="component-source-label">Configure Components</InputLabel>
                        <Select
                            id="component-source"
                            variant="filled"
                            multiple
                            fullWidth
                            value={selectedComponents}
                            onChange={(e) => handleChange(e, setSelectedComponents)}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            // helperText="Configure components for this mission"
                            renderValue={(selected: string[]) => (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 0.5,
                                        transform: 'translateY(20%)'
                                    }}
                                >
                                    {selected.map((value: string) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            sx={{
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    border: 'none !important'
                                }
                            }}
                            MenuProps={MenuProps}
                            labelId="component-source-label"
                            label="Enable Components"
                        >
                            {
                            components.map((component: string, idx) => (
                                <MenuItem key={idx} value={component}>
                                    {component}
                                </MenuItem>
                            ))
                            }
                        </Select>
                    </FormControl>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default MissionConfig;
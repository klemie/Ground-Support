import React from "react";
import { Button, Select, MenuItem,  FormControl, Dialog, TextField, Stack, DialogContent, InputLabel, Typography } from "@mui/material";
import { Add, Upload } from "@mui/icons-material"; 

interface MissionConfigProps {
    missionId?: string;
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
}

const MissionConfig: React.FC<MissionConfigProps> = (props: MissionConfigProps) => {

    return(
        <Dialog open={props.isOpen} fullWidth>
            <DialogContent>
                <Stack direction="column" spacing={3} alignItems="left">
                    <Typography variant="h4" align="left"> Mission Configuration </Typography>

                    <TextField 
                        required
                        variant="outlined" 
                        type="String"
                        placeholder={""}
                        fullWidth
                        size="small"
                        label="Mission Name"
                    />
                    <TextField 
                        required
                        variant="outlined" 
                        type="String"
                        placeholder={""}
                        fullWidth
                        size="small"
                        label="Mission Location"
                    />
                    <TextField 
                        required
                        variant="outlined" 
                        type="Date"
                        placeholder={""}
                        fullWidth
                        size="small"
                        label="Launch Date"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField 
                        required
                        variant="outlined" 
                        type="Number"
                        placeholder={""}
                        fullWidth
                        size="small"
                        label="Launch Altitude"
                    />

                    <Stack direction="row" spacing={2} alignItems="center">
                        <FormControl variant="outlined" size="small" sx={{ 
                            minWidth: "85%"
                        }}>
                            <InputLabel id="rocketProfile">Rocket Profile</InputLabel>
                            <Select 
                            defaultValue=""
                            labelId="rocketProfile"
                            label="Rocket Profile"
                            >
                                <MenuItem value=""></MenuItem>
                                <MenuItem value="MVP-1">MVP-1</MenuItem>
                                <MenuItem value="MVP-2">MVP-2</MenuItem>
                                <MenuItem value="Xenia-1">Xenia-1</MenuItem>
                                <MenuItem value="Xenia-2">Xenia-2</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant={"contained"} color={"error"} component="label"> 
                            <Add />
                            <input hidden type="file" />
                        </Button>
                    </Stack>
                    <Button variant={"contained"} component="label"
                        startIcon={<Upload/>}
                    >
                        Data Configuration 
                        <input hidden type="file" />
                    </Button>

                    <Stack direction="row" spacing={2} alignItems="center">

                        <Button variant={"contained"} sx={{ minWidth: "48.5%"}} onClick={props.onSave}>Save</Button>

                        <Button variant={"contained"} color={"error"} sx={{ minWidth: "48.5%"}} onClick={props.onClose}>Cancel</Button>

                    </Stack>

                </Stack>
            </DialogContent>
        </Dialog>
    );
}

export default MissionConfig;
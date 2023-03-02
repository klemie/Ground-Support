import React, {useState} from "react";
import { Button, Select, MenuItem,  FormControl, Dialog, TextField, Stack, DialogContent, InputLabel } from "@mui/material";

interface MissionConfigProps {
    missionName: string;
    location: [number, number];
    date: Date;
    rocketProfile: string;
    isOpen: boolean;
    handleClose: () => void
}

const MissionConfig: React.FC<MissionConfigProps> = (props: MissionConfigProps) => {

    return(
        <Dialog open={props.isOpen} fullWidth>
            <DialogContent>
                <Stack direction="column" spacing={2} alignItems="left">

                    <TextField 
                        required
                        variant="outlined" 
                        type="String"
                        placeholder={props.missionName}
                        fullWidth
                        helperText="Mission Name"
                    />
                    <TextField 
                        required
                        variant="outlined" 
                        type="String"
                        placeholder={props.location[0] + ", " + props.location[1]}
                        fullWidth
                        helperText="Mission Location"
                    />
                    <TextField 
                        required
                        variant="outlined" 
                        type="Date"
                        placeholder={props.date.toLocaleDateString()}
                        fullWidth
                        helperText="Launch Date"
                    />

                    <Stack direction="row" spacing={2} alignItems="center">
                        <FormControl variant="outlined" sx={{ minWidth: "85%" }}>
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
                            +
                            <input hidden type="file" />
                        </Button>
                    </Stack>

                    <Button variant={"contained"} component="label">Data Configuration <input hidden type="file" /></Button>

                    <Stack direction="row" spacing={2} alignItems="center">

                        <Button variant={"contained"} sx={{ minWidth: "48.5%"}}>Save</Button>

                        <Button variant={"contained"} color={"error"} sx={{ minWidth: "48.5%"}} onClick={props.handleClose}>Cancel</Button>

                    </Stack>

                </Stack>
            </DialogContent>
        </Dialog>
    );
}

export default MissionConfig;
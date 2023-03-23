import React from "react";
import { Button, Select, MenuItem,  FormControl, Dialog, TextField, Stack, DialogContent, InputLabel, Typography, Checkbox, FormControlLabel, InputAdornment, Tooltip, IconButton  } from "@mui/material";
import { Add, Upload, Info } from "@mui/icons-material"; 

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
                    <Stack direction="row" spacing={2} alignItems="center">
                        <TextField 
                            required
                            variant="outlined" 
                            type="String"
                            placeholder={""}
                            fullWidth
                            size="small"
                            label="Mission Name"
                        />
                        <Tooltip title="Data Collected is for testing purposes">
                            <FormControlLabel 
                                value="Test" 
                                control={<Checkbox color="error" defaultChecked />} 
                                label="Test"
                                labelPlacement="start"
                            />
                        </Tooltip>
                        
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <TextField 
                            required
                            variant="outlined" 
                            type="String"
                            placeholder={""}
                            fullWidth
                            size="small"
                            label="Mission Location (Latitude)"
                        />
                        <TextField 
                            required
                            variant="outlined" 
                            type="String"
                            placeholder={""}
                            fullWidth
                            size="small"
                            label="Mission Location (Longitude)"
                        />
                    </Stack>
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
                        InputProps={{
                            endAdornment: <InputAdornment position="end">ft</InputAdornment>,
                        }}
                    />

                    <Stack direction="row" spacing={2} alignItems="center">
                        <Button fullWidth={true} variant={"contained"} component="label"
                            startIcon={<Upload/>}
                        >
                            Data Configuration 
                            <input hidden type="file" />
                        </Button>
                        <IconButton>
                            <Info />
                        </IconButton>
                        {/* <FormControl variant="outlined" size="small" sx={{ 
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
                        </Button> */}
                    </Stack>
                    

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
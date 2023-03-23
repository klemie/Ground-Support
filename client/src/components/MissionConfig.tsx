import React from "react";
import { Button, Dialog, TextField, Stack, DialogContent, Typography, Checkbox, FormControlLabel, InputAdornment, Tooltip, IconButton  } from "@mui/material";
import { Upload, Info } from "@mui/icons-material"; 

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
                            fullWidth
                            size="small"
                            label="Mission Location (Latitude)"
                        />
                        <TextField 
                            required
                            variant="outlined" 
                            type="String"
                            fullWidth
                            size="small"
                            label="Mission Location (Longitude)"
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
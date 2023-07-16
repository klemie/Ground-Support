import React, {useState} from "react";
import { Button, Dialog, Stack, DialogContent, Typography } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';



interface SettingsDialogProps {
    isOpen: boolean;
    onClose: () => void
}


const SettingsDialog: React.FC<SettingsDialogProps> = (props: SettingsDialogProps) => {
    
    return(
        <Dialog open={props.isOpen}>
            <DialogContent>
                <DialogTitle sx={{p:0}}><Typography variant="h5" gutterBottom> Modules </Typography></DialogTitle>
                <Divider />
                <Stack direction="column" spacing={1} alignItems="center" justifyContent="center">
                <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="BME" />
                        <FormControlLabel control={<Checkbox defaultChecked />} label="ADX" />
                        <FormControlLabel control={<Checkbox defaultChecked />} label="LSM" />
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Airbrakes" />
                        <FormControlLabel control={<Checkbox defaultChecked />} label="MaG-Pi" />
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Strain Gauges" />
                        <Stack direction="row" spacing={1}> <AddCircleOutlineRoundedIcon /> <Typography variant="button"> Configure more </Typography>
                        </Stack>
                        <Divider />
                        
                </FormGroup>
                <Button sx={{p:0.5}} color="error" onClick={props.onClose}> Close </Button>
                </Stack>
            </DialogContent>

        </Dialog>
    );
}

export default SettingsDialog;
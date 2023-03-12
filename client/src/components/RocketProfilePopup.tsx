import React, { useState } from "react";
import { Card, CardActions, CardContent, Button, InputAdornment, TextField, FormControl, IconButton, CardHeader, MenuItem, Stack, Box } from "@mui/material";

import { Close, Add } from "@mui/icons-material";

interface RocketProfileProps {
  onClose: () => void;
}

const cardStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 700,
  boxShadow: 24,
};

const buttonStyle = {
  height: 45,
  borderRadius: 6,
  mt: 10,
  alignSelf: 'center',
  px: 3,
}

const RocketProfilePopup: React.FC<RocketProfileProps> = (props: RocketProfileProps) => {

  const [rocketClass, setRocketClass] = useState('');
  const [motorType, setMotorType] = useState('');

  const saveProfile = () => {
    console.log("Saving profile");
    props.onClose();
  }

  return (
    <Box sx={cardStyle}>
      <Card>
        <CardHeader title="New Rocket Profile"
        action={
          <IconButton aria-label="Close" onClick={props.onClose}>
            <Close />
          </IconButton>
        }/>
        <hr></hr>
        <CardContent>
          <FormControl fullWidth>
          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={4}>
              <TextField sx={{minWidth: "40%"}} id="profile-name" label="Profile Name" variant="outlined" />
              <Button size="small" sx={buttonStyle} variant="contained" startIcon={<Add />} component="label">
                <input hidden accept="*" type="file" />
                SVG
              </Button>
              <Button size="small" sx={buttonStyle} variant="contained" startIcon={<Add />} component="label">
                <input hidden accept="*" type="file" />
                SIM DATA
              </Button>
            </Stack>

              <TextField sx={{minWidth: "100%"}} id="mass" label="Mass" variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment position="start">kg</InputAdornment>,
              }}
              />

              <TextField sx={{minWidth: "100%"}}  id="height" label="Height" variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment position="start">m</InputAdornment>,
              }}
              />

              <TextField
                sx={{minWidth: "100%"}}
                value={rocketClass}
                onChange={(e) => setRocketClass(e.target.value)}
                select
                label="Class"
              >
                <MenuItem value={1}>Test 1</MenuItem>
                <MenuItem value={2}>Test 2</MenuItem>
              </TextField>

              <Stack direction="row" spacing={2}>
                <TextField
                  sx={{minWidth: "40%"}}
                  value={motorType}
                  onChange={(e) => setMotorType(e.target.value)}
                  select
                  label="Motor Type"
                >
                  <MenuItem value={1}>Test 1</MenuItem>
                  <MenuItem value={2}>Test 2</MenuItem>
                </TextField>
                
                <TextField sx={{minWidth: "58%"}} id="motor-name" label="Motor" variant="outlined" >
                </TextField>
              </Stack>
            </Stack>
          </FormControl>
        </CardContent>
        <hr></hr>
        <CardActions sx={{ float: "right"}}>
          <Button onClick={props.onClose} >Cancel</Button>
          <Button onClick={saveProfile}>Save</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default RocketProfilePopup;
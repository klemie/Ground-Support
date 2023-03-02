import React from "react";
import { Button, Grid } from "@mui/material";
import VerticalStepper from "../components/VerticalStepper";
import SettingsDialog from "../components/SettingsDialog";
import MissionConfig from "../components/MissionConfig";

const UtilitiesView = () => {

  /* For opening and closing the settings dialog:*/
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  }

  const [missionConfigOpen, setMissionConfigOpen] = React.useState(false);

  const handleMissionConfigOpen = () => {
    setMissionConfigOpen(!missionConfigOpen);
  }

  return (
    <>
      <Grid
        paddingX="2rem"
        paddingY="1rem"
        container
        direction="column"
        justifyContent="space-between"
        height="100%"
      >
        {/* TODO: Should call a Setting pop up */}
        <Grid item>
          <SettingsDialog isOpen={isOpen} onClose={()=>setIsOpen(false)}/>
          <Button variant="outlined" onClick={()=>handleOpen()}>Settings</Button>
          
        </Grid>

        <Grid item>
          <MissionConfig 
            missionName={"ur mom"} 
            location={[23.30384, 85.47959]} 
            date={new Date(2023, 5, 23)} 
            rocketProfile={"Xenia-2"} 
            isOpen={missionConfigOpen} 
            handleClose={()=>setMissionConfigOpen(false)}
          />
          <Button variant="contained" onClick={()=>handleMissionConfigOpen()}>Mission Config</Button>
        </Grid>

        {/* Page change stepper */}
        <Grid item>
          <VerticalStepper currentStep={"Telemetry View"} />
        </Grid>

        {/* TODO: Should terminate all data readings */}
        <Grid item>
          <Button
            fullWidth={true}
            variant="contained"
            color="error"
          >
            End Mission
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default UtilitiesView;

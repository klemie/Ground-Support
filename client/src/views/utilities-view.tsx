import React from "react";
import { Button, Grid } from "@mui/material";
import VerticalStepper from "../components/VerticalStepper";
import SettingsDialog from "../components/SettingsDialog";

interface UtilitiesProps {
  setCurrentView: (viewName: string) => void;
}

const UtilitiesView = (props: UtilitiesProps) => {

  /* For opening and closing the settings dialog:*/
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <Grid
        paddingX="1rem"
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
            onClick={() => props.setCurrentView("Mission_Selection")}
          >
            End Mission
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default UtilitiesView;

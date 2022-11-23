import React from "react";
import { Button, Grid } from "@mui/material";
import VerticalStepper from "../components/VerticalStepper";

const UtilitiesView = () => {
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
          <Button variant="outlined">Settings</Button>
        </Grid>

        {/* Page change stepper */}
        <Grid item>
          <VerticalStepper />
        </Grid>

        {/* TODO: Should terminate terminate all data readings */}
        <Grid item>
          <Button fullWidth={true} variant="contained" color="error">
            End Mission
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default UtilitiesView;

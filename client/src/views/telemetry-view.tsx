import React from "react";
import Frequency from "../components/Frequency";
import { Box, Stack, Grid } from "@mui/material";
import SatelliteCount from "../components/SatelliteCount";
import VerticalStepper from "../components/VerticalStepper";

export default function TelemetryView() {
  return (
    <>
      <Grid container direction="column" paddingX="2rem" paddingY="1rem" gap={3}>
        {/* Page Header */}
        <Grid item>
          <h1>Telemetry View</h1>
        </Grid>

        {/* Parameters Controllers */}
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Frequency value={75}></Frequency>
          <SatelliteCount value={1} />
        </Grid>

        <Grid item>
          {/* Placeholder for Data Log */}
          <Box
            sx={{
              width: "70%",
              height: "450px",
              backgroundColor: "black",
            }}
          ></Box>
        </Grid>
      </Grid>
    </>
  );
}

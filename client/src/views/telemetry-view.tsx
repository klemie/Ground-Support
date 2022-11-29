import React from "react";
import Frequency from "../components/Frequency";
import { Grid, Typography } from "@mui/material";
import SatelliteCount from "../components/SatelliteCount";
import DataLog from "../components/DataLog";

export default function TelemetryView() {
  return (
    <>
      <Grid
        container
        direction="column"
        paddingX="2rem"
        paddingY="1rem"
        gap={3}
      >
        {/* Page Header */}
        <Grid item>
          <Typography variant="h3">Telemetry View</Typography>
        </Grid>

        {/* Parameters Controllers */}
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Frequency value={75} />
          <SatelliteCount value={1} />
        </Grid>

        <Grid item>
          <DataLog />
        </Grid>
      </Grid>
    </>
  );
}

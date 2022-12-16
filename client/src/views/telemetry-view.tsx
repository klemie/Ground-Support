import React, { useState, useEffect } from "react";
import Frequency from "../components/Frequency";
import { Grid, Typography } from "@mui/material";
import SatelliteCount from "../components/SatelliteCount";
import DataLog from "../components/DataLog";

export default function TelemetryView() {
  const [frequency, setFrequency] = useState<Number>(100);
  const [satelliteCount, setSatelliteCount] = useState<Number>(50);

  function updateFrequency(newValue: Number) {
    setFrequency(newValue);
  }

  useEffect(() => {
    console.log("parent received new frequency: ", frequency);
  }, [frequency]);

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
          <Frequency
            value={frequency}
            updateFrequency={updateFrequency}
          />
          <SatelliteCount value={satelliteCount} />
        </Grid>

        <Grid item>
          <DataLog />
        </Grid>
      </Grid>
    </>
  );
}

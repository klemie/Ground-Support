import React, { useState, useEffect } from "react";
import Frequency from "../components/Frequency";
import { Grid, Typography } from "@mui/material";
import SatelliteCount from "../components/SatelliteCount";
import DataLog from "../components/DataLog";
import TelemetryLog from '../components/TelemetryLog';

export default function TelemetryView() {
  const [frequency, setFrequency] = useState<Number>(100);
  const [satelliteCount, setSatelliteCount] = useState<Number>(50);
  const [sampleData, setSampleData] = useState<Array<any>>([0, 0, 0]);

  function updateFrequency(newValue: Number) {
    setFrequency(newValue);
  }

  useEffect(() => {
    console.log("parent received new frequency: ", frequency);
  }, [frequency]);

  useEffect(() => {
    const interval = setInterval(() => {
      const a = Math.floor(Math.random() * 60), 
        b = Math.floor(Math.random() * 60), 
        c = Math.floor(Math.random() * 60);
      const updatedData = sampleData;
      var temp = updatedData.push(['\n' + a, b, c]);
      setSampleData(updatedData);
    }, 1000);
    return () => clearInterval(interval)
  }, [])

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
          <TelemetryLog value={sampleData} width={"70%"} height={"450px"}
          />
        </Grid>
      </Grid>
    </>
  );
}

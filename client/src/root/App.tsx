import React from "react";
import "./App.css";
import { Grid } from "@mui/material";

import TelemetryView from "../views/telemetry-view";
import UtilitiesView from "../views/utilities-view";
import MissionSelectionView from "../views/missionSelection-view";

function App() {
  // useState for currentView
  return (
    <div className="App">
      <MissionSelectionView />
      
      <Grid
        container
        spacing={2}
        direction="row"
      >
        {/* Any views should be rendered within this grid item */}
        <Grid
          item
          xs={10}
        >
          <TelemetryView />
        </Grid>

        <Grid
          item
          xs={2}
          borderLeft="1px solid"
        >
          <UtilitiesView />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

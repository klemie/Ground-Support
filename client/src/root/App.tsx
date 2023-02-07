import React, { useState } from "react";
import "./App.css";
import { Grid } from "@mui/material";

import TelemetryView from "../views/telemetry-view";
import UtilitiesView from "../views/utilities-view";
import MissionSelectionView from "../views/missionSelection-view";

function App() {

  // useState for currentView
  const [currentView, setCurrentView]=useState("Mission_Selection")

  const updateView = (viewName: string) => {
    setCurrentView(viewName)
  }

  return (
    <div className="App">
      { currentView == "Mission_Selection" && <MissionSelectionView setCurrentView={updateView}/> }
      
      { currentView == "Active_Mission" && 
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
            <UtilitiesView setCurrentView={updateView}/>
          </Grid>
        </Grid>
      }
    </div>
  );
}

export default App;

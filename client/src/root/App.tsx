import React, { useState } from "react";
import "./App.css";
import { Grid, Button, Modal } from "@mui/material";

import TelemetryView from "../views/telemetry-view";
import UtilitiesView from "../views/utilities-view";
import RocketProfilePopup from "../components/RocketProfilePopup";

function App() {
  // useState for currentView

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="App">
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
          <Button onClick={handleOpen}>Open modal</Button>
          <Modal
            open={open}
            onClose={handleClose}
          >
            <RocketProfilePopup closeModal={handleClose}/>
          </Modal>
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

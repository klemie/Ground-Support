import React, { useState, useEffect } from "react";

import { Grid, Typography, Chip, Stack } from "@mui/material";
import { Add } from "@mui/icons-material";

import "../styles/missionSelect.css";

import addRocket from "../static/images/AddRocket.svg";

interface Mission {
  id: number;
  name: string;
  image: string;
  active: boolean;
}

interface MissionSelectProps {
  setCurrentView: (viewName: string) => void;
}

export default function MissionSelectionView(props: MissionSelectProps) {

  const dummyMissionData: Mission[] = [
    {
      id: 1,
      name: "MVP-1",
      image: "Mvp1.svg",
      active: true,
    },
    {
      id: 2,
      name: "MVP-2",
      image: "Mvp2.svg",
      active: false,
    },
    {
      id: 3,
      name: "XENIA-1",
      image: "Xenia1.svg",
      active: true,
    }
  ];

  const [missionData, setMissionData] = useState(dummyMissionData);

  useEffect(() => {
    //make an API call when component first mounts and setMissionData with response
    setMissionData(dummyMissionData)
  },[]);

  const addNewMission = () => {
    props.setCurrentView("Active_Mission");
    console.log("Adding new mission...")
  }

  const setMission = (data: Mission) => {
    props.setCurrentView("Active_Mission");
    console.log("Setting Mission to:", data)
  }

  const missions = missionData.map((data: Mission)=>{
    const rocketImageURL = require('../static/images/' + data.image);
    return <div key={data.id.toString()}>
      <Stack direction="column" spacing={1} onClick={() => setMission(data)}>

        <img src={rocketImageURL} alt="Mission" width={40}></img>
        <Chip label={data.name} color={ data.active ? "primary" : "warning" } sx={{ fontWeight: "bold" }}/> 
      </Stack>
    </div>
  })

  return (
    <div style={{ width: "100vw", height: "99vh" }}>
      <Grid
        container
        direction="column"
        paddingX="2rem"
        paddingY="1rem"
        gap={3}
        sx={{ height: "100%", width: "100%" }}
      >

        {/* Page Header */}
        <Grid 
          container 
          justifyContent="center" 
          alignItems="center"
        >
          <Typography variant="h3">Mission Selection</Typography>
        </Grid>

        {/* Mission Selection */}
        <Grid
          container 
          justifyContent="center" 
          alignItems="center"
          style={{ height: "80%" }}
        >
          <Stack direction="row" justifyContent="center" spacing={8} alignItems="flex-end">
            { missions }
            <Stack direction="column" spacing={1} onClick={addNewMission}>
              <img src={addRocket} alt="Add Rocket" width={40}></img>
              <Chip label="New Mission" color="default"/>
            </Stack>
          </Stack>
        </Grid>
    </Grid>
    </div>
  );

}
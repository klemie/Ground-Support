import React, { useState, useEffect } from "react";

import { Grid, Typography, Chip, Stack } from "@mui/material";
import { Add } from "@mui/icons-material";

import "../styles/missionSelect.css";

import addRocket from "../static/images/AddRocket.png";

interface Mission {
  id: Number;
  name: String;
  image: String;
}

interface MissionSelectProps {
  setCurrentView: (viewName: string) => void;
}

export default function MissionSelectionView(props: MissionSelectProps) {

  const dummyMissionData: Mission[] = [
    {
      id: 1,
      name: "MVP-1",
      image: "MVP-1.png",
    },
    {
      id: 2,
      name: "MVP-2",
      image: "MVP-2.png",
    },
    {
      id: 3,
      name: "XENIA-1",
      image: "XENIA-1.png",
    }
  ]

  const [missionData, setMissionData]=useState(dummyMissionData)

  useEffect(()=>{
    //make an API call when component first mounts and setUserData with response
    setMissionData(dummyMissionData)
  },[])

  function addNewMission () {
    props.setCurrentView("Active_Mission");
    console.log("Adding new mission...")
  }

  function setMission (data: Mission)  {
    props.setCurrentView("Active_Mission");
    console.log("Setting Mission to:", data)
  }

  const missions = missionData.map((data: Mission)=>{
    return <div key={data.id.toString()}>
      <Stack direction="column" spacing={1} onClick={() => setMission(data)}>
        <img src={addRocket} alt="Mission" width={40}></img>
        <Chip label={data.name} color="primary"/> 
      </Stack>
    </div>
  })

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
          <Typography variant="h3">Mission Selection</Typography>
        </Grid>

        {/* Mission Selection */}
        <Grid item>
          <Stack direction="row" justifyContent="center" spacing={8}>
            { missions }
            <Stack direction="column" spacing={1} onClick={addNewMission}>
              <img src={addRocket} alt="Add Rocket" width={40}></img>
              <Chip label="New Mission" color="default"/>
            </Stack>
          </Stack>
        </Grid>
    </Grid>
    </>
  );

}
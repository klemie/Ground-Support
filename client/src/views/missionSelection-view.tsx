import React, { useState, useEffect } from "react";

import { Grid, Typography, Chip, Stack } from "@mui/material";
import { Add } from "@mui/icons-material";

interface Mission {
  id: Number;
  name: String;
  image: String;
}

export default function MissionSelectionView() {

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

  const missions = missionData.map((data: Mission)=>{
    return <div key={data.id.toString()}>
      <Chip label={data.name} color="primary" />
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
          <Stack direction="row" spacing={5}>
            { missions }
            <Chip label="New Mission" color="default" icon={<Add />}/>
          </Stack>
        </Grid>
    </Grid>
    </>
  );

}
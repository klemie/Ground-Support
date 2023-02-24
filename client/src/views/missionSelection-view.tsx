import React, { useState, useEffect } from "react";

import { Grid, Typography, Chip, Stack } from "@mui/material";

import "../styles/missionSelect.css";

import addRocket from "../static/images/AddRocket.svg";
import Hyak1 from "../static/images/Hyak1.svg";
import Hyak2 from "../static/images/Hyak2.svg";
import Mvp1 from "../static/images/Mvp1.svg";
import Mvp2 from "../static/images/Mvp2.svg";
import Skookum1 from "../static/images/Skookum1.svg";
import Xenia1 from "../static/images/Xenia1.svg";
import Header, { Breadcrumb } from "../components/Header";

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
  const colors: string[] = [
    "rgba(255, 197, 87, 1)",
    "rgba(214, 91, 79, 1)",
    "rgba(0, 94, 184, 1)",
    "rgba(69, 136, 201, 1)"
  ];

  const breadCrumbs: Breadcrumb[] = [
    { name: "Mission Selection", path: "/", active: false },
  ];
  
  const dummyMissionData: Mission[] = [
    {
      id: 1,
      name: "MVP-1",
      image: Mvp1,
	    active: false
    },
    {
      id: 2,
      name: "MVP-2",
      image: Mvp2,
	    active: false
    },
    {
      id: 3,
      name: "Skookum-1",
      image: Skookum1,
	    active: false
    },
    {
      id: 4,
      name: "Hyak-1",
      image: Hyak1,
	    active: false
    },
    {
      id: 5,
      name: "Hyak-2",
      image: Hyak2,
	    active: false
    },
    {
      id: 6,
      name: "Xenia-1",
      image: Xenia1,
	    active: false
    },
  ];

  const [missionData, setMissionData] = useState(dummyMissionData);

  useEffect(()=> {
    //make an API call when component first mounts and setUserData with response
    setMissionData(dummyMissionData);
  },[]);

  function addNewMission () {
    props.setCurrentView("Active_Mission");
    console.log("Adding new mission...");
  }

  function setMission (data: Mission)  {
    props.setCurrentView("Active_Mission");
    console.log("Setting Mission to:", data);
  }

  const missions = missionData.map((data: Mission) => {
    return(
      <div key={data.id.toString()} >
        <Stack 
          direction="column" 
          spacing={1}
        >
          <img src={data.image} alt="Mission" width={40} onClick={data.active ? () => setMission(data) : () => {}}/> 
          <Chip label={data.name} sx={{ fontWeight: "bold" }}/> 
        </Stack>
      </div>
    );
  })

  return (
    <div style={{ width: "100vw", height: "99vh" }}>
      <Grid
        container
        direction="column"
        paddingX="2rem"
        paddingY="2rem"
        gap={3}
		    sx={{ height: "100%", width: "100%" }} 
      >
        {/* Page Header */}
        <Grid  item >
          <Header breadCrumbs={breadCrumbs} />
        </Grid>

        {/* Mission Selection */}
        <Grid 
          container 
          justifyContent="center" 
          alignItems="center"
          style={{ height: "80%" }}
        >	
          <Stack
            direction="row" 
            justifyContent="center" 
            spacing={8}
            alignItems="flex-end"
          >
            { missions }
            <Stack 
              direction="column" 
              spacing={1} 
              onClick={addNewMission}
            >
              <img src={addRocket} alt="Add Rocket" width={40}></img>
              <Chip label="New Mission" color="primary" sx={{ fontWeight: "bold" }}/>
            </Stack>
          </Stack>
        </Grid>
        <Grid item>
         
        </Grid>
      </Grid>
      <div>
        {colors.map((color)=> {
          return <div style={{ backgroundColor: color, width: "25%", height: "1vh", float: "left" }} />;
        })}
      </div>
    </div>
  );

}
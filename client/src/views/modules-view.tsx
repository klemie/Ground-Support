import React from "react";
import { Box, Stack, Grid } from "@mui/material";
import DataView from "../components/DataView";

export default function ModulesView() {
  return (
    <>
      <Grid container direction="column" paddingX="2rem" paddingY="1rem" gap={2}>
        {/* Page Header */}
        <Grid item>
          <h1>Module View</h1>
        </Grid>

        {/* 2 col, 3 row grid */}
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {Array.from(Array(6)).map((_, index) => (
            // 1 box
            <Grid item xs={2} sm={4} md={4} key={index}>
              <DataView title={"Field " + index} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}

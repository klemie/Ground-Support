import React from "react";
import { TextField, Stack, Typography } from "@mui/material";

interface SatelliteCountProps {
  value: Number;
}

const SatelliteCount: React.FC<SatelliteCountProps> = (props: SatelliteCountProps) => {
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
      >
        <Typography variant="h6">Satellite Count</Typography>

        <TextField
          variant="outlined"
          value={props.value}
          disabled
          name="satellite"
          size="small"
          style={{ width: 100 }}
        />
      </Stack>
    </>
  );
};

export default SatelliteCount;

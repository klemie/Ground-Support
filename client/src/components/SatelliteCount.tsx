import React, { useState, useEffect } from "react";
import { TextField, Stack, Typography } from "@mui/material";

interface SatelliteCountProps {
  value: number;
  updateCount: Function;
};


const SatelliteCount: React.FC<SatelliteCountProps> = (props: SatelliteCountProps) => {
  const [value,  setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [value, props]);

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
          value={value}
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

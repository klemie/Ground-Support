import React from "react";
import { Button, TextField, Stack } from "@mui/material";

interface ModuleProps {
  value?: Number;
}

const SatelliteCount: React.FC<ModuleProps> = (props: ModuleProps) => {
  const [value, setValue] = React.useState(props.value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value));
  };

  return (
    <>
      <Stack direction="row" spacing={2} alignItems="center">
        <div>
          <h3>Number of Satellite</h3>
        </div>
        <TextField id="outlined-basic" variant="outlined" value={value} />
      </Stack>
    </>
  );
};

export default SatelliteCount;

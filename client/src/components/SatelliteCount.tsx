import React from "react";
import { Button, TextField, Stack, Typography } from "@mui/material";

interface SatelliteCountProps {
  value: Number;
}

const SatelliteCount: React.FC<SatelliteCountProps> = (props: SatelliteCountProps) => {
  const [value, setValue] = React.useState(props.value);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get("satellite") != "") {
      console.log("new satellite: " + data.get("satellite"));
      let value = String(data.get("satellite"));
      setValue(parseFloat(value));
    } else {
      console.log("no satellite data was entered");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <Typography variant="h6">Satellite Count</Typography>

          <TextField
            variant="outlined"
            placeholder={"75"}
            name="satellite"
            type="number"
            size="small"
            style={{ width: 100 }}
          />

          <Button
            variant="contained"
            size="large"
            type="submit"
          >
            Set Satellite Count
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default SatelliteCount;

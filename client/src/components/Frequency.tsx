import React, { useEffect, useState } from "react";
import { Button, TextField, Stack, Typography, InputAdornment } from "@mui/material";

interface FrequencyProps {
  value: Number;
  updateFrequency: Function;
}

const Frequency: React.FC<FrequencyProps> = (props: FrequencyProps) => {
  const [value, setValue] = useState(props.value);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get("frequency") !== "") {
      let value = String(data.get("frequency"));
      setValue(parseFloat(value));
    } else {
      console.log("no frequency data was entered");
    }
  };

  useEffect(() => {
    props.updateFrequency(value);
  }, [value, props]);

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
      >
        <Typography variant="h6">Frequency</Typography>

        <TextField
          variant="outlined"
          name="frequency"
          type="number"
          size="small"
          style={{ width: 150 }}
          inputProps={{ step: "0.01" }}
          InputProps={{
            endAdornment: <InputAdornment position="end">MHz</InputAdornment>,
          }}
          defaultValue={value}
        />

        <Button
          variant="contained"
          size="large"
          type="submit"
        >
          Set Frequency
        </Button>
      </Stack>
    </form>
  );
};

export default Frequency;

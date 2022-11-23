import React from "react";
import { Button, TextField, Stack, Box } from "@mui/material";

interface ModuleProps {
  value: Number;
}

const Frequency: React.FC<ModuleProps> = (props: ModuleProps) => {
  const [value, setValue] = React.useState(props.value);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      frequency: data.get("frequency"),
    });
  };

  return (
    <>
      <Stack direction="row" spacing={2} alignItems="center">
        <Stack>
          <h3>Frequency</h3>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          alignItems="stretch"
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField variant="outlined" placeholder={"75"} name="frequency" type="number" />
          <Button variant="contained" size="large" type="submit">
            Set Frequency
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default Frequency;

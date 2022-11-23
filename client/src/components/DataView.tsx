import React from "react";
import { Box } from "@mui/material";

interface ModuleProps {
  title?: String;
  value?: Object;
}

const DataView: React.FC<ModuleProps> = (props: ModuleProps) => {
  const [value, setValue] = React.useState(props.value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Box>
        {/* Module Title */}
        <h3>{props.title || "Module"}</h3>

        {/* Placeholder for Data Log */}
        <Box
          sx={{
            width: "100%",
            height: "30vh",
            backgroundColor: "black",
          }}
        ></Box>
      </Box>
    </>
  );
};

export default DataView;

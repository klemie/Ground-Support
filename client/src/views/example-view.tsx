import React from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function TextButtons() {
    return (
        <Stack direction="row" spacing={2}>
            <Button variant="contained">Primary</Button>
            <Button disabled variant="contained">Disabled</Button>
            <Button href="#text-buttons" variant="contained">Link</Button>
        </Stack>
    );
}

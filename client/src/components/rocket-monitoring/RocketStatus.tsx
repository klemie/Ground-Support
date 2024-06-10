import { Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface IRocketStatusProps {
}

const RocketStatus: React.FC = (props: IRocketStatusProps) => {
    const {} = props;
    return (
        <Paper
            sx={{     
                borderRadius: 2,
                padding: 2
            }}
        >
            <h1>Rocket Status</h1>
        </Paper>
    );
}

export default RocketStatus;
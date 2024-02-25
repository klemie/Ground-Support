import { Chip, Grid, Paper, Stack, Switch, Tooltip, Typography, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';

import SensorsIcon from '@mui/icons-material/Sensors';

const ResponseType = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1A2027',
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    width: "90%",
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


interface IProps {
  // props
}

const InstrumentationPanel: React.FC<IProps> = (props: IProps) => {
    // state
    const [data, setData] = useState<any>(null);

    // render
    return (
        <Stack spacing={2} width={'100%'}>
            <Paper elevation={2} sx={{ padding: 2 }}>
                <Stack direction="row" alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction="row" alignItems={'center'} spacing={2}>
                        <SensorsIcon color={'primary'} /> 
                        <Typography align='left' variant='h6'>
                            Instrumentation
                        </Typography>
                    </Stack>
                </Stack>
            </Paper>
            <Paper
                elevation={2}
                sx={{ padding: 2, height: '100%' }}
            >
            </Paper>
        </Stack>
    );
};

export default InstrumentationPanel;
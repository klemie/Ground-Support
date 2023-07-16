import { Card, CardContent, CardHeader, Grid, Stack, TextField } from '@mui/material';
import { Typography, Box, Tabs, Tab, Button, Icon, Paper } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header, { Breadcrumb } from '../components/Header';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useCallback } from 'react';
interface Props {
    DataConfigID: string;
}

export default function DataConfigView(props: Props) {
    const { DataConfigID } = props;
    const breadCrumbs: Breadcrumb[] = [
        { name: 'Rocket Selection', path: '/', active: false },
        { name: 'Rocket Details', path: '/', active: false },
        { name: 'Data Configuration', path: '/', active: true }
    ];

    const getDataConfig = useCallback(async () => {
        console.log(DataConfigID)
        try {
            const response = await axios.get(`http://127.0.0.1:9090/dataConfig/${DataConfigID}`);
            const data = response.data.result;
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getDataConfig();
    }, []);

    return (
            <div>   
                <Grid item>
                    <Header breadCrumbs={breadCrumbs} />
                </Grid>
                <Grid item>
                    <Paper elevation={2} sx={{ padding: 2}}>
                        <Stack direction="row" spacing={2}
                        alignItems={'center'}>
                        <RocketLaunchIcon color={'primary'} />
                            <Typography marginX={"2rem"} marginY={"1rem"} align='left' variant='h6'>
                                {/* {dataConfig?.Name || 'Rocket Not found'} */}
                            </Typography>
                        </Stack>
                    </Paper>
                </Grid>
            </div>
        );  
    };
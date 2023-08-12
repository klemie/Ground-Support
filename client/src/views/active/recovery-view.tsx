import React, {  useState } from 'react';
import Header, { Breadcrumb } from "../../components/Header";
import { Card, CardContent, CardHeader, Grid, Icon, Paper, Stack, TextField, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

// Icons
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useActiveMission } from '../../utils/ActiveMissionContext';

export default function RecoveryView() {
	const breadCrumbs: Breadcrumb[] = [
		{ name: "New Mission", path: "/", active: false },
		{ name: "Recovery", path: "/", active: true }
	];

    const activeContext = useActiveMission();

	return (
		<Grid 
			container 
			direction="column" 
			paddingX="2rem" 
			paddingY="2rem" 
			gap={3}
		>
			<Grid container>
				<Header breadCrumbs={breadCrumbs} />
			</Grid>
            <Grid item>
                <Paper elevation={2} sx={{ padding: 2 }}>
                    <Stack direction="row" spacing={5} justifyContent={'space-between'} alignItems={'center'}>
                        <Stack direction="row" alignItems={'center'} spacing={2}>
                            <RocketLaunchIcon color={'primary'} /> 
                            <Typography align='left' variant='h6'>
                                {activeContext.activeMission.Name || 'Mission Not found'}
                            </Typography>
                        </Stack>
                    </Stack>
                </Paper>
            </Grid>
			<Grid 
				item
			>
                <Card>
                    <CardHeader title="Recovery Details" />
                    <CardContent>
                        <Stack direction={'column'} gap={2}>
                        <TextField 
                            id="Launch-Location" 
                            label="Launch Location"
                            value={90.13249} 
                            variant="outlined" 
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FlightTakeoffIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField 
                            id="Recovery-Location" 
                            label="Recovery Location"
                            value={90.13249} 
                            variant="outlined" 
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FlightLandIcon />
                                    </InputAdornment>
                                )
                            }}
                            />
                        </Stack>
                    </CardContent>
                </Card>
			</Grid>
		</Grid>
	);
}

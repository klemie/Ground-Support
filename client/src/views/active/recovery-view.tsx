import React, {  useState } from 'react';
import Header, { Breadcrumb } from "../../components/Header";
import { Card, CardContent, CardHeader, Grid, Icon, Modal, Paper, Stack, TextField, Typography, IconButton, CardActions, Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';


// Icons
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { useActiveMission } from '../../utils/ActiveMissionContext';
import GoogleMapReact, { MapOptions } from 'google-map-react';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import RocketIcon from '@mui/icons-material/Rocket';
import PinDropIcon from '@mui/icons-material/PinDrop';
import Longitude from '../../utils/Longitude.svg';
import Latitude from '../../utils/Latitude.svg'
import longLat from '../../utils/coordnates-graphic.png';
import InfoIcon from '@mui/icons-material/Info';

export default function RecoveryView() {
	const breadCrumbs: Breadcrumb[] = [
		{ name: "New Mission", path: "/", active: false },
		{ name: "Recovery", path: "/", active: true }
	];

    const [detailsOpen, setDetailsOpen] = useState(false);

    const activeContext = useActiveMission();

    const defaultProps = {
        center: {
          lat: activeContext.activeMission.Coordinates.Latitude || 28.538336,
          lng: activeContext.activeMission.Coordinates.Latitude || -81.202853
        },
        zoom: 11
      };
      
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
            <Grid item width={'100%'} height={'60vh'} display={'flex'}>
                <Card 
                    sx={{ 
                        maxWidth: 250, 
                        position: 'relative' 
                    }}
                    >
                    <CardHeader title="Recovery Details" />
                    <CardContent>
                        <Stack direction={'row'}>

                        </Stack>
                        <Stack direction={'column'} gap={2}>
                            <Stack direction={'row'} gap={1}>
                                <RocketLaunchIcon />
                                Launch Location
                            </Stack>
                            <Stack direction={'row'} gap={2}>
                                <TextField 
                                    id="Launch-Location-Lat" 
                                    label="Latitude"
                                    value={activeContext.activeMission.Coordinates.Latitude} 
                                    variant="outlined" 
                                />
                                <TextField 
                                    id="Launch-Location-long" 
                                    label="Longitude"
                                    value={activeContext.activeMission.Coordinates.Longitude} 
                                    variant="outlined" 
                                />
                            </Stack>
                            <Stack direction={'row'} gap={1}>
                                <RocketIcon />
                                Recovery Location
                            </Stack>
                            <Stack direction={'row'} gap={2}>
                                <TextField 
                                    id="Launch-Location-Lat" 
                                    label="Latitude"
                                    value={'N/a'} 
                                    variant="outlined" 
                                />
                                <TextField 
                                    id="Launch-Location-long" 
                                    label="Longitude"
                                    value={'N/a'} 
                                    variant="outlined" 
                                />
                            </Stack>
                            
                        </Stack>
                    </CardContent>
                    <CardActions>
                        <IconButton onClick={() => setDetailsOpen(true)}>
                            <InfoIcon />
                        </IconButton>
                    </CardActions>
                </Card>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    // mapTypeId='terrain'
                    options={{
                        mapTypeId:'satellite'
                    }}
                >
                    <PinDropIcon color='error'></PinDropIcon>
                </GoogleMapReact>
            </Grid>
            <Dialog
                open={detailsOpen}
                onClose={() => setDetailsOpen(false)}
            >
                <DialogTitle>Coordinates Details</DialogTitle>
                <DialogContent>
                    <img src={longLat} style={{borderRadius: 5, maxWidth: 550}}/>
                    {/* <Stack direction={'row'} spacing={2}>
                        <Stack direction={'column'}>
                            <Typography variant={'h6'}>Longitude</Typography>
                            <img src={Longitude} alt="Longitude" width={400}></img>
                        </Stack>
                        <Stack direction={'column'}>
                            <Typography variant={'h6'}>Latitude</Typography>
                            <img src={Latitude} alt="Latitude" width={400}></img>
                        </Stack> */}
                    {/* </Stack> */}
                </DialogContent>
            </Dialog>
		</Grid>
	);
}

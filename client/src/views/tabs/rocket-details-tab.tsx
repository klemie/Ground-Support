import { Card, CardContent, CardHeader, Grid, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IRocket } from '../../utils/entities';
interface Props {
    rocketDetails: IRocket  
// Define the props for your view component
}
const RocketDetailsTab: React.FC<Props> = (props: Props) => {
const { rocketDetails } = props
    useEffect(() => {        
    // Perform any initialization or side effects here       
        return () => {           
        // Clean up any resources or subscriptions here
               
        };    
    }, []);    // Render your view component here    
   return (       
    <Stack>
            <Card>
                <CardHeader title="Rocket Profile" />
                <CardContent>
                    <Grid container spacing={4}>
                        <Grid item xs={4}>
                            <TextField fullWidth={true} label="Name"
                                defaultValue={rocketDetails.Name}
                                value={rocketDetails.Name}
                                variant="outlined" InputLabelProps={{ shrink: true}}/>
                                
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth={true} label="Height"
                                defaultValue={rocketDetails.Height}
                                value={rocketDetails.Height}
                                variant="outlined" InputLabelProps={{ shrink: true}}/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth={true} label="Mass"
                                defaultValue={rocketDetails.Mass}
                                value={rocketDetails.Mass}
                                variant="outlined" InputLabelProps={{ shrink: true}}/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth={true} label="Class"
                                defaultValue={rocketDetails.Class}
                                value={rocketDetails.Class}
                                variant="outlined" InputLabelProps={{ shrink: true}}/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth={true} label="Motor"
                                defaultValue={rocketDetails.Motor}
                                value={rocketDetails.Motor}
                                variant="outlined" InputLabelProps={{ shrink: true}}/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth={true} label="Motor Type"
                                defaultValue={rocketDetails.MotorType}
                                value={rocketDetails.MotorType}
                                variant="outlined" InputLabelProps={{ shrink: true}}/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Stack>   
   );
};

export default RocketDetailsTab;
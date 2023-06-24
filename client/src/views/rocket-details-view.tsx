import React, { useState, useEffect } from 'react';
import { Grid, Card, Typography, Box, Tabs, Tab } from '@mui/material';
import Header, { Breadcrumb } from '../components/Header';
import axios from 'axios';

import '../styles/rocketSelection.css';
import { IRocket } from '../utils/entities';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface IRocketDetails {
	result: IRocket;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
        {value === index && (
            <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
            </Box>
        )}
        </div>
        );
    }

interface RocketDetailsProps {
    rocketID: string;
}

export default function RocketDetailsView(props: RocketDetailsProps) {
	const colors: string[] = [
		'rgba(255, 197, 87, 1)',
		'rgba(214, 91, 79, 1)',
		'rgba(0, 94, 184, 1)',
		'rgba(69, 136, 201, 1)'
	];

	const breadCrumbs: Breadcrumb[] = [
		{ name: 'Rocket Selection', path: '/', active: false },
		{ name: 'Rocket Details', path: '/', active: true }
	];
	// const [rocketData, setRocketData] = useState<Rocket[]>([]);

    //value is for tab things
    const [value, setValue] = React.useState(0);

    const [rocketData, setRocketData] = useState<IRocket>();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
		async function getRocket() {
			//make an API call when component first mounts and setRocketData with response
			const response = await axios.get<IRocketDetails>(`http://127.0.0.1:9090/rocket/${props.rocketID}`);
            const rocket = response.data.result;
            
            const data: IRocket = {
                Name: rocket.Name,
                Missions: rocket.Missions,
                Components: rocket.Components,
                Mass: rocket.Mass,
                Height: rocket.Height,
                Class: rocket.Class,
                MotorType: rocket.MotorType,
                Motor: rocket.Motor
            }
            setRocketData(data);
        }
		getRocket();
	}, []);

	return (
		<div style={{ width: '100vw', height: '99vh' }}>
			<Grid
				container
				direction="column"
				paddingX="2rem"
				paddingY="2rem"
				gap={3}
				sx={{ height: '100%', width: '100%' }}
			>
				{/* Page Header */}
				<Grid item>
					<Header breadCrumbs={breadCrumbs} />
				</Grid>
                <Grid item>
					<Card>
                        <Typography marginX={"2rem"} marginY={"1rem"} align='left' variant='h6'>
                            {rocketData?.Name || 'Rocket Not found'}

                        </Typography>
                    </Card>
				</Grid>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange}>

                                <Tab label="Details" />
                                <Tab label="Components"  />
                                <Tab label="Missions" />

                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                             Details
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            Components
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            Missions
                        </TabPanel>

                    </Box>
                <Grid item>
                    
                </Grid>
			</Grid>
			<div>
				{colors.map((color) => {
					return (
						<div
							style={{
								backgroundColor: color,
								width: '25%',
								height: '1vh',
								float: 'left'
							}}
						/>
					);
				})}
			</div>
		</div>
	);
}
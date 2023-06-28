import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Card, Typography, Box, Tabs, Tab, Stack, Button, Icon, CardContent, Paper } from '@mui/material';
import Header, { Breadcrumb } from '../components/Header';
import axios from 'axios';

import '../styles/rocketSelection.css';
import { IRocket } from '../utils/entities';
import RocketDetailsTab from './tabs/rocket-details-tab';
import EditIcon from '@mui/icons-material/Edit';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import RocketProfilePopup from '../components/RocketProfilePopup';
import _, { delay } from 'lodash';

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


    //value is for tab things
    const [value, setValue] = useState<number>(0);

    enum MotorType {
        solid = "Solid",
        liquid = "Liquid",
        hybrid = "Hybrid"
    };

    const [rocketData, setRocketData] = useState<IRocket>({
        Name:"", 
        Mass:0, 
        Motor:"",
        Height:0, 
        Class: "", 
        Missions:[], 
        Components:[], 
        MotorType:MotorType.solid
    });

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSave = () => {
        _.delay(getRocket, 500);
        handleClose();
    }

    const getRocket = useCallback(async () => {
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
    }, [props.rocketID]);

    useEffect(() => {
		getRocket();
	}, [getRocket]);

    const [isOpen, setIsOpen] = useState(false);
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
					<Paper elevation={2} sx={{ padding: 2 }}>
                        <Stack direction="row" spacing={2} alignItems={'center'}>
                            <RocketLaunchIcon color={'primary'} /> 
                            <Typography marginX={"2rem"} marginY={"1rem"} align='left' variant='h6'>
                            {rocketData?.Name || 'Rocket Not found'}
                            </Typography>
                        </Stack>
                    </Paper>
				</Grid>
                    <Box sx={{ width: '100%' }}>
                        <Stack spacing={2} direction={"row"}>
                            <Paper sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange}>
                                    <Tab label="Details" />
                                    <Tab label="Components"  />
                                    <Tab label="Missions" />
                                </Tabs>
                            </Paper>
                            {value===0 && (
                                <Button variant="contained" startIcon={<EditIcon/>} onClick={()=>setIsOpen(true)}>
                                    Edit
                                </Button>
                            )}
                        </Stack>
                        
                        <TabPanel value={value} index={0}>
                             <RocketDetailsTab rocketDetails={rocketData}></RocketDetailsTab>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            Components
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            Missions
                        </TabPanel>

                    </Box>
                <Grid item>
                    <RocketProfilePopup isOpen={isOpen} onSave={handleSave} onClose={handleClose} rocketProfileId={props.rocketID}/>
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
import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Typography, Box, Tabs, Tab, Stack, Button, Paper } from '@mui/material';
import Header, { Breadcrumb } from '../components/Header';
import { IRocket } from '../utils/entities';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import axios from 'axios';
import _ from 'lodash';

//Tabs
import ComponentsTab from './Tabs/components-tab';
import RocketDetailsTab from './Tabs/rocket-details-tab';

// Popups
import ComponentModal from '../components/modals/ComponentModal';
import RocketProfilePopup from '../components/RocketProfilePopup';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface IRocketResponse {
	result: IRocket;
}

interface RocketDetails extends IRocket {
    Id?: string;
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
            <Box sx={{ paddingTop: 3 }}>
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
    const [rocketId, setRocketId] = useState<string>(props.rocketID);
    // component modal
	const [componentModalOpen, setComponentModalOpen] = useState<boolean>(false);

    enum MotorType {
        solid = "Solid",
        liquid = "Liquid",
        hybrid = "Hybrid"
    };

    const [rocketData, setRocketData] = useState<RocketDetails>({
        Id: props.rocketID,
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

    const handleRocketPopupClose = () => {
        setIsOpen(false);
    };

    const handleRocketPopupSave = () => {
        refresh();
        handleRocketPopupClose();
    }

    const refresh = () => {
        _.delay(getRocket, 500);
    }

    const getRocket = useCallback(async () => {
        const response = await axios.get<IRocketResponse>(`http://127.0.0.1:9090/rocket/${rocketId}`);
            const rocket = response.data.result;
            
            const data: RocketDetails = {
                Id: rocketId,
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
    }, [rocketId]);


    useEffect(() => {
		getRocket();
	}, [getRocket]);

    const [isOpen, setIsOpen] = useState(false);
	return (
		<Box sx={{ width: '100vw', height: '100vh' }}>
			<Stack
                height={'100%'}
                padding={3}
				direction="column"
				gap={3}
                overflow={'none'}
			>
				{/* Page Header */}
				<Grid item >
					<Header breadCrumbs={breadCrumbs} />
				</Grid>
                {/* Rocket Title */}
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
                <Grid item overflow={'scroll'}>
                    <Box sx={{ padding: 0.5 }}>
                        <Stack direction="row" spacing={3} justifyContent="flex-start">
                            <Paper sx={{ borderBottom: 1, borderColor: 'divider' }} >
                                <Tabs value={value} onChange={handleChange}>
                                    <Tab label="Details" />
                                    <Tab label="Components"  />
                                    <Tab label="Missions" />
                                </Tabs>
                            </Paper>
                             {value===1 && (
                                <Button variant="contained" startIcon={<AddIcon/>} onClick={()=>setComponentModalOpen(true)}>
                                    Component
                                </Button>
                            )}
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
                            <ComponentsTab rocket={rocketData} refresh={() => refresh} componentIds={rocketData?.Components || []} />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            Missions
                        </TabPanel>
                    </Box>
                </Grid>
                <Grid item>
                    <RocketProfilePopup isOpen={isOpen} onSave={handleRocketPopupSave} onClose={handleRocketPopupClose} rocketProfileId={props.rocketID}/>
                    <ComponentModal rocket={rocketData} isOpen={componentModalOpen} onSave={()=> refresh} onClose={() => setComponentModalOpen(false)}/>
                </Grid>
			</Stack>
			<div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
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
		</Box>
	);
}
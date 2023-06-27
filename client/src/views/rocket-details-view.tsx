import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Card, Typography, Box, Tabs, Tab, Button, Stack, Paper, Container } from '@mui/material';
import Header, { Breadcrumb } from '../components/Header';
import axios from 'axios';

import { IRocket } from '../utils/entities';
import ComponentsTab from './Tabs/components-tab';
import AddIcon from '@mui/icons-material/Add';
import ComponentModal from '../components/modals/ComponentModal';

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
    const [componentId, setComponentId] = useState<string>('');
    // component modal
	const [open, setOpen] = useState<boolean>(false);
	const handleClose = () => setOpen(false);

    const [rocketData, setRocketData] = useState<IRocket>();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const updateRocket = useCallback(async () : Promise<boolean> => {
        //make an API call to update the rocket
        const response = await axios.patch<IRocketDetails>(`http://127.0.0.1:9090/rocket/${rocketId}`, rocketData);
        const r = response.data.result;
        if (response.data.result) {
            const data: IRocket = {
                Name: r.Name,
                Missions: r.Missions,
                Components: r.Components,
                Mass: r.Mass,
                Height: r.Height,
                Class: r.Class,
                MotorType: r.MotorType,
                Motor: r.Motor
            }
            setRocketData(data);
            return true;
        }
        return false;
    }, [rocketData, rocketId]);

    const attachComponentToRocket = useCallback((id: string) => {
        setComponentId(id);
        setRocketData((rocketData) => {
            if (rocketData) {
                const newRocketData = { ...rocketData };
                if (componentId !== '')
                    newRocketData.Components.push(componentId);
                return newRocketData;
            }
            return rocketData;
        });
        debugger;
        console.log('attach component to rocket');
        console.log(componentId);
        updateRocket();
        setOpen(false);
    }, [updateRocket]);

    useEffect(() => {
		async function getRocket() {
			//make an API call when component first mounts and setRocketData with response
			const response = await axios.get<IRocketDetails>(`http://127.0.0.1:9090/rocket/${rocketId}`);
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
	}, [rocketId]);

	return (
		<Box sx={{ width: '100vw', height: '100vh' }}>
			<Stack
                padding={3}
				direction="column"
				gap={3}
                overflow={'none'}
			>
				{/* Page Header */}
				<Grid item >
					<Header breadCrumbs={breadCrumbs} />
				</Grid>
                <Grid item width={'100%'}>
					<Card>
                        <Typography marginX={"2rem"} marginY={"1rem"} align='left' variant='h6'>
                            {rocketData?.Name || 'Rocket Not found'}
                        </Typography>
                    </Card>
				</Grid>
                <Grid item overflow={'scroll'}>
                    <Box sx={{ width: '100%' }}>
                        <Stack direction="row" spacing={3} justifyContent="flex-start">
                            <Paper sx={{ borderBottom: 1, borderColor: 'divider' }} >
                                <Tabs value={value} onChange={handleChange}>
                                    <Tab label="Details" />
                                    <Tab label="Components"  />
                                    <Tab label="Missions" />
                                </Tabs>
                            </Paper>
                            {value===1 && (
                                <Button variant="contained" startIcon={<AddIcon/>} onClick={()=>setOpen(true)}>
                                    Component
                                </Button>
                            )}
                        </Stack>
                        <TabPanel value={value} index={0}>
                            Details
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <ComponentsTab refresh={updateRocket} componentIds={rocketData?.Components || []} />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            Missions
                        </TabPanel>
                    </Box>
                </Grid>
                <ComponentModal componentId={componentId} isOpen={open} onSave={attachComponentToRocket} onClose={handleClose}/>
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
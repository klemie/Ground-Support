import { useState, useEffect } from 'react';
import { IDataConfig, IMission } from '../../utils/entities';

import { Accordion, AccordionDetails, AccordionSummary, Grid, Stack, Typography, Paper, Button, useTheme } from '@mui/material';
import Header, { Breadcrumb } from '../../components/Header';
import ModuleSummary from '../../components/ModuleSummary';
import { useActiveMission } from '../../utils/ActiveMissionContext';
import api from '../../services/api';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DataUpload from '../../components/DataUpload';

export default function RocketSelectionView() {
    const [missionData, setMissionData] = useState<IMission>();
    const [dataConfigs, setDataConfigs] = useState<IDataConfig[]>([]);
    const [isDataUploadOpen, setIsDataUploadOpen] = useState<boolean>(false);
    const breadCrumbs: Breadcrumb[] = [
		{ name: missionData?.Name || "New Mission", path: "/", active: false },
		{ name: "Flight Report", path: "/", active: true }
	];

    const context = useActiveMission()
    useEffect(()=> {
        // reset state 
        setMissionData(undefined);
        setDataConfigs([]);

        const getDataConfigs = async () => {
            setMissionData(context.activeMission); 

            if (context.rocket.Components) { 
                context.rocket.Components.map(async(component) => {
                    if (!component.DataConfigId) return;
                    const response = await api.getDataConfig(component.DataConfigId)
                    const data = response.data as IDataConfig
                    console.log(data);
                    setDataConfigs((prev) => [...prev, data]);
                });
            }
        };
        getDataConfigs();
    }, [missionData]);


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
                            <Typography align='left' variant='h6'>
                                {context.activeMission.Name + ' Flight Report'|| 'Mission Not found'}
                            </Typography>
                        </Stack>
                        <Stack direction="row" alignItems={'center'} spacing={2}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                startIcon={<UploadFileIcon />}
                                onClick={() => setIsDataUploadOpen(true)}
                            >
                                Data
                            </Button>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                startIcon={<DownloadForOfflineIcon />}
                                onClick={() => {}}
                            >
                                Report
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Grid>
            <Grid container style={{ overflowY: 'scroll' }}>
                {dataConfigs.map((dataConfig: IDataConfig) => {
                    return dataConfig.Modules.map((module, idx) => {
                        return <ModuleSummary Index={idx} Module={module} />;
                    });
                })}
            </Grid>
            <DataUpload isOpen={isDataUploadOpen} onClose={() => setIsDataUploadOpen(false)} />
        </Grid>
    );
}
import { useState, useEffect } from 'react';
import { IDataConfig, IMission } from '../utils/entities';

import { Accordion, AccordionDetails, AccordionSummary, Grid, Stack, Typography } from '@mui/material';
import Header, { Breadcrumb } from '../components/Header';
import ModuleSummary from '../components/ModuleSummary';
import { useActiveMission } from '../utils/ActiveMissionContext';
import api from '../services/api';
import { Paper } from '@material-ui/core';

export default function RocketSelectionView() {
    const [missionData, setMissionData] = useState<IMission>();
    const [dataConfigs, setDataConfigs] = useState<IDataConfig[]>([]);
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
            <Grid item >
                <Typography variant='h4'>{missionData?.Name} Flight Report</Typography>
            </Grid>
            <Grid container style={{ overflowY: 'scroll' }}>
                {dataConfigs.map((dataConfig: IDataConfig) => {
                    return dataConfig.Modules.map((module) => {
                        return <ModuleSummary Module={module} />;
                    });
                })}
            </Grid>
        </Grid>
    );
}
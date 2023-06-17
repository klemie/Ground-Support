import React, { useState, useEffect } from 'react';
import { IComponent, IDataConfig, IMission } from '../utils/entities';
import axios from 'axios';
import { Grid, Stack, Typography } from '@mui/material';
import Header, { Breadcrumb } from '../components/Header';
import ModuleSummary from '../components/ModuleSummary';

interface FlightReportProps {
	missionId: string;
}

interface IMissionResponse {
    result: IMission;
}

interface IDataConfigResponse {
    result: IDataConfig;
}

interface IComponentResponse {
    result: IComponent;
}

export default function RocketSelectionView(props: FlightReportProps) {
    const { missionId } = props;
    const [missionData, setMissionData] = useState<IMission>();
    const [dataConfigs, setDataConfigs] = useState<IDataConfig[]>([]);
    const breadCrumbs: Breadcrumb[] = [
		{ name: missionData?.Name || "New Mission", path: "/", active: false },
		{ name: "Flight Report", path: "/", active: true }
	];
    useEffect(()=> {
        const getMissionData = async () => {
            console.log('mission id:', missionId)
            const response = await axios.get<IMissionResponse>(`http://127.0.0.1:9090/mission/${missionId}`);
            console.log('Mission response:', response.data.result)
            setMissionData(response.data.result);
            response.data.result.Components.map(async(component) => {
                console.log('component:', component)
                const componentResponse = await axios.get<IComponentResponse>(`http://127.0.0.1:9090/component/${component}`);
                const response = await axios.get<IDataConfigResponse>(`http://127.0.0.1:9090/dataConfig/${componentResponse.data.result.DataConfig}`);
                setDataConfigs((prev) => [...prev, response.data.result]);
                return componentResponse.data.result;
            });
        };

        const getDataConfig = async () => {
       

        };
        getMissionData();
        console.log('Mission Data:', missionData);

        getDataConfig();
    }, []);

    // Module Summaries
    const moduleSummaries = () => {
        dataConfigs.map((dataConfig: IDataConfig) => {
            return dataConfig.Modules.map((module) => {
                return <ModuleSummary Module={module} />
            });
        }); 
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
            <Grid container>
                <Typography variant='h2'>{missionData?.Name} Flight Report</Typography>
                <Stack spacing={5}>
                    {dataConfigs.map((dataConfig: IDataConfig) => {
                        return dataConfig.Modules.map((module) => {
                            return <ModuleSummary Module={module} />
                        });
                    })}
                </Stack>
            </Grid>

        </Grid>
    );
}
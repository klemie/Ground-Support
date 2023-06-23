import { useState, useEffect } from 'react';
import { IComponent, IDataConfig, IMission } from '../utils/entities';
import axios from 'axios';
import { Grid, Typography } from '@mui/material';
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
        // reset state 
        setMissionData(undefined);
        setDataConfigs([]);

        const getDataConfigs = async () => {
            const response = await axios.get<IMissionResponse>(`http://127.0.0.1:9090/mission/${missionId}`);
            setMissionData(response.data.result);
            response.data.result.Components.map(async(componentId) => {
                const componentResponse = await axios.get<IComponentResponse>(`http://127.0.0.1:9090/component/${componentId}`);
                const response = await axios.get<IDataConfigResponse>(`http://127.0.0.1:9090/dataConfig/${componentResponse.data.result.DataConfig}`);
                setDataConfigs((prev) => [...prev, response.data.result]);
                return componentResponse.data.result;
            });
        };

        getDataConfigs();
        console.log('Mission Data:', missionData);

    }, [missionId, missionData]);


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
            <Grid container style={{ height: '80vh', overflowY: 'scroll' }}>
                {dataConfigs.map((dataConfig: IDataConfig) => {
                    return dataConfig.Modules.map((module) => {
                        return <ModuleSummary Module={module} />
                    });
                })}
            </Grid>
        </Grid>
    );
}
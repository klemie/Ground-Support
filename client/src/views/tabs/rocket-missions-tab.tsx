import { Card, CardContent, CardHeader, Grid, Stack, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { IMission, IRocket } from '../../utils/entities';
import MUIDataTable from 'mui-datatables';

interface RocketDetails extends IRocket {
    Id?: string;
}

interface MissionDetails extends IMission {
    Id?: string;
}

interface FormattedMissionData {
    Name: string;
    Date: Date;
    IsTest: string;
    Longitude: number;
    Latitude: number;
    LaunchAltitude: Number;
    Published: string;
    Components: string[];
}

interface MissionResponse {
    result: IMission;
}

interface ITableColumns {
    name: string;
    label: string;
    options: {
        filter: boolean;
        sort: boolean;
        viewColumns: boolean;
    }
}

interface Props {
    rocket: RocketDetails;
}

const RocketDetailsTab: React.FC<Props> = (props: Props) => {
    const { rocket } = props;
    const [ missions, setMissions ] = useState<FormattedMissionData[]>([]);

    // const getMissionIds = useCallback(async () => {
    //     try {
    //         const response = await axios.get(`localhost:9090/rockets/${rocket.Id}`);
    //         const data = response.data.result;
    //         setMissionIds(data.Missions);
    //     } catch(error) {
    //         console.log("error", error);
    //     }
    // }, [rocket.Id]);

    const getMissions = useCallback(async () => {
        // getMissionIds();
        console.log(rocket.Missions);
        rocket.Missions.map(async (missionId: string) => {
            console.log(missionId)
            try {
                const response = await axios.get<MissionResponse>(`http://127.0.0.1:9090/mission/${missionId}`);
                const data = response.data.result;
                const mission: FormattedMissionData = {
                    Name: data.Name,
                    Date: data.Date,
                    IsTest: String(data.IsTest),
                    Longitude: data.Coordinates.Longitude,
                    Latitude: data.Coordinates.Latitude,
                    LaunchAltitude: data.LaunchAltitude,
                    Published: String(data.Published),
                    Components: data.Components
                } 
                if (missions.length === 0) {
                    missions.push(mission);
                }
                setMissions((prev) => [...prev, mission]);
            } catch(error) {
                console.log(error);
            }
            console.log(missions)
        });
        return data;
    }, [missions, rocket.Missions]);

    useEffect(() => {
        // Reset data to prevent duplicates on re-render
        setMissions([]);
        getMissions();
        console.log("missions", missions);
    }, []);

    const columns: ITableColumns[] = [
        {
            name: "Name",
            label: "Name",
            options: {
                filter: true,
                sort: true,
                viewColumns: true,
            },
        },
        {
            label: "Launch Date",
            name: "Date",
            options: {
                filter: true,
                sort: true,
                viewColumns: true,
            }
        },
        {
            label: "Test",
            name: "IsTest",
            options: {
                filter: true,
                sort: true,
                viewColumns: true,
            }
        },
        {
            label: "Launch Latitude",
            name: "Latitude",
            options: {
                filter: true,
                sort: true,
                viewColumns: true,
            }
        },
        {
            label: "Launch Longitude",
            name: "Longitude",
            options: {
                filter: true,
                sort: true,
                viewColumns: true,
            }
        },
        {
            label: "Launch Altitude",
            name: "LaunchAltitude",
            options: {
                filter: true,
                sort: true,
                viewColumns: true,
            }
        },
        {
            name: "Published",
            label: "Published",
            options: {
                filter: true,
                sort: true,
                viewColumns: true,
            }
        },
    ];

    // Format data for table
    // const data = missionData.map((row) => {
    //     const updateRow = {
    //         ...row,
    //     };
    //     return updateRow;
    // });

    //needs to be database data at some point
    const data = [
        ["Pickles", "Yeet",  "Oho", "ehe", "orange", "42", "beepus"],
    ];

    return (
        <>
            <MUIDataTable
                title={"Missions"}
                options={{
                    filter: true,
                    filterType: 'checkbox',
                }}
                columns={columns}
                data={missions}
            />
        </>
    );
};

export default RocketDetailsTab;
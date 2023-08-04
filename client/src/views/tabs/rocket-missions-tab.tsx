import { Card, CardContent, CardHeader, Grid, Stack, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { IMission, IMissionPopulated, IRocket, IRocketPopulated } from '../../utils/entities';
import MUIDataTable from 'mui-datatables';



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
    rocket: IRocketPopulated;
}

const RocketDetailsTab: React.FC<Props> = (props: Props) => {
    const { rocket } = props;
    const [ missions, setMissions ] = useState<FormattedMissionData[]>([]);

    const getMissions = useCallback(async () => {
        rocket.Missions.map(async (mission: IMission) => {
            const m: FormattedMissionData = {
                Name: mission.Name,
                Date: mission.Date,
                IsTest: String(mission.IsTest),
                Longitude: mission.Coordinates.Longitude,
                Latitude: mission.Coordinates.Latitude,
                LaunchAltitude: mission.LaunchAltitude,
                Published: String(mission.Published),
                Components: mission.Components
            };
            if (missions.length === 0) {
                missions.push(m);
            }
            setMissions((prev) => [...prev, m]);
        });
    }, [missions, rocket.Missions]);

    useEffect(() => {
        setMissions([]);
        getMissions();
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
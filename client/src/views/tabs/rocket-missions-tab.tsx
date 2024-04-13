import React, { useCallback, useEffect, useState, useContext } from 'react';
import { IMission, IRocketPopulated } from '../../utils/entities';
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables';
import { useActiveMission } from '../../utils/ActiveMissionContext';

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
    onMissionClick: (mission: any) => void;
}

const RocketDetailsTab: React.FC<Props> = (props: Props) => {
    const { rocket, onMissionClick } = props;
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
    
    const activeMissionContext = useActiveMission()

    const options: MUIDataTableOptions = {
        filter: true,
        responsive: 'standard',
        onRowClick: (rowData: any[], rowMeta: { dataIndex: number, rowIndex: number }) => {
            console.log('Navigating to mission replay view');
            activeMissionContext.updateMission(rocket.Missions[rowMeta.dataIndex]);
            activeMissionContext.updateRocket(rocket);
            //What do I put here to get the new view?
            dataConfigClick={}
        }
    };

    

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
                options={options}
                columns={columns}
                data={missions}
            />
        </>
    );
};

export default RocketDetailsTab;

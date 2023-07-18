import { Card, CardContent, CardHeader, Grid, Stack, TableCell, TableRow, TextField } from '@mui/material';
import { Typography, Box, Tabs, Tab, Button, Icon, Paper } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header, { Breadcrumb } from '../components/Header';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useCallback } from 'react';
import MUIDataTable, { ExpandButton, MUIDataTableExpandButton, MUIDataTableOptions } from "mui-datatables";
import { IDataConfig } from '../utils/entities';

interface Props {
    DataConfigID: string;
}

interface IDataConfigResponse {
    result: IDataConfig;
}

export default function DataConfigView(props: Props) {
    const { DataConfigID } = props;
    const breadCrumbs: Breadcrumb[] = [
        { name: 'Rocket Selection', path: '/', active: false },
        { name: 'Rocket Details', path: '/', active: false },
        { name: 'Data Configuration', path: '/', active: true }
    ];

    const[dataConfig, setDataConfig] = useState<IDataConfig>({Modules:[]});
    const getDataConfig = useCallback(async () => {
        console.log(DataConfigID)
        try {
            const response = await axios.get<IDataConfigResponse>(`http://127.0.0.1:9090/dataConfig/${DataConfigID}`);
            const data = response.data.result;
            
            setDataConfig({ Modules: data.Modules })
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const columns = [
        {
            name: 'Module Name',
            options: { filter: false, },
        },
        {
            name: 'Number Of Fields',
            options: { filter: false, },
        },
    ];

    const data = dataConfig.Modules.map((module) => {
        return [
            module.Name, module.FieldGroups.length
        ]
    });

    const options: MUIDataTableOptions = {
      filter: true,
      filterType: 'dropdown' as any,
      responsive: 'standard',
      expandableRows: true,
      expandableRowsHeader: false,
      expandableRowsOnClick: true,
      selectableRows: undefined,
    //   rowsExpanded: [0],

      renderExpandableRow: (rowData: string | any[], rowMeta: any) => {
        const colSpan = rowData.length + 1;
        return (
        //   <TableRow>
        //     <TableCell colSpan={colSpan}>Custom expandable row option. Data: {JSON.stringify(rowData)}</TableCell>
        //   </TableRow>
            <TableRow>
                <TableCell colSpan={colSpan}>
                    <NestedTable module={dataConfig.Modules[rowMeta.dataIndex]} />
                </TableCell>
            </TableRow>

        );
      },
      onRowExpansionChange: (curExpanded: any, allExpanded: any, rowsExpanded: any) =>
        console.log(curExpanded, allExpanded, rowsExpanded),
    };

    const components = {
      ExpandButton: function(props: JSX.IntrinsicAttributes & MUIDataTableExpandButton) {
        if (props.dataIndex === 3 || props.dataIndex === 4) return <div style={{ width: '24px' }} />;
        return <ExpandButton {...props} />;
      },
    };

    useEffect(() => {
        getDataConfig();
    }, []);

    return (
            <div style={{width:'100vw',height:'100vw'}}>   
                <Stack
                    height={'100%'}
                    padding={3}
                    direction="column"
                    gap={3}
                    overflow={'none'}
                >
                <Grid item>
                    <Header breadCrumbs={breadCrumbs} />
                </Grid>

                <MUIDataTable
                    title={'Flight Computer Data Configure'}
                    data={data}
                    columns={columns}
                    options={options}
                    components={components}
                />
            </Stack>
        </div>
        );  
    };

function NestedTable({ module }: { module: any }) {
    return (
        <div style={{ display: 'flex' }}>
            {module.FieldGroups.map((fieldGroup: any, index: number) => (
                <div key={index} style={{ flex: 1, marginRight: '20px' }}>
                    <Typography variant="h6">Field Group {index + 1}</Typography>
                    <MUIDataTable
                        title={`Nested Table ${index + 1}`}
                        data={fieldGroup.Fields.map((field: any) => [field.Name, field.DataType])}
                        columns={[
                            {
                                name: 'Field Name',
                                options: { filter: false },
                            },
                            {
                                name: 'Data Type',
                                options: { filter: false },
                            },
                        ]}
                        options={{
                            filter: true,
                            filterType: 'dropdown' as any,
                            responsive: 'standard',
                        }}
                    />
                </div>
            ))}
        </div>
    );
}


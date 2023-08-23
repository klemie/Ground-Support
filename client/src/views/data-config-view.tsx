import { useEffect, useState, useCallback } from 'react';

// Components
import {
    Button,
    Grid,
    Stack,
    TableCell,
    TableRow
} from '@mui/material';
import MUIDataTable, {
    ExpandButton,
    MUIDataTableExpandButton,
    MUIDataTableOptions
} from "mui-datatables";
import Header, { Breadcrumb } from '../components/Header';

// Utils
import { IDataConfig } from '../utils/entities';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import api from '../services/api';

interface Props {
    DataConfigID: string;
    onClickBack: () => void;
}

export default function DataConfigView(props: Props) {
    const { DataConfigID, onClickBack } = props;
    const breadCrumbs: Breadcrumb[] = [
        { name: 'Rocket Selection', path: '/', active: false },
        { name: 'Rocket Details', path: '/', active: false },
        { name: 'Data Configuration', path: '/', active: true }
    ];

    const[dataConfig, setDataConfig] = useState<IDataConfig>({Modules: []} as IDataConfig);

    const getDataConfig = useCallback(async () => {
        const dataConfigResponse = await api.getDataConfig(DataConfigID);
        setDataConfig(dataConfigResponse.data as IDataConfig);
    }, [DataConfigID]);

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
      rowsExpanded: [0],

      renderExpandableRow: (rowData: string | any[], rowMeta: any) => {
        const colSpan = rowData.length + 1;
        return (
            <TableRow>
                <TableCell colSpan={colSpan}>
                    <NestedTable module={dataConfig.Modules[rowMeta.dataIndex]} />
                </TableCell>
            </TableRow>

        );
      }
    };

    const components = {
      ExpandButton: function(props: JSX.IntrinsicAttributes & MUIDataTableExpandButton) {
        if (props.dataIndex === 3 || props.dataIndex === 4) return <div style={{ width: '24px' }} />;
        return <ExpandButton {...props} />;
      },
    };

    useEffect(() => {
        getDataConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
            <div style={{width:'100vw',height:'100%'}}>   
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
                <Button
                    variant="contained" 
                    color="primary" 
                    onClick={onClickBack} 
                    startIcon={<NavigateBeforeIcon />}
                >
                    Back
                </Button>
            </Stack>
        </div>
        );  
    };

function NestedTable({ module }: { module: any }) {
    const fieldData = module.FieldGroups.map((fieldGroup: any) =>
        fieldGroup.Fields.map((field: any) => [
            field.Name,
            field.Units,
            JSON.stringify(field.Range),
        ])
    );

    const fieldColumns = [
        {
            name: 'Field',
            options: {
                filter: false,
                customHeadRender: () => (
                    <TableCell align="left">
                        <strong>Field</strong>
                    </TableCell>
                ),
            },
        },
        {
            name: 'Units',
            options: {
                filter: false,
                customHeadRender: () => (
                    <TableCell align="left">
                        <strong>Units</strong>
                    </TableCell>
                ),
            },
        },
        {
            name: 'Range',
            options: {
                filter: false,
                customHeadRender: () => (
                    <TableCell align="left">
                        <strong>Range</strong>
                    </TableCell>
                ),
            },
        },
    ];

    const fieldOptions: MUIDataTableOptions = {
        filter: true,
        filterType: 'dropdown',
        responsive: 'standard',
        selectableRows: undefined,
        search: false,
        download: false,
        print: false,
        viewColumns: false,
        pagination: false,
    };

    return (
        <Grid container style={{ width: '100%' }} justifyContent={'space-between'}>
            {module.FieldGroups.map((fieldGroup: any, index: number) => (
                <Grid key={index} item xs={10} sm={8} md={6} lg={4} style={{ padding: '8px' }}>
                    <MUIDataTable
                        title={fieldGroup.Name}
                        data={fieldData[index]}
                        columns={fieldColumns}
                        options={fieldOptions}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

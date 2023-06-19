import React from "react";
import { Stack, Typography, Container, Card } from "@mui/material";
import { IField, IFieldData, IFieldGroup, IModule } from "../utils/entities";
import MUIDataTable from "mui-datatables";
import Graph from "./RealTimeGraph";

interface ModuleSummaryProps {
    Module: IModule;
    Data?: IFieldData[];
};

const ModuleSummary: React.FC<ModuleSummaryProps> = (props: ModuleSummaryProps) => {
    const { Module, Data } = props;
    return (
        <Container>
            <Typography variant="h5" sx={{ paddingBlockEnd: 2 }}>{Module.Name}</Typography>
            <Stack direction={'column'} spacing={5}>
                {Module.FieldGroups.map((fieldGroup: IFieldGroup) => {
                    let data: any[][] = [];
                    let graphData: any[][] = [];
                    let cols: any[] = [];
                    let graphCols: any[] = [];
                    cols = fieldGroup.Fields.map((field: IField) => {
                        return {
                            name: field.Name,
                            label: field.Name,
                            options: {
                                filter: true,
                                sort: true,
                            }
                        };
                    });
                    graphCols = cols;
                    cols.unshift({
                        name: 'Time',
                        label: 'Time',  
                        options: {
                            filter: true,
                            sort: true,
                        }
                    });
                    for (let i = 0; i < 100; i++) {
                        let row: string[] = [];
                        for (let j =0; j < (cols.length-1); j ++) {
                            row.push(Math.random().toFixed(3));
                            console.log(row);
                        }
                        graphData.push(row);
                        row.unshift(i.toString());
                        data.push(row);
                    }
                    console.log(data);
                    return (
                        <Stack direction={'row'} alignItems={'center'}>
                            <MUIDataTable options={{elevation: 1, rowsPerPage: 5}} columns={cols} data={data} title={fieldGroup.Name}/>
                            <Graph fieldsToRender={cols.map(field => field.name)} module={Module} realTime={false} staticData={data}/>
                        </Stack>
                    );
                })}
            </Stack>
        </Container>
    );
}
export default ModuleSummary;
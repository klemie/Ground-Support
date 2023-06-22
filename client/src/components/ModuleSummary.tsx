import React from "react";
import { Stack, Typography, Container } from "@mui/material";
import { IFieldData, IFieldGroup, IModule } from "../utils/entities";
import MUIDataTable from "mui-datatables";
import Graph from "./RealTimeGraph";
import DataConstructor from '../utils/data-constructor';
 
interface ModuleSummaryProps {
    Module: IModule;
    Data?: IFieldData[];
};

const ModuleSummary: React.FC<ModuleSummaryProps> = (props: ModuleSummaryProps) => {
    const { Module, Data } = props;
    const data = new DataConstructor(Module).flightReportConstructor(true, true, 100);
    return (
        <Container>
            <Typography variant="h5" sx={{ paddingBlockEnd: 2 }}>{Module.Name}</Typography>
            <Stack direction={'column'} spacing={5}>
                {Module.FieldGroups.map((fieldGroup: IFieldGroup) => {
                    
                    return (
                        <Stack direction={'row'} alignItems={'center'}>
                            <MUIDataTable options={{elevation: 1, rowsPerPage: 5}} columns={data.table.cols} data={data.table.data} title={fieldGroup.Name}/>
                            <Graph dataKeys={data.graph.data} realTime={false} staticData={data.graph.data}/>
                        </Stack>
                    );
                })}
            </Stack>
        </Container>
    );
}
export default ModuleSummary;
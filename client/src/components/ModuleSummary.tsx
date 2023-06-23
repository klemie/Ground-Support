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
                {Module.FieldGroups.map((fieldGroup: IFieldGroup, index) => {
                    
                    return (
                        <Stack direction={'row'} alignItems={'center'}>
                            <MUIDataTable 
                                options={{elevation: 1, rowsPerPage: 5}} 
                                columns={data.table.cols[index]} 
                                data={data.table.data[index]} 
                                title={fieldGroup.Name}
                            />
                            <Graph 
                                dataKeys={data.graph.keys[index]} 
                                realTime={false} 
                                staticData={data.graph.data[index]}
                            />
                        </Stack>
                    );
                })}
            </Stack>
        </Container>
    );
}
export default ModuleSummary;
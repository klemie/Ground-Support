import React from "react";
import { Stack, Typography, Container } from "@mui/material";
import { IField, IFieldData, IFieldGroup, IModule } from "../utils/entities";
import MUIDataTable from "mui-datatables";

interface ModuleSummaryProps {
    Module: IModule;
    Data?: IFieldData[];
};

const ModuleSummary: React.FC<ModuleSummaryProps> = (props: ModuleSummaryProps) => {
    const { Module, Data } = props;
    return (
        <Container>
            <Typography variant="h3">{Module.Name}</Typography>
            <Stack direction={'row'}>
                {Module.FieldGroups.map((fieldGroup: IFieldGroup) => {
                    const fieldNames = fieldGroup.Fields.map((field: IField) => field.Name);
                    console.log(Module, fieldNames)
                    return <MUIDataTable columns={fieldNames} data={[fieldNames]} title={fieldGroup.Name}/>
                })}
            </Stack>
        </Container>
    );
}
export default ModuleSummary;
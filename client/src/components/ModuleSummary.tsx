import React from "react";
import { Stack, Typography, Container, AccordionDetails, AccordionSummary, Accordion, Paper, useTheme } from "@mui/material";
import { IFieldData, IFieldGroup, IModule } from "../utils/entities";
import MUIDataTable from "mui-datatables";
import Graph from "./RealTimeGraph";
import DataConstructor from '../utils/data-constructor';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SensorsIcon from '@mui/icons-material/Sensors';
import ScienceIcon from '@mui/icons-material/Science';

interface ModuleSummaryProps {
    Module: IModule;
    Data?: IFieldData[];
    Index: number;
};

const ModuleSummary: React.FC<ModuleSummaryProps> = (props: ModuleSummaryProps) => {
    const { Module, Data, Index } = props;
    const data = new DataConstructor(Module).flightReportConstructor(true, true, 100);
    const uvrColors =['uvr.yellow', 'uvr.red', 'uvr.lightBlue', 'uvr.darkBlue'];
    return (
        <Container>
            <Paper elevation={2} sx={{ marginY: 2, padding: 2, backgroundColor: uvrColors[Index]  }}>
                <Stack direction="row" justifyContent={'space-between'} alignItems={'center'} spacing={2}>
                    <Typography align='left' variant='h6'>
                        {Module.Name || 'Mission Not found'}
                    </Typography>
                    <SensorsIcon />
                </Stack>
            </Paper>        
        <Stack direction={'column'} spacing={0}>
            {Module.FieldGroups.map((fieldGroup: IFieldGroup, index) => {
                return (
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography variant='body1'>{fieldGroup.Name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
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
                        </AccordionDetails>
                    </Accordion>
                
                );
                })}
            </Stack>
        </Container>
    );
}
export default ModuleSummary;
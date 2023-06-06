import React from 'react';
import { Chip, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Module, { Field } from './Module';

// interface ComponentDocumentationProps {

// }

interface PropsDocumentation {
    Name: string;
    Description: string;
    Required: boolean;
    Type: string;
}

const ComponentDocumentation: React.FC = () => {
    const field: Field = {
        module: "module",
        fieldName: "Module Demo",
        fieldRange: [3,4],
        fieldValue: 34
    };

    return (
        <Grid container spacing={2}>
            <Grid item >
                <Typography variant='h5'>
                    Module
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Paper variant="outlined" sx={{ padding: 3 }}>A Module is a component that displays real time data in a textfield</Paper>

            </Grid>
            <Grid item xs={12}>
                <Paper sx={{ padding: 3 }} variant="outlined">
                    {/* Slot/Placeholder */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Module title='Module' fields={[field]}/>
                    </div>
                </Paper>
            </Grid>
            <Grid item>
                <Typography variant='h5'>
                    Props
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Paper variant="outlined">
                    {/* Table */}
                    <TableContainer>
                        <Table>
                            <TableHead sx={{ backgroundColor: "rgba(245, 245, 245, 1)" }}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Required</TableCell>
                                    <TableCell>Type</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            <TableRow>
                                <TableCell><strong>Title</strong></TableCell>
                                <TableCell>Name of the Module will appear in the header section</TableCell>
                                <TableCell><Chip sx={{ borderRadius: '5px' }} label='True' size='small'/></TableCell>
                                <TableCell><Chip sx={{ borderRadius: '5px' }} label='string' size='small'/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><strong>Module</strong></TableCell>
                                <TableCell>Name of the Module will appear in the header section</TableCell>
                                <TableCell><Chip sx={{ borderRadius: '5px' }} label='True' size='small'/></TableCell>
                                <TableCell><Chip sx={{ borderRadius: '5px' }} label='string' size='small'/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><strong>Module</strong></TableCell>
                                <TableCell>Name of the Module will appear in the header section</TableCell>
                                <TableCell><Chip sx={{ borderRadius: '5px' }} label='True' size='small'/></TableCell>
                                <TableCell><Chip sx={{ borderRadius: '5px' }} label='string' size='small'/></TableCell>
                            </TableRow>
                            {/* Add more table rows here */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default ComponentDocumentation;
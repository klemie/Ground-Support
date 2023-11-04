import React from 'react';
import { 
    Chip, 
    Grid, 
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Typography 
} from '@mui/material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type IComponentProps = {
    Name: string,
    Description: string,
    Required: boolean,
    Type: string
}

export interface DocumentationProps {
    Name: string;
    Description: string;
    Component: React.ReactNode;
    ComponentProps: IComponentProps[];
    UseCase: string;
}

const ComponentDocumentation: React.FC<DocumentationProps> = (props: DocumentationProps) => {
    return (
        <Grid container spacing={2}>
            <Grid item >
                <Typography variant='h5'>
                    {props.Name}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Paper variant="outlined" sx={{ padding: 3 }}>{props.Description}</Paper>

            </Grid>
            <Grid item xs={12}>
                <Paper sx={{ padding: 3 }} variant="outlined">
                    {/* Slot/Placeholder */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        {props.Component}
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
                                {props.ComponentProps.map((prop) => {
                                    return(
                                        <TableRow>
                                            <TableCell><strong>{ prop.Name }</strong></TableCell>
                                            <TableCell>{ prop.Description }</TableCell>
                                            <TableCell><Chip sx={{ borderRadius: '5px' }} label={ prop.Required ? '✅' : '❌' } size='small'/></TableCell>
                                            <TableCell><Chip sx={{ borderRadius: '5px' }} label={ prop.Type } size='small'/></TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
            <Grid item>
                <Typography variant='h5'>
                    Use Case
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <SyntaxHighlighter language="javascript" style={oneDark}>
                    {props.UseCase}
                </SyntaxHighlighter>
            </Grid>
        </Grid>
    );
};

export default ComponentDocumentation;
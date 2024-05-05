import { Box, Card, CardContent, CardHeader, Grid, Paper, Stack, Typography } from "@mui/material";
import { ViewKeys, useViewProvider } from "../utils/viewProviderContext";

import GroundSupportDarkMode from "../static/images/groundSupportDarkMode.svg";
import MonitoringSystemLogo from "../static/images/MonitoringSystemLogo.svg"

import Header, { Breadcrumb } from "../components/Header";
import { motion } from 'framer-motion';

const PlatformSelector: React.FC = () => {
    const breadCrumbs: Breadcrumb[] = [
		{ name: "Ground Support", viewKey: ViewKeys.PLATFORM_SELECTION_KEY, active: true }
	];
    const viewProviderContext = useViewProvider();
    return (
        <Stack padding={2} alignItems={'flex-start'}>
            <Header icon='PLATFORM_HUB' breadCrumbs={breadCrumbs} />
            <Grid 
                direction="row"
                spacing={5}
                rowGap={2}
                columnGap={5}
                container
                sx={{
                    minWidth: "100%",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center"
                }}
                alignItems="center"
            >
                <motion.div
                    whileHover={{ scale: 1.10 }}
                    transition={{ type: "spring", stiffness: 100, damping: 10, bounce: 0 }}
                >      
                    <Card
                        sx={{ padding: 1, cursor: "pointer" }}
                        onClick={() => {
                            viewProviderContext.updateViewKey(ViewKeys.ROCKET_SELECT_KEY)
                        }}
                    >
                        <CardHeader  
                            title={
                                <Stack direction={'row'} columnGap={1.5} alignItems="center" >
                                    <img height={40} src={GroundSupportDarkMode}/>
                                    <Typography 
                                        color="text.primary"
                                        variant="h6"
                                        fontWeight={600}
                                    >
                                        Rocket Monitoring 
                                    </Typography> 
                                </Stack>
                            }
                        />
                    </Card>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "just", stiffness: 100, damping: 10, bounce: 0 }}
                >
                    <Card sx={{ padding: 1}}>
                        <CardHeader 
                            title={
                                <Stack direction={'row'} columnGap={1.5} alignItems="center" >
                                    <img height={40} src={MonitoringSystemLogo}/> 
                                    <Typography 
                                        color="text.primary"
                                        variant="h6"
                                        fontWeight={600}
                                    >
                                        Engine Monitoring 
                                    </Typography>
                                </Stack>
                            } 
                        />
                    </Card>
                </motion.div>
            </Grid>
        </Stack>
    );
}

export default PlatformSelector;
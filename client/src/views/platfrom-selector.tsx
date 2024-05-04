import { Box, Card, CardContent, CardHeader, Grid, Paper, Stack } from "@mui/material";
import { ViewKeys, useViewProvider } from "../utils/viewProviderContext";
import GroundSupportDarkMode from "../static/images/groundSupportDarkMode.svg";
import MonitoringSystemLogo from "../static/images/MonitoringSystemLogo.svg"

interface IPlatformSelectorProps {
    setCurrentView?: () => void;
    setPlatformID?: (platformID: string) => void;
}

const PlatformSelector: React.FC<IPlatformSelectorProps> = (props:IPlatformSelectorProps) => {

    const viewProviderContext = useViewProvider();
    return (
        <Grid 
            direction="row"
            spacing={5}
            rowGap={2}
            columnGap={5}
            sx={{
                minWidth: "100%",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center"
            }}
            alignItems="center"
        >
            <Card
                onClick={() => {
                    viewProviderContext.updateViewKey(ViewKeys.ROCKET_SELECT_KEY)
                }}
            >
                <CardHeader  title={<img height="40" src={GroundSupportDarkMode}/>}/>
            </Card>
            <Card>
                <CardHeader  title={<img height="40" src={MonitoringSystemLogo}/>}/>
            </Card>
        </Grid>
    );
}

export default PlatformSelector;
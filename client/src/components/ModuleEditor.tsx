import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, Tab, Tabs, TextField, Tooltip, Typography } from "@mui/material";
import { IField, IModule } from "../utils/entities";
import { useCallback, useState } from "react";
import PlusIcon from '@mui/icons-material/Add'
import MinusIcon from '@mui/icons-material/Remove'

interface IModuleEditorProps {
    // No module when opened from ComponentCard.tsx
    // Module populuated when opened from data-config-view.tsx, so we can edit as specified
    // OR no module if adding new module from data-config-view.tsx
    moduleID?: string;
    moduleName?: string;
    mode: "New" | "Edit";
    isOpen: boolean;
    onClose: () => void; // TODO
}

interface ITabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface IFieldDisplayProps {
    numFields: number
    fields?: IField[]
}
  
const TabPanel = (props: ITabPanelProps) => {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

const FieldDisplay = (props:IFieldDisplayProps) => {
    return (
        <Stack direction={"column"} spacing={3}>
            <Stack direction={"row"} spacing={1}>
                <TextField label="Name" size="small"/>
                <TextField label="Range" size="small"/>
                <TextField label="Units" size="small"/>
                <TextField label="ID" size="small"/>
                <Tooltip title="Remove Field"><IconButton><MinusIcon/></IconButton></Tooltip>
            </Stack>
        </Stack>
    )
}

const ModuleEditor = (props: IModuleEditorProps) => {
    let { moduleID, moduleName, mode, isOpen, onClose } = props;
    
    const[tabContent, setTabContent] = useState(0);
    const[module, setModule] = useState<IModule>({Name:"null", FieldGroups: []} as IModule);
    
    const getModule = useCallback(async () => {
        // Configure appropriate api verbs for CRUD on modules

        // const dataConfigResponse = await api.getModule(moduleID || "null");
        // setModule(dataConfigResponse.data as IDataConfig);
    }, [moduleID]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabContent(newValue);
    };

    const handleNewFieldGroup = () => {
        console.log("Creating New Field Group")
    }

    const handleNewField = () => {
        console.log("Creating New Field")
    }

    return (
        <Dialog open={isOpen} fullWidth maxWidth={"md"} PaperProps={{sx:{minHeight: "80vh"}}}>
            <DialogTitle marginTop={1}>
                <Typography variant="h5">{mode} {moduleName || "Module"}</Typography>
            </DialogTitle>
            <DialogContent>
                <Stack direction={"row"} justifyContent={"space-evenly"} minHeight={"60vh"}>
                    
                    {/*Left Selection Pane ("Field Groups")*/}
                    <Box sx={{background: "#22272e", borderRadius: 1}} marginRight={1}>
                        
                        {/*Left Header Bar*/}
                        <Stack 
                            direction={"row"} 
                            margin={1}
                            spacing={1}
                            padding={1}
                            paddingLeft={2}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            sx={{
                                background: "#474b51",
                                borderRadius: 1,
                                whiteSpace: "nowrap",
                            }}>
                            <Typography variant="subtitle1">Field Groups</Typography>
                            <Tooltip title="New Field Group"><IconButton onClick={handleNewFieldGroup}><PlusIcon/></IconButton></Tooltip>
                        </Stack>

                        <Tabs orientation={"vertical"} value={tabContent} onChange={handleTabChange} centered>
                            <Tab label="Altitude"/>
                            <Tab label="Temperature"/>
                        </Tabs>
                        
                    </Box>

                    {/*Right Editor Pane ("Fields")*/}
                    <Box sx={{background: "#22272e", borderRadius: 1}}>
                        
                        {/*Right Editor Header Bar*/}
                        <Stack 
                            direction={"row"} 
                            margin={1}
                            spacing={1}
                            padding={1}
                            paddingLeft={2}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            sx={{
                                background: "#474b51",
                                borderRadius: 1,
                                whiteSpace: "nowrap",
                            }}>
                            <Typography variant="subtitle1">Fields</Typography>
                            <Tooltip title="New Field"><IconButton onClick={handleNewField}><PlusIcon fontSize="medium"/></IconButton></Tooltip>
                        </Stack>

                        {/*Right Editor Contents*/}
                        {/*The index of a TabPanel assigns it to the respective Tab in the left panel*/}
                        <TabPanel value={tabContent} index={0}>
                            <FieldDisplay numFields={2}/>
                        </TabPanel>

                        <TabPanel value={tabContent} index={1}>
                            <FieldDisplay numFields={2}/>
                        </TabPanel>
                    </Box>
                </Stack>
            </DialogContent>
            <Stack direction={"row"} spacing={1} padding={3} justifyContent={"flex-end"} alignItems={"center"}>
                {/* Name: <br/><TextField size="small"/> */}
                <Button onClick={() => onClose()} variant="contained">Cancel</Button>
                <Button variant="contained">Save</Button>
            </Stack>
        </Dialog>
    )
}

export default ModuleEditor;
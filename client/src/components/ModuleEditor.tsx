import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, Tab, Tabs, TextField, Tooltip, Typography } from "@mui/material";
import { IField, IFieldGroup, IModule } from "../utils/entities";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import PlusIcon from '@mui/icons-material/Add'
import MinusIcon from '@mui/icons-material/Remove'
import api from "../services/api";
import React from "react";

interface IModuleEditorProps {
    // No module when opened from ComponentCard.tsx
    // Module populuated when opened from data-config-view.tsx, so we can edit as specified
    // OR no module if adding new module from data-config-view.tsx
    ModuleID?: string; // TODO re-eval when api calls are implemented
    mode: "New" | "Edit";
    isOpen: boolean;
    onClose: () => void; // TODO
}

let dummyFields1 = [
    { Name: 'x', Range: [-20, 20], Units: 'm/s^2', TelemetryId: 3 },
    { Name: 'y', Range: [-20, 20], Units: 'm/s^2', TelemetryId: 4 },
    { Name: 'x', Range: [-20, 20], Units: 'm/s^2', TelemetryId: 5 }
]

let dummyModule1: IModule = {
    Name: 'BME280',
    FieldGroups: [
        {
        Name: 'Altitude',
            Fields: [
                {
                    Name: 'Altitude',
                    Range: [0, 10000],
                    Units: 'm',
                    TelemetryId: 1
                }
            ]
        },
        {
        Name: 'Temperature',
            Fields: [
                {
                    Name: 'Temperature',
                    Range: [0, 100],
                    Units: 'deg',
                    TelemetryId: 2
                }
            ]
        }
    ]
}

let dummyModule2: IModule = {
    Name: 'LSM9DS1',
    FieldGroups: [
        {
        Name: 'Acceleration',
            Fields: [
                {
                    Name: 'x',
                    Range: [-20, 20],
                    Units: 'm/s^2',
                    TelemetryId: 3
                },
                {
                    Name: 'y',
                    Range: [-20, 20],
                    Units: 'm/s^2',
                    TelemetryId: 4
                },
                {
                    Name: 'z',
                    Range: [-20, 20],
                    Units: 'm/s^2',
                    TelemetryId: 5
                }
            ]
        },
        {
        Name: 'Gyroscope',
            Fields: [
                {
                    Name: 'x',
                    Range: [-180, 180],
                    Units: 'gyrs',
                    TelemetryId: 6
                },
                {
                    Name: 'y',
                    Range: [-180, 180],
                    Units: 'gyrs',
                    TelemetryId: 7
                }
            ]
        }
    ]
}

const ModuleEditor = (props: IModuleEditorProps) => {
    let { ModuleID, mode, isOpen, onClose } = props;
    
    // Have moduleID in props, then get module if !undefined and set our moduleObject === that module from api call
    // eg:  if (ModuleID) then async get module by ID
    //      else create default empty module and use in editor for "New Module"
    // Might have to create a new api route for modules? Or maybe can just send DataConfigID, ModuleName from ComponentCard/other places
    // then extract correct module from DataConfig for editing
    // This might be easier (but also more fiddly) but regardless I still want to edit on a per-module basis as editing the whole config at once is dumb
    
    // Right now using dummyobj since haven't implemented api module get, so
    const[moduleObject, setModuleObject] = useState<IModule>(dummyModule2);
    let moduleName = moduleObject.Name
    
    const[tabIndex, setTabIndex] = useState(0);
    const[currentFields, setCurrentFields] = useState<IField[]>(moduleObject.FieldGroups[tabIndex].Fields)
    
    const tabDisplayRef = useRef<HTMLDivElement>(null);
    const [tabScrollPosition, setTabScrollPosition] = useState<number>(0);

    useEffect(() => {
        // Ensures that when the tab index is updated, the tab display scroll stays the same
        // This is kinda janky but actually works really well, I'm sure there's better way of doing this though
        if (tabDisplayRef.current) {
            tabDisplayRef.current.scrollTop = tabScrollPosition
        }
    }, [tabIndex])
    
    const TabDisplay = (props: any) => {
        const fieldGroups = props.fieldGroups;

        const handleTabChange = (event: React.SyntheticEvent, newTabIndex: number) => { 
            setTabScrollPosition(tabDisplayRef.current?.scrollTop || 0)
            setTabIndex(newTabIndex)
        };

        return (
            <div ref={tabDisplayRef} style={{ overflow: "scroll", maxHeight: "45vh", direction: "rtl"}}>
                <Tabs orientation="vertical" value={tabIndex} onChange={handleTabChange}>
                    {fieldGroups.map((group:IFieldGroup, index:number) => (
                        <Tab label={group.Name} key={index} value={index} disableRipple/>
                    ))}
                </Tabs>
            </div>
        )
    }

    const FieldDisplay = (props:any) => {
        const fields = props.fields;
        return (
            <Stack direction={"column"} spacing={3} padding={2} maxHeight={"45vh"} sx={{overflow: "scroll"}}>
                {fields.map((field:IField, index:number) => (
                    <Stack direction={"row"} spacing={1}>
                        <TextField label="Name" defaultValue={field.Name || ""} size="small"/>
                        <Tooltip title={"[ lower, upper ]"} disableInteractive><TextField label="Range" defaultValue={`[ ${field.Range || ""} ]`} size="small"/></Tooltip>
                        <TextField label="Units" defaultValue={field.Units || ""} size="small"/>
                        <TextField label="ID" defaultValue={field.TelemetryId || ""} size="small"/>
                        <Tooltip title="Remove Field" disableInteractive onClick={() => handleEditFields("remove", index)}><IconButton><MinusIcon/></IconButton></Tooltip>
                    </Stack>
                ))}
            </Stack>
        )
    }

    const handleEditFieldGroups = (op:"add" | "remove") => {
        // Deref const object so we can edit and give to setModuleObject - neccessary because we're using state, otherwise no worky
        let moduleObjectRet:IModule = JSON.parse(JSON.stringify(moduleObject))
        setTabScrollPosition(tabDisplayRef.current?.scrollTop || 0)

        if(op === "add") {
            const emptyField:IField = {
                Name: '',
                Range: [0, 0],
                Units: '',
                TelemetryId: 0
            }
    
            const emptyFieldGroup:IFieldGroup = {
                Name: 'empty',
                Fields: [
                    emptyField
                ]
            }
    
            moduleObjectRet.FieldGroups.splice(tabIndex + 1, 0, emptyFieldGroup)
            setTabIndex(tabIndex + 1)  

        } else {
            if (moduleObject.FieldGroups.length > 1) {
                moduleObjectRet.FieldGroups.splice(tabIndex, 1);
                if(tabIndex > 0) {
                    setTabIndex(tabIndex - 1)
                }
            }
        }
        setModuleObject(moduleObjectRet)
    };

    const handleEditFields = (op:"add" | "remove", index:number) => {
        let moduleObjectRet:IModule = JSON.parse(JSON.stringify(moduleObject))
        if(op === "add") {
            const emptyField:IField = {
                Name: '',
                Range: [0, 0],
                Units: '',
                TelemetryId: 0
            }

            moduleObjectRet.FieldGroups[tabIndex].Fields.push(emptyField)
        } else {
            if(moduleObject.FieldGroups[tabIndex].Fields.length > 1) {
                moduleObjectRet.FieldGroups[tabIndex].Fields.splice(index, 1);
            }
        }
        setModuleObject(moduleObjectRet);
    };

    return (
        <Dialog open={isOpen} fullWidth maxWidth={"md"} PaperProps={{sx:{maxHeight: "80vh"}}}>
            <DialogTitle marginTop={1}>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                <Typography variant="h5">{mode} {moduleName || "Module"}</Typography>
                <TextField label={"Module Name"} defaultValue={moduleName || ""} size={"small"} required/>
                </Stack>
            </DialogTitle>

            <DialogContent sx={{overflow: "hidden"}}>
                <Stack direction={"row"} justifyContent={"space-evenly"} minHeight={"55vh"}>

                    {/*Left Selection Pane ("Field Groups")*/}
                    <Box sx={{background: "#22272e", borderRadius: 1}} marginRight={1}>
                        
                        {/*Left Header Bar*/}
                        <Stack 
                            direction={"row"} 
                            margin={1}
                            spacing={0.5}
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
                            <Tooltip title="New Field Group" disableInteractive><IconButton onClick={() => handleEditFieldGroups("add")}><PlusIcon/></IconButton></Tooltip>
                            <Tooltip title="Remove Current Field Group" disableInteractive><IconButton onClick={() => handleEditFieldGroups("remove")}><MinusIcon/></IconButton></Tooltip>
                        </Stack>
                        <TabDisplay fieldGroups={moduleObject.FieldGroups}/>
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
                            <Tooltip title="New Field" disableInteractive><IconButton onClick={() => handleEditFields("add", 0)}><PlusIcon fontSize="medium"/></IconButton></Tooltip>
                        </Stack>

                        {/*Right Editor Contents*/}
                        <FieldDisplay fields={moduleObject.FieldGroups[tabIndex].Fields}/>
                    </Box>

                </Stack>
            </DialogContent>

            <Stack direction={"row"} spacing={1} padding={3} justifyContent={"flex-end"} alignItems={"center"}>
                <Button onClick={() => onClose()} variant="contained">Cancel</Button>
                <Button variant="contained">Save</Button>
            </Stack>
        </Dialog>
    )
}

export default ModuleEditor;
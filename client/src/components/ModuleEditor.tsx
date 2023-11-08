import React, { useMemo } from "react";
import api from "../services/api";
import lodash from "lodash";
import { useEffect, useState } from "react";
import { IDataConfig, IField, IFieldGroup, IModule } from "../utils/entities";

import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, Tab, Tabs, TextField, Tooltip, Typography } from "@mui/material";
import PlusIcon from '@mui/icons-material/Add'
import MinusIcon from '@mui/icons-material/Remove'

interface IModuleEditorProps {
    dataConfigID: string;
    index?: number;
    mode: "New" | "Edit";
    isOpen: boolean;
    onClose: () => void;
};

const ModuleEditor = (props: IModuleEditorProps) => {
    const { dataConfigID, index, mode, isOpen, onClose } = props;

    const emptyModule:IModule = useMemo(() => ({
        Name: "",
        FieldGroups: [
            {
                Name: "New Group", 
                Fields: [
                    {Name: "", Range: [0,0], Units: "", TelemetryId: 0}
                ]
            }
        ]
    }), []);
        
    const emptyDataConfig:IDataConfig = useMemo(() => ({
        Modules: [emptyModule]
    }), [emptyModule]);
        
    const [dataConfig, setDataConfig] = useState<IDataConfig>(emptyDataConfig)
    const [moduleObject, setModuleObject] = useState<IModule>(emptyModule);
    const [namingPopupOpen, setNamingPopupOpen] = useState<boolean>(false);
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [saveModuleIndex, setSaveModuleIndex] = useState<number>(0);
    
    const [showValidationPopup, setShowValidationPopup] = useState<boolean>(false);
    const [validationMessage, setValidationMessage] = useState<string>("Error")

    // Not using state for this var to avoid rerender every time a field is edited. Instead, we save to currentFields, then write that
    // to the overall "moduleObject" when changing tabs or saving the module
    let currentFields:IField[] = moduleObject ? moduleObject.FieldGroups[tabIndex].Fields : emptyModule.FieldGroups[0].Fields;

    useEffect(() => {
        async function getDataConfig(dataConfigID:string) {
            const response = await api.getDataConfig(dataConfigID);
            const data = response.data as IDataConfig;

            setDataConfig({
                _id: dataConfigID,
                Modules: data.Modules
            });
        }
        
        if(dataConfigID) {
            getDataConfig(dataConfigID as string)
        }

    }, [dataConfigID]);

    useEffect(() => {
        if(dataConfig._id) {
            if (!dataConfig.Modules.length) {
                setSaveModuleIndex(0)
            } else if (mode === "New") {
                setSaveModuleIndex(dataConfig.Modules.length)
                setNamingPopupOpen(true)
            } else if (mode === "Edit") {
                setSaveModuleIndex(index || 0);
                setModuleObject(dataConfig.Modules[index || 0])
            }
        }
        // eslint-disable-next-line
    }, [dataConfig]);
    
    const TabDisplay = (props:any) => {
        // TODO
        // 1. Come up with better way to initialize new FieldGroup on start up
        //    eg. on new module, have "Name New Group" popup 
        const fieldGroups = props.fieldGroups;

        const handleTabChange = (_e:any, newTabIndex: number) => {
            let moduleObjectEdited = lodash.cloneDeep(moduleObject)
            moduleObjectEdited.FieldGroups[tabIndex].Fields = currentFields

            setTabIndex(newTabIndex)
            setModuleObject(moduleObjectEdited)
        };

        return (
            <div style={{ overflow: "scroll", maxHeight: "45vh", direction: "rtl"}}>
                <Tabs orientation="vertical" value={tabIndex} onChange={handleTabChange}>
                    {fieldGroups.map((group:IFieldGroup, index:number) => (
                        <Tab label={group.Name} key={index} value={index} disableRipple/>
                    ))}
                </Tabs>
            </div>
        )
    };

    const FieldDisplay = (props:any) => {
        // TODO 
        // 1. Split range into two fields - DONE!
        // 2. Set telemetryID to have binary type - Fuck!
        // 3. Type checking (number) for range fields

        const fields = props.fields;
        
        const handleChangeCurrentFields = (e:React.ChangeEvent<HTMLInputElement>) => {
            const fieldID = Number(e.target.id);
            const fieldName = e.target.name;
            let newFieldValue:any = e.target.value;

            if (fieldName === "LRange") {
                newFieldValue = Number(newFieldValue);
                currentFields[fieldID]["Range"][0] = newFieldValue;
                return;
            } else if (fieldName === "URange") {
                newFieldValue = Number(newFieldValue);
                currentFields[fieldID]["Range"][1] = newFieldValue;
                return;
            }

            if (fieldName === 'TelemetryId') {
                newFieldValue = Number(newFieldValue);
            }
        
            currentFields[fieldID] = {
                ...currentFields[fieldID],
                [fieldName]: newFieldValue
            };
        };

        return (
            <Stack direction={"column"} spacing={3} padding={2} maxHeight={"45vh"} sx={{overflow: "scroll"}}>
                {/* "field" is type any because we need to the access field.TelemetryId.data value
                    This is because the server sees the TelemetryId as a Buffer, which we can't 
                    just display as is in the textfield */}
                {fields.map((field:any, index:string) => (
                    <Stack direction={"row"} spacing={1}>
                        <TextField label="Name"        name="Name"        key="name"   id={index} onChange={handleChangeCurrentFields} size="small" defaultValue={field.Name || ""}/>
                        <TextField label="Lower Range" name="LRange"      key="lrange" id={index} onChange={handleChangeCurrentFields} size="small" defaultValue={field.Range[0] || ""} type="number"/>
                        <TextField label="Upper Range" name="URange"      key="urange" id={index} onChange={handleChangeCurrentFields} size="small" defaultValue={field.Range[1] || ""} type="number"/>
                        <TextField label="Units"       name="Units"       key="units"  id={index} onChange={handleChangeCurrentFields} size="small" defaultValue={field.Units || ""}/>
                        <TextField label="TelemetryID" name="TelemetryId" key="telid"  id={index} onChange={handleChangeCurrentFields} size="small" defaultValue={field.TelemetryId.data || field.TelemetryId || ""} type="number"/>

                        <Tooltip title="Remove Field" disableInteractive onClick={() => handleEditFields("remove", Number(index))}><IconButton><MinusIcon/></IconButton></Tooltip>
                    </Stack>
                ))}
            </Stack>
        )
    };

    const NamingPopup = () => {
        let nameFieldContents:string = "";

        const handleClosePopup = () => {
            handleEditFieldGroups("add", nameFieldContents);
            setNamingPopupOpen(false);
        };

        const handleFieldChange = (e:React.ChangeEvent<HTMLInputElement>) => {
            nameFieldContents = e.target.value;
        };

        const checkEnter = (e:any) => {
            if(e.keyCode == 13){
                handleClosePopup();
            }
        };

        return (
            <Dialog open={namingPopupOpen}>
                <DialogTitle>
                    <Typography variant="subtitle1">Name New Field Group</Typography>
                </DialogTitle>
                <DialogContent>
                    <TextField onChange={handleFieldChange} onKeyDown={checkEnter} label={"Group Name"} sx={{marginTop: 0.8}} autoFocus/>
                </DialogContent>
                <Stack direction={"row"} justifyContent={"space-evenly"} marginBottom={2}>
                    <Button onClick={() => setNamingPopupOpen(false)} fullWidth={false} variant={"contained"}>Cancel</Button>
                    <Button onClick={handleClosePopup} fullWidth={false} variant={"contained"}>Add</Button>
                </Stack>
            </Dialog>
        )
    };

    const DialogHeader = () => {
        const [moduleName, setModuleName] = useState<string>(moduleObject ? moduleObject.Name : "Module")

        const handleChangeModuleName = (e:React.ChangeEvent<HTMLInputElement>) => {
            setModuleName(e.target.value)
        }

        const handleDefocus = () => {
            let moduleObjectEdited = lodash.cloneDeep(moduleObject)
            moduleObjectEdited.Name = moduleName;
            setModuleObject(moduleObjectEdited)
        }

        return (
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                <Typography variant="h5">{moduleObject && moduleObject.Name ? `Edit ${moduleObject.Name}` : "New Module"}</Typography>
                <TextField label={"Module Name"} defaultValue={moduleName || ""} size={"small"} onBlur={handleDefocus} onChange={handleChangeModuleName} required/>
            </Stack>
        )
    };

    const ValidationDialog = (props:any) => {
        const { open, onClose, content } = props
        return (
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    {content}
                </DialogContent>
                <Stack direction={"row"} justifyContent={"space-evenly"} marginBottom={2}>
                    <Button variant={"contained"} onClick={onClose}>
                        Cancel
                    </Button>
                </Stack>
          </Dialog>
        );
    };
    
    const handleEditFieldGroups = (op:"add" | "remove", groupName?:string) => {
        // Deref const object so we can edit and give to setModuleObject - neccessary because we're using state, otherwise no worky
        let moduleObjectEdited:IModule = lodash.cloneDeep(moduleObject)
        let newTab = tabIndex;

        if(op === "add") {
            // Hacky check for startup, RE adding a named group on "New Module" init
            // TODO do this better probably
            if (moduleObjectEdited.FieldGroups[0].Name === "New Group") {
                moduleObjectEdited.FieldGroups.splice(0, 1);
                newTab = -1;
            }

            const emptyFieldGroup:IFieldGroup = {
                Name: groupName || 'New Group',
                Fields: [
                    {
                        Name: '',
                        Range: [0, 0],
                        Units: '',
                        TelemetryId: 0
                    }
                ]
            }
    
            moduleObjectEdited.FieldGroups.splice(newTab + 1, 0, emptyFieldGroup)
            newTab += 1  

        } else {
            if (moduleObjectEdited.FieldGroups.length > 1) {
                moduleObjectEdited.FieldGroups.splice(newTab, 1);
                if(newTab > 0) {
                    newTab -= 1
                }
            }
        }
        setTabIndex(newTab)
        setModuleObject(moduleObjectEdited)
    };

    const handleEditFields = (op:"add" | "remove", index:number) => {
        let moduleObjectEdited:IModule = lodash.cloneDeep(moduleObject)
        if(op === "add") {
            const emptyField:IField = {
                Name: '',
                Range: [0, 0],
                Units: '',
                TelemetryId: 0
            }

            moduleObjectEdited.FieldGroups[tabIndex].Fields.push(emptyField)
        } else {
            if(moduleObjectEdited.FieldGroups[tabIndex].Fields.length > 1) {
                moduleObjectEdited.FieldGroups[tabIndex].Fields.splice(index, 1);
            }
        }
        setModuleObject(moduleObjectEdited)
    };

    const handleSaveClose = async() => {
        const validateFields = () => {
            if(!moduleObject.Name) {
                setValidationMessage("Module must have a name");
                return false;
            }
            for (const field of currentFields) {
                if (!field.Name || field.Range.length !== 2 || !field.Units || !field.TelemetryId) {
                    setValidationMessage("Some fields are empty or invalid. Please check before saving");
                    return false;
                }
            }
            return true;
        };
        
        const isValid = validateFields();
        
        if (!isValid) {
            setShowValidationPopup(true);
            return;
          }
        
        const save = async():Promise<boolean> => {
            let moduleObjectRet:IModule = lodash.cloneDeep(moduleObject);
            moduleObjectRet.FieldGroups[tabIndex].Fields = currentFields;

            let dataConfigRet:IDataConfig = lodash.cloneDeep(dataConfig);
            dataConfigRet.Modules[saveModuleIndex] = moduleObjectRet;

            const payload:IDataConfig = dataConfigRet;

            let response:any;
            try {
                response = await api.updateDataConfig(dataConfigID, payload)
                if (response.error) {
                    throw Error(response.status)
                }
            } catch (error) {
                console.error(response.error)
                return false;
            } finally {
                return true;
            }
        };
        
        let success:Boolean;
        try {
            success = await save();
            if (!success) {
                throw Error;
            }
        } catch (error) {
            console.error(error);
        } finally {
            onClose();
        }
    };

    const stopClickThrough = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent clicks from propagating to parent components, which was a problem when editing within data-config-view.tsx
    };

    return (
        <Dialog open={isOpen} fullWidth maxWidth={"md"} PaperProps={{sx:{maxHeight: "80vh"}}} onClick={stopClickThrough}>
            <DialogTitle marginTop={1}>
                <DialogHeader/>
            </DialogTitle>

            <DialogContent sx={{overflow: "hidden"}}>
                <Stack direction={"row"} justifyContent={"space-evenly"} minHeight={"55vh"}>

                    {/*Left Selection Pane ("Field Groups")*/}
                    <Box sx={{background: "#22272e", borderRadius: 1}} marginRight={1}>
                        
                        {/*Left Header Bar*/}
                        <Stack  direction={"row"} 
                                margin={1}
                                padding={1}
                                paddingLeft={2}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                                sx={{
                                    background: "#474b51",
                                    borderRadius: 1,
                                    whiteSpace: "nowrap",}}>

                            <Typography variant="subtitle1" sx={{paddingRight: 1}}>Field Groups</Typography>
                            <Tooltip title="New Field Group" disableInteractive><IconButton onClick={() => setNamingPopupOpen(true)}><PlusIcon/></IconButton></Tooltip>
                            <Tooltip title="Remove Current Field Group" disableInteractive><IconButton onClick={() => handleEditFieldGroups("remove")}><MinusIcon/></IconButton></Tooltip>
                        </Stack>

                        {/*Left Tab Display*/}
                        <TabDisplay fieldGroups={moduleObject ? moduleObject.FieldGroups : emptyModule.FieldGroups}/>
                    </Box>

                    {/*Right Editor Pane ("Fields")*/}
                    <Box sx={{background: "#22272e", borderRadius: 1}}>
                        
                        {/*Right Editor Header Bar*/}
                        <Stack  direction={"row"} 
                                margin={1}
                                spacing={1}
                                padding={1}
                                paddingLeft={2}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                                sx={{
                                    background: "#474b51",
                                    borderRadius: 1,
                                    whiteSpace: "nowrap",}}>

                            <Typography variant="subtitle1">Fields</Typography>
                            <Tooltip title="New Field" disableInteractive><IconButton onClick={() => handleEditFields("add", 0)}><PlusIcon fontSize="medium"/></IconButton></Tooltip>
                        </Stack>

                        {/*Right Editor Contents*/}
                        <FieldDisplay fields={currentFields}/>
                    </Box>

                </Stack>
            </DialogContent>

            <Stack direction={"row"} spacing={1} padding={3} justifyContent={"flex-end"} alignItems={"center"}>
                <Button onClick={() => onClose()} variant="contained">Cancel</Button>
                <Button onClick={handleSaveClose} variant="contained">Save</Button>
            </Stack>

            <NamingPopup/>
            <ValidationDialog open={showValidationPopup} onClose={() => setShowValidationPopup(false)} content={validationMessage}/>
        </Dialog>
    );
};

export default ModuleEditor;
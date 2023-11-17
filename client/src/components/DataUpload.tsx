import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Tooltip, Typography } from "@mui/material";
import { useActiveMission } from "../utils/ActiveMissionContext";
import React, { useState, useEffect } from 'react';
import FileUpload from "react-material-file-upload";
import * as DataConverter from "rocket-data"



interface IDataUploadProps {
    isOpen: boolean;
    onClose: () => void;
}


const MissionConfig: React.FC<IDataUploadProps> = (props: IDataUploadProps) => {
    const { isOpen, onClose } = props;
    const [files, setFiles] = useState<File[]>([]);
    
    const handleSave = async () => {
        const config_file = files.find((element: File) => element.type === "application/json");
        const bin_file = files.find((element: File) => element.type === "application/macbinary");
        const csv_str = await DataConverter.convert_to_csv(config_file, bin_file);
        console.log(csv_str);
        props.onClose();
    };

    const handleClose = () => {
        props.onClose();
    };

    useEffect(() => {
        console.log(files);
    }, [files]);

    const context = useActiveMission();

    return(
        <Dialog open={isOpen} fullWidth onClose={handleClose}>
            <DialogTitle>
                <Typography variant="h4">Upload Flight Data</Typography>
            </DialogTitle>
            <DialogContent>
                <Stack direction={'column'} gap={2}>
                    <Typography variant="body1">Upload two files: config.json and data.bin or data.cvs.</Typography>
                    <Stack direction={'row'} gap={2} alignItems={'center'}>
                        <Typography variant="subtitle1">Supported File Type:</Typography>
                        <Chip label='.cvs' color="primary" variant="outlined"/> 
                        <Chip label='.json' color="primary" variant="outlined"/> 
                        <Chip label='.bin' color="primary" variant="outlined"/>
                    </Stack>
                    <Tooltip title="To upload multiple files they both must be selected in your file system">
                        <div>
                            <FileUpload
                                accept={[".csv", ".json", ".bin"]}
                                multiple
                                value={files} 
                                onChange={setFiles} 
                                title="Upload your flight data and config file to begin analyzing your flight!"
                                buttonText="Upload"
                            />
                        </div>
                    </Tooltip>
                    <Typography variant="subtitle1"> </Typography>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default MissionConfig;
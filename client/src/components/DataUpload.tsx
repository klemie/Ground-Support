import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Stack, Tooltip, Typography } from "@mui/material";
import { useActiveMission } from "../utils/ActiveMissionContext";
import React, { useState, forwardRef, useEffect } from 'react';
import { TransitionProps } from "@mui/material/transitions";
import FileUpload from "react-material-file-upload";



interface IDataUploadProps {
    isOpen: boolean;
    onClose: () => void;
}


const DataUpload: React.FC<IDataUploadProps> = (props: IDataUploadProps) => {
    const { isOpen, onClose } = props;
    const [files, setFiles] = useState<File[]>([]);
    
    const handleSave = () => {
        // TODO: mateos rust library
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
                        <Tooltip title="Raw data. not Supported yet">
                            <Chip label='.bin' color="error" variant="outlined" />
                        </Tooltip>
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

export default DataUpload;
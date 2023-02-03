import React, {useState} from "react";
import { Button, Dialog, TextField, Stack, DialogContent, Typography } from "@mui/material";
import axios from "axios";


interface SettingsDialogProps {
    isOpen: boolean;
    onClose: () => void
}

const SettingsDialog: React.FC<SettingsDialogProps> = (props: SettingsDialogProps) => {

    const [isOpen, setIsOpen] = useState(props.isOpen);
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('File Name');
    const [uploadedFile, setUploadedFile] = useState({});

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const fileResponse = await axios.post('/uploadFile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const { fileName, filePath } = fileResponse.data;
            setUploadedFile({ fileName, filePath });
        } catch (err: any) {
            if (err.response.status === 500) {
                console.log('problem with server')
            } else {
                console.log(err.response.data.msg);
            }
        }
    };

    const onChange = (e: any) => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };

    return(
        <Dialog open={props.isOpen}>
            <DialogContent>
                <Stack direction="column" spacing={2} alignItems="center">

                    {/* Doesn't save Mission Name anywhere yet. */}
                    <Stack direction="row" spacing={2} alignItems="center">

                        <Typography variant="h6"> Mission Name: </Typography>

                        <TextField variant="outlined" size="small" type="String"/>

                    </Stack>

                    {/* Doesn't store the uploaded file yet, just opens file explorer and lets a file be picked. */}
                    <Button variant={"contained"} component="label">
                        Upload
                        <input hidden accept="text/txt" type="file" onChange={onChange} />
                    </Button>

                    {filename}

                    <Stack direction="row" spacing={2} alignItems="center">

                        {/* These buttons are identical for now; need to add functionality to Save Changes. Closing without saving shouldn't change any configs or the mission name */}
                        <Button variant={"contained"} component="label" onClick={props.onClose}>
                            Save Changes
                        </Button>

                        <Button variant={"contained"} component="label" onClick={props.onClose}>
                            Close
                        </Button>

                    </Stack>
                    

                </Stack>
            </DialogContent>

        </Dialog>
    );
}

export default SettingsDialog;
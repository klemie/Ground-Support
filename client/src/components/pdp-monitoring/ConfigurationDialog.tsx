import React, {useCallback, useEffect, useState} from "react";
import { Button, Dialog, TextField, Stack, DialogContent, DialogActions, DialogTitle, Select, MenuItem, InputLabel, Tooltip, Chip, IconButton, ButtonGroup, Autocomplete, Checkbox, Typography, Divider, Grid, Paper, Link } from "@mui/material";
import { Info } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import WebIcon from '@mui/icons-material/Web';
import { CHANNEL_OPTION_TYPES, CHANNELS_OPTIONS, IFormOptions } from "./lib/InstrumentationConstatnt";

interface ConfigurationDialogProps {
    isOpen: boolean;
    onClose: () => void;
}


const ConfigurationDialog: React.FC<ConfigurationDialogProps> = (props: ConfigurationDialogProps) => {
    const { isOpen, onClose } = props;

    const [channelOptions, setChannelOptions] = useState<IFormOptions[]>([]);

    useEffect(() => {
        console.log("Channel Options: ", channelOptions);
    }, [channelOptions]);

    const handleSave = () => {
        // Save changes
        onClose();
    }

    return(
        <Dialog 
            open={isOpen}
            onClose={onClose}
            sx={{ 
                maxHeight: 1000,
                overflowY: 'none'
            }}
            maxWidth={'sm'}
        >
            <DialogTitle id="alert-dialog-title" paddingBottom={0}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h6">{"LabJack Configuration"}</Typography>
                    <IconButton aria-label="info" size="small" onClick={() => onClose()}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <Stack spacing={1} >
                
                    <Link href="https://drive.google.com/file/d/1C69f5mP1heW092ucoB-aTtU7kIAHJDwg/view?usp=sharing" > 
                        <Stack direction={'row'} spacing={2} alignItems={'center'}>
                            <InsertDriveFileIcon fontSize="small" />
                            LabJack U6Pro User Manual (Section 5.2.12)
                        </Stack>
                    </Link>
                    <Link href="https://support.labjack.com/docs/u6-datasheet" > 
                        <Stack direction={'row'} spacing={2} alignItems={'center'}>
                            <WebIcon fontSize="small" />
                            LabJack U6Pro Docs
                        </Stack>
                    </Link>
                    {/* <Link href="https://drive.google.com/file/d/1C69f5mP1heW092ucoB-aTtU7kIAHJDwg/view?usp=sharing">LabJack U6Pro User Manual</Link> */}
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography variant="subtitle1">Labjack Options</Typography>
                        <Tooltip title="Settling Factor: 0-10, Resolution Index: 0-8, Scan Frequency: 0-12">
                            <IconButton>
                                <Info />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    <Typography variant="body2" marginTop='0'>
                        Sampling Frequency = ScanFrequency × NumChannel (Hz)
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" paddingY={1}>
                        <TextField id="settling-factor-input" size="small" label="Settling Factor" variant="outlined" type="number" sx={{ width: 150 }} defaultValue={1} InputProps={{ inputProps: { min: 0, max: 10 } }}  />
                        <TextField id="resolution-index-input" size="small" label="Resolution Index" variant="outlined" type="number" sx={{ width: 150 }} defaultValue={0} InputProps={{ inputProps: { min: 0, max: 8 } }}/>
                        <TextField id="scan-frequency-input" size="small" label="Scan Frequency" variant="outlined" type="number" sx={{ width: 150 }} InputProps={{ inputProps: { min: 0, max: 12 } }}/>
                    </Stack>
                    <Divider />
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography variant="subtitle1">Channel Options</Typography>
                        <Tooltip title={`ChannelOptions []: Set bit 7 for differential reading.
        ChannelOption Byte details: 
            bit 4&5 (GainIndex): 0(b00)=x1, 1(b01)=x10, 2(b10)=x100, 3(b11)=x1000
            bit 7 (differentail): differential mode`}>
                            <IconButton>
                                <Info />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    <Autocomplete 
                        size="small"
                        multiple
                        id="checkboxes-tags-demo"
                        options={CHANNELS_OPTIONS}
                        value={channelOptions}
                        onChange={(_, newValue) => {
                            setChannelOptions(newValue);
                        }}
                        disableCloseOnSelect
                        getOptionLabel={(option: IFormOptions) => option.label}
                        renderOption={(props, option, { selected }) => {
                            const { key, ...optionProps } = props;
                            return (
                                <li key={key} {...optionProps}>
                                <Checkbox
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option.label}
                                </li>
                            );
                        }}
                        // style={{ maxWidth: 500 }}
                        renderInput={(params) => (
                            <TextField {...params} label="Channels" placeholder="Channel Numbers" />
                        )}
                    />
                    <Grid 
                        container 
                        gap={2} 
                        width={'fit-content'} 
                        overflow={'auto'} 
                        sx={{ maxHeight: 350 }} 
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        {
                            channelOptions.map((option, index) => {
                                return (
                                    <Grid item margin={0} padding={0}>
                                        <Paper elevation={2} sx={{ padding: 2 }}>
                                            <Stack direction={'column'} alignItems={'center'} width={'fit-content'} spacing={1}>
                                                <Chip key={index} label={option.label} sx={{ borderRadius: 1, width: '100%' }} />
                                                <TextField 
                                                    id="channel-option-input" 
                                                    size="small" 
                                                    label="Name" 
                                                    variant="outlined" 
                                                    sx={{ maxWidth: 135 }} 
                                                />
                                                <Autocomplete
                                                    size="small"
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    options={CHANNEL_OPTION_TYPES}
                                                    sx={{ minWidth: 135 }} 
                                                    renderInput={(params) => <TextField {...params} label="Gain Options" />}
                                                />
                                            </Stack>
                                        </Paper>
                                    </Grid>
                                );
                            })
                        }
                    </Grid>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button 
                    variant={"contained"} 
                    component="label" 
                    onClick={() => handleSave()} 
                    fullWidth
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfigurationDialog;
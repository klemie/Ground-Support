import { CloudUpload, Info } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import {
	Alert,
	Box,
	Button,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	Stack,
	TextField,
	Tooltip,
	InputAdornment
} from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { parseJsonFile } from '../../utils/data-parser';
import { IComponent } from '../../utils/entities';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250
		}
	}
};

interface ComponentDetails extends IComponent {
	Id?: string;	
}

interface ComponentModalProps {
	component?: ComponentDetails;
	componentId?: string;
	isOpen: boolean;
	onSave: (id: string) => void;
	onClose: () => void;
}

interface dataConfigStructure {
	config: {};
	data: { results: { [key: string]: any } };
	headers: {};
	request: {};
	status: number;
	statusText: string;
}

const ComponentModal = (props: ComponentModalProps) => {
	const { component } = props;
	console.log(component);
	const [name, setName] = useState<string>('');
	const [details, setDetails] = useState<string>('');
	const [sourceTypes, setSourceTypes] = useState<string[]>([]);
	const [editMode, setEditMode] = useState<boolean>(!!component || false);
	const [componentId, setComponentId] = useState<string>('');
	const [errorBar, setErrorBar] = useState({
		show: false,
		message: 'Error Occured'
	});
	const [configFile, setConfigFile] = useState<File | null>(null);
	const parsedConfigFile = useRef<{ [key: string]: Object }>({});

	const handleChange = (e: any, setState: Function) => {
		if (!editMode) {
			setEditMode(true);
		}
		setState(e.target.value);
	};

	const resetState = () => {
		setName('');
		setDetails('');
		setSourceTypes([]);
		setEditMode(false);
		setComponentId('');
		setConfigFile(null);
		parsedConfigFile.current = {};
	};


	const save = async (): Promise<boolean> => {
		let dataConfigResponse: dataConfigStructure;
		if (componentId && configFile) {
			dataConfigResponse = await axios.patch(
				`http://127.0.0.1:9090/DataConfig/${component?.DataConfig}`, 
				parsedConfigFile.current
			);
		} else {	
			dataConfigResponse = await axios.post(
				`http://127.0.0.1:9090/DataConfig`,
				parsedConfigFile.current
			);
		}
		
		let dataConfigId: string;
		if (dataConfigResponse['status'] === 201) {
			if ('data' in dataConfigResponse) {
				dataConfigId = dataConfigResponse['data']['results']['_id'];
			} else {
				dataConfigId = '';
			}
		} else {
			setErrorBar({ message: 'DataConfig Upload Failed', show: true });
			return false;
		}
		let cId: string;
		sourceTypes.map(async (sourceType) => {
			const payload: IComponent = {
				Name: name,
				DataConfig: dataConfigId,
				TelemetrySource: sourceType,
				Details: details
			};
			let response: any;
			if (componentId) {
				response = await axios.patch(
					`http://127.0.0.1:9090/component/${componentId}`,
					payload
				);
			} else {
				response = await axios.post(
					`http://127.0.0.1:9090/component`,
					payload
				);
			}
			if (response['status'] === 400) {
				setErrorBar({ message: 'Component Upload Failed', show: true });
				return false;
			} else {
				debugger;
				const data = response.data.results ? response.data.results : response.data.results;
				console.log('component post / patch data')
				console.log(data);
				cId = data._id;
				props.onSave(cId);
				setComponentId(cId);
			}
		});
		return true;
	};

	

	const saveAndClose = async () => {
		try {
			debugger;
			await save();
		} finally {
			props.onSave(componentId);
			props.onClose();
			resetState();
		};
	};

	const onUploadFile = (event: any): void => {
		setConfigFile(event.target.files[0]);
	};

	const clearUploadFile = (): void => {
		setConfigFile(null);
	};

	const parseUploadedFileToJson = useCallback(async () => {
		let response: { [key: string]: Object } = await parseJsonFile(configFile);
		parsedConfigFile.current = response;
	}, [configFile]);

	useEffect(() => {
		parseUploadedFileToJson();
	}, [parseUploadedFileToJson]);

	useEffect(() => {
		resetState();
		if (component) {
			setEditMode(true);
			setName(component.Name);
			setDetails(component.Details);
			setSourceTypes(component.TelemetrySource ? [component.TelemetrySource] : []);
			setComponentId(component.Id ? component?.Id : '');
		}
	}, [component]);

	return (
		<Dialog open={props.isOpen} fullWidth>
			<DialogTitle sx={{ typography: 'h4' }}>Component</DialogTitle>
			<DialogContent>
				<FormControl fullWidth>
					<Stack sx={{ paddingTop: '5px' }} direction="column" spacing={3} alignItems="left">
						{errorBar.show && (
							<Alert
								variant="filled"
								severity="error"
								action={
									<IconButton
										aria-label="close"
										color="inherit"
										size="small"
										onClick={() => {
											setErrorBar({ ...errorBar, show: false });
										}}
									>
										<CloseIcon fontSize="inherit" />
									</IconButton>
								}
							>
								{errorBar.message}
							</Alert>
						)}
						<Stack direction="row" spacing={3}>
							<TextField
								InputLabelProps={{ shrink: editMode }}
								type="String"
								value={name}
								onChange={(e) => handleChange(e, setName)}
								fullWidth
								size="small"
								id="component-name"
								label="Name"
								variant="outlined"
							/>
						</Stack>
						<Stack direction="row" spacing={3}>
							<TextField
								InputLabelProps={{ shrink: editMode }}
								type="String"
								value={details}
								onChange={(e) => handleChange(e, setDetails)}
								fullWidth
								size="small"
								id="component-name"
								label="Details"
								variant="outlined"
							/>
						</Stack>
						<Stack direction="row" spacing={2}>
							<FormControl fullWidth variant="filled">
								<InputLabel id="component-source-label">Telemetry Source</InputLabel>
								<Select
									id="component-source"
									variant="filled"
									multiple
									fullWidth
									value={sourceTypes}
									onChange={(e) => handleChange(e, setSourceTypes)}
									input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
									renderValue={(selected: string[]) => (
										<Box
											sx={{
												display: 'flex',
												flexWrap: 'wrap',
												gap: 0.5,
												transform: 'translateY(20%)'
											}}
										>
											{selected.map((value: string) => (
												<Chip key={value} label={value} />
											))}
										</Box>
									)}
									sx={{
										'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
											border: 'none !important'
										}
									}}
									MenuProps={MenuProps}
									labelId="component-source-label"
									label=""
								>
									<MenuItem key="LORA" value="LORA">
										LORA
									</MenuItem>
									<MenuItem key="APRS" value="APRS">
										APRS
									</MenuItem>
								</Select>
							</FormControl>
						</Stack>
						<Stack direction="row" spacing={1}>
							{configFile && (
								<TextField
									size="small"
									fullWidth
									value={configFile?.name}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<IconButton onClick={clearUploadFile}>
													<CloseIcon />
												</IconButton>
											</InputAdornment>
										)
									}}
								/>
							)}
							<input
								accept="json/*"
								hidden
								className={'button'}
								id="contained-button-file"
								onChange={onUploadFile}
								type="file"
							/>
							<label style={{ width: '95%' }} htmlFor="contained-button-file">
								<Button
									variant="contained"
									component="span"
									className={'button'}
									size="large"
									startIcon={<CloudUpload />}
									fullWidth
								>
									{!configFile && (component?.DataConfig ? 'overwrite config' : 'Data Configuration')}
								</Button>
							</label>
							<Tooltip
								title="dataconfig is a json file that specifies the expected Components, FieldGroups, and Fields"
								placement="top"
								arrow
							>
								<IconButton size="medium">
									<Info />
								</IconButton>
							</Tooltip>
						</Stack>
					</Stack>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.onClose}>Cancel</Button>
				<Button onClick={saveAndClose}>Save</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ComponentModal;

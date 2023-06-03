import { CloudUpload, Info } from '@mui/icons-material';
import {
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
	TextField
} from '@mui/material';
import { useState } from 'react';

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

interface ComponentModalProps {
	isOpen: boolean;
	onSave: () => void;
	onClose: () => void;
}

const ComponentModal = (props: ComponentModalProps) => {
	const [name, setName] = useState<string>('');
	const [details, setDetails] = useState<string>('');
	const [sourceType, setSourceType] = useState<string[]>([]);
	const [editMode, setEditMode] = useState<boolean>(false);
	const handleChange = (e: any, setState: Function) => {
		if (!editMode) {
			setEditMode(true);
		}
		setState(e.target.value as string);
	};
	console.log(name);
	const save = async () => {
		// const payload = {
		// 	Height: height,
		// 	Class: rocketClass,
		// 	Motor: motor,
		// 	MotorType: motorType,
		// 	Name: name,
		// 	Mass: mass
		// };
		// if (props.rocketProfileId) {
		// 	await axios.patch(`http://127.0.0.1:9090/rocket/${props.rocketProfileId}`, payload);
		// } else {
		// 	await axios.post(`http://127.0.0.1:9090/rocket`, payload);
		// }
	};

	const saveAndClose = () => {
		save();
		props.onSave();
	};

	return (
		<Dialog open={props.isOpen} fullWidth>
			<DialogTitle sx={{ typography: 'h4' }}>Component</DialogTitle>
			<DialogContent>
				<FormControl fullWidth>
					<Stack sx={{ paddingTop: '5px' }} direction="column" spacing={3} alignItems="left">
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
									value={sourceType}
									onChange={(e) => handleChange(e, setSourceType)}
									input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
									renderValue={(selected: string[]) => (
										<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
											{selected.map((value: string) => (
												<Chip key={value} label={value} />
											))}
										</Box>
									)}
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
							<Button variant="contained" size="large" startIcon={<CloudUpload />} sx={{ width: '95%' }}>
								Data Configuration
							</Button>
							<IconButton size="medium">
								<Info />
							</IconButton>
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

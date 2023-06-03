import {
	Box,
	Button,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
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

const ComponentModal = () => {
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
	return (
		<Dialog open={true} fullWidth>
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
							<Select
								label="Telemetry Source"
								id="component-source"
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
							>
								<MenuItem key="LORA" value="LORA">
									LORA
								</MenuItem>
								<MenuItem key="APRS" value="APRS">
									APRS
								</MenuItem>
							</Select>
						</Stack>
					</Stack>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button onClick={(e) => setEditMode(false)}>Data Configuration </Button>
			</DialogActions>
		</Dialog>
	);
};

export default ComponentModal;

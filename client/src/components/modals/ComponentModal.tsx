import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	MenuItem,
	Stack,
	TextField
} from '@mui/material';
import { useState } from 'react';

const ComponentModal = () => {
	const [name, setName] = useState<string>('');
	const handleChange = (e: any, setState: Function) => {
		setState(e.target.value as string);
	};
	console.log(name);
	return (
		<Dialog open={true} fullWidth>
			<DialogTitle sx={{ typography: 'h4' }}>Rocket Profile</DialogTitle>
			<DialogContent>
				<FormControl fullWidth>
					<Stack sx={{ paddingTop: '5px' }} direction="column" spacing={3} alignItems="left">
						<Stack direction="row" spacing={3}>
							<TextField
								InputLabelProps={{ shrink: true }}
								type="String"
								value={name}
								onChange={(e) => handleChange(e, setName)}
								fullWidth
								size="small"
								id="profile-name"
								label="Profile Name"
								variant="outlined"
							/>
						</Stack>
					</Stack>
				</FormControl>
			</DialogContent>
			{/* <DialogActions>
				<Button onClick={props.onClose}>Cancel</Button>
				<Button onClick={saveProfile}>Save</Button>
			</DialogActions> */}
		</Dialog>
	);
};

export default ComponentModal;

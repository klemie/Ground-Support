import React, {useState} from 'react';
import {Button, InputAdornment, TextField, FormControl, MenuItem, Stack, DialogTitle, Dialog, DialogActions, DialogContent} from '@mui/material';
import { FileUpload } from '@mui/icons-material';

interface RocketProfileProps {
	rocketProfileId?: string;
	isOpen: boolean;
	onClose: () => void;
}

const RocketProfilePopup: React.FC<RocketProfileProps> = (props: RocketProfileProps) => {
	const [rocketClass, setRocketClass] = useState('');
	const [motorType, setMotorType] = useState('');

	const saveProfile = () => {
		// TODO: POST request to rocket endpoint
		props.onClose();
	};

	return (
		<Dialog open={props.isOpen} fullWidth>
			<DialogTitle sx={{typography: 'h4'}}>Rocket Profile</DialogTitle>
			<DialogContent>
				<FormControl fullWidth>
					<Stack sx={{ paddingTop: "5px" }} direction="column" spacing={3} alignItems="left">
						<Stack direction="row" spacing={3}>
							<TextField type="String" fullWidth size="small" id="profile-name" label="Profile Name" variant="outlined"/>
							<Button sx={{minWidth: '80px'}} size="small" variant="contained" startIcon={<FileUpload />} component="label">
								<input hidden accept="*" type="file" />
								SVG
							</Button>
						</Stack>
						<TextField
							sx={{minWidth: '100%'}}
							id="mass"
							size="small"
							label="Mass"
							type="Number"
							variant="outlined"
							InputProps={{
								endAdornment: <InputAdornment position="start">kg</InputAdornment>
							}}
						/>
						<TextField
							sx={{minWidth: '100%'}}
							id="height"
							size="small"
							type="Number"
							label="Height"
							variant="outlined"
							InputProps={{
								endAdornment: <InputAdornment position="start">m</InputAdornment>
							}}
						/>
						<TextField size="small" sx={{minWidth: '100%'}} value={rocketClass} onChange={(e) => setRocketClass(e.target.value)} select label="Class">
							<MenuItem value={1}>10K</MenuItem>
							<MenuItem value={2}>30K</MenuItem>
							<MenuItem value={3}>60K</MenuItem>
							<MenuItem value={4}>100K+</MenuItem>
						</TextField>
						<Stack direction="row" spacing={2}>
							<TextField size="small" sx={{minWidth: '40%'}} value={motorType} onChange={(e) => setMotorType(e.target.value)} select label="Motor Type">
								<MenuItem value={1}>Solid</MenuItem>
								<MenuItem value={2}>Liquid</MenuItem>
								<MenuItem value={3}>Hybrid</MenuItem>
							</TextField>
							<TextField size="small" sx={{minWidth: '58%'}} id="motor-name" label="Motor" variant="outlined" />
						</Stack>
					</Stack>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.onClose}>Cancel</Button>
				<Button onClick={saveProfile}>Save</Button>
			</DialogActions>
		</Dialog>
	);
};

export default RocketProfilePopup;

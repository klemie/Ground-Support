import React, { useEffect, useState } from 'react';
import {
	Button,
	InputAdornment,
	TextField,
	FormControl,
	MenuItem,
	Stack,
	DialogTitle,
	Dialog,
	DialogActions,
	DialogContent
} from '@mui/material';
import { FileUpload } from '@mui/icons-material';
import axios from 'axios';

interface RocketProfileProps {
	rocketProfileId?: string;
	isOpen: boolean;
	onClose: () => void;
}

interface IRocketDetails {
	result: {
		Name: string;
		Motor: string;
		MotorType: string;
		Height: number;
		Class: string;
		Mass: number;
	};
}

const RocketProfilePopup: React.FC<RocketProfileProps> = (props: RocketProfileProps) => {
	const [name, setName] = useState<string>();
	const [motor, setMotor] = useState<string>();
	const [mass, setMass] = useState<number>();
	const [motorType, setMotorType] = useState<string>();
	const [rocketClass, setRocketClass] = useState<string>();
	const [height, setHeight] = useState<number>();

	// POST or PATCH data depending on if were creating a new rocket or editing a old one
	const save = async () => {
		const payload = {
			Height: height,
			Class: rocketClass,
			Motor: motor,
			MotorType: motorType,
			Name: name,
			Mass: mass
		};
		console.log(payload);
		if (props.rocketProfileId) {
			console.log(`rocket Id: ${props.rocketProfileId}`);
			await axios.patch(`http://127.0.0.1:9090/rocket/${props.rocketProfileId}`, payload);
		} else {
			await axios.post(`http://127.0.0.1:9090/rocket`, payload);
		}
	};

	useEffect(() => {
		// Load data from server with rocket id
		async function getRocketDetails() {
			if (props.rocketProfileId) {
				const response = await axios.get<IRocketDetails>(
					`http://127.0.0.1:9090/rocket/${props.rocketProfileId}`
				);
				const data = response.data.result;
				setHeight(data.Height);
				setMass(data.Mass);
				setRocketClass(data.Class);
				setMotor(data.Motor);
				setName(data.Name);
				setMotorType(data.MotorType);
				return response.data;
			}
		}
		const data = getRocketDetails();
		console.log(data);
	}, [props.rocketProfileId]);

	const saveProfile = () => {
		save();
		props.onClose();
	};

	return (
		<Dialog open={props.isOpen} fullWidth>
			<DialogTitle sx={{ typography: 'h4' }}>Rocket Profile</DialogTitle>
			<DialogContent>
				<FormControl fullWidth>
					<Stack sx={{ paddingTop: '5px' }} direction="column" spacing={3} alignItems="left">
						<Stack direction="row" spacing={3}>
							<TextField
								type="String"
								value={name}
								onChange={(e) => setName(e.target.value)}
								fullWidth
								size="small"
								id="profile-name"
								label="Profile Name"
								variant="outlined"
							/>
							<Button
								sx={{ minWidth: '80px' }}
								size="small"
								variant="contained"
								startIcon={<FileUpload />}
								component="label"
							>
								<input hidden accept="*" type="file" />
								SVG
							</Button>
						</Stack>
						<TextField
							sx={{ minWidth: '100%' }}
							id="mass"
							size="small"
							value={mass}
							onChange={(e) => setMass(Number(e.target.value))}
							label="Mass"
							type="Number"
							variant="outlined"
							InputProps={{
								endAdornment: <InputAdornment position="start">kg</InputAdornment>
							}}
						/>
						<TextField
							sx={{ minWidth: '100%' }}
							id="height"
							size="small"
							type="Number"
							value={height}
							onChange={(e) => setHeight(Number(e.target.value))}
							label="Height"
							variant="outlined"
							InputProps={{
								endAdornment: <InputAdornment position="start">m</InputAdornment>
							}}
						/>
						<TextField
							size="small"
							sx={{ minWidth: '100%' }}
							value={rocketClass}
							onChange={(e) => setRocketClass(e.target.value)}
							select
							label="Class"
						>
							<MenuItem value={'10K'}>10K</MenuItem>
							<MenuItem value={'30K'}>30K</MenuItem>
							<MenuItem value={'60K'}>60K</MenuItem>
							<MenuItem value={'100K'}>100K+</MenuItem>
						</TextField>
						<Stack direction="row" spacing={2}>
							<TextField
								size="small"
								sx={{ minWidth: '40%' }}
								value={motorType}
								onChange={(e) => setMotorType(e.target.value)}
								select
								label="Motor Type"
							>
								<MenuItem value={'Solid'}>Solid</MenuItem>
								<MenuItem value={'Liquid'}>Liquid</MenuItem>
								<MenuItem value={'Hybrid'}>Hybrid</MenuItem>
							</TextField>
							<TextField
								size="small"
								sx={{ minWidth: '58%' }}
								id="motor-name"
								value={motor}
								onChange={(e) => setMotor(e.target.value)}
								label="Motor"
								variant="outlined"
							/>
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

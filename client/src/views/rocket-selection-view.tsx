import React, { useState, useEffect } from 'react';
import { Grid, Chip, Stack } from '@mui/material';
import Header, { Breadcrumb } from '../components/Header';
import addRocket from '../static/images/AddRocket.svg';

import '../styles/rocketSelection.css';

interface Rocket {
	id: number;
	name: string;
	image: string;
	active: boolean;
}

interface RocketSelectProps {
	setCurrentView: (viewName: string) => void;
}

export default function RocketSelectionView(props: RocketSelectProps) {
	const colors: string[] = [
		'rgba(255, 197, 87, 1)',
		'rgba(214, 91, 79, 1)',
		'rgba(0, 94, 184, 1)',
		'rgba(69, 136, 201, 1)'
	];

	const breadCrumbs: Breadcrumb[] = [{ name: 'Rocket Selection', path: '/', active: true }];

	const dummyRocketData: Rocket[] = [
		{
			id: 1,
			name: 'MVP-1',
			image: 'Mvp1.svg',
			active: false
		},
		{
			id: 2,
			name: 'MVP-2',
			image: 'Mvp2.svg',
			active: false
		},
		{
			id: 3,
			name: 'Skookum-1',
			image: 'Skookum1.svg',
			active: false
		},
		{
			id: 4,
			name: 'Hyak-1',
			image: 'Hyak1.svg',
			active: false
		},
		{
			id: 5,
			name: 'Hyak-2',
			image: 'Hyak2.svg',
			active: false
		},
		{
			id: 6,
			name: 'XENIA-1',
			image: 'Xenia1.svg',
			active: false
		}
	];

	const [rocketData, setRocketData] = useState(dummyRocketData);

	useEffect(() => {
		//make an API call when component first mounts and setRocketData with response
		setRocketData(dummyRocketData);
	}, []);

	const addNewRocket = () => {
		props.setCurrentView('Active_Rocket');
		console.log('Adding new rocket...');
	};

	const setRocket = (data: Rocket) => {
		props.setCurrentView('Active_Rocket');
		console.log('Setting Rocket to:', data);
	};

	const rockets = rocketData.map((data: Rocket) => {
		const rocketImageURL = require('../static/images/' + data.image);
		return (
			<div key={data.id.toString()}>
				<Stack direction="column" spacing={1} onClick={data.active ? () => setRocket(data) : () => {}}>
					<img src={rocketImageURL} alt="Rocket" width={40}></img>
					<Chip label={data.name} color={data.active ? 'primary' : 'default'} sx={{ fontWeight: 'bold' }} />
				</Stack>
			</div>
		);
	});

	return (
		<div style={{ width: '100vw', height: '99vh' }}>
			<Grid
				container
				direction="column"
				paddingX="2rem"
				paddingY="2rem"
				gap={3}
				sx={{ height: '100%', width: '100%' }}
			>
				{/* Page Header */}
				<Grid item>
					<Header breadCrumbs={breadCrumbs} />
				</Grid>

				{/* Rocket Selection */}
				<Grid container justifyContent="center" alignItems="center" style={{ height: '80%' }}>
					<Stack direction="row" justifyContent="center" spacing={8} alignItems="flex-end">
						{rockets}
						<Stack direction="column" spacing={1} onClick={addNewRocket}>
							<img src={addRocket} alt="Add Rocket" width={40}></img>
							<Chip label="New Rocket" color="primary" sx={{ fontWeight: 'bold' }} />
						</Stack>
					</Stack>
				</Grid>
			</Grid>
			<div>
				{colors.map((color) => {
					return (
						<div
							style={{
								backgroundColor: color,
								width: '25%',
								height: '1vh',
								float: 'left'
							}}
						/>
					);
				})}
			</div>
		</div>
	);
}

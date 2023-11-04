import React from 'react';
import ComponentCard from '../../components/ComponentCard/ComponentCard';
import { Alert, Box, Grid } from '@mui/material';
import { IRocketPopulated } from '../../utils/entities';


interface ComponentProps {
	componentIds: string[];
	rocket: IRocketPopulated;
	refresh: () => void;
	dataConfigClick: (id: string) => void;
}

const ComponentsTab: React.FC<ComponentProps> = (props: ComponentProps) => {
	const { componentIds, rocket, refresh, dataConfigClick } = props;

	const handleClickDataConfig = (id: string) => {
		dataConfigClick(id);
	};

	return (
		<Box sx={{ paddingBottom: 5}}>
			{ !!!componentIds.length && <Alert severity="info">No Components. Please click the + component button to create one</Alert>}
			<Grid container spacing={3}>
				{componentIds.map((componentId: string) => (
					<Grid item>
						<ComponentCard 
							onDataConfigClick={handleClickDataConfig} 
							rocket={rocket} 
							updateComponent={refresh} 
							onDelete={refresh} 
							componentId={componentId} 
						/>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default ComponentsTab;


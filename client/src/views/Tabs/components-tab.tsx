import React from 'react';
import ComponentCard from '../../components/ComponentCard';
import { Alert, Box, Grid } from '@mui/material';
import { IRocket } from '../../utils/entities';
interface RocketDetails extends IRocket {
	Id?: string;
}
interface ComponentProps {
	componentIds: string[];
	rocket: RocketDetails;
	refresh: () => void;
}

const ComponentsTab: React.FC<ComponentProps> = (props: ComponentProps) => {
	const { componentIds, rocket, refresh } = props;

	return (
		<Box sx={{ paddingBottom: 5}}>
			{ !!!componentIds.length && <Alert severity="info">No Components. Please click the + component button to create one</Alert>}
			<Grid container spacing={3}>
				{componentIds.map((componentId: string) => (
					<Grid item>
						<ComponentCard rocket={rocket} updateComponent={refresh} onDelete={refresh} componentId={componentId} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default ComponentsTab;


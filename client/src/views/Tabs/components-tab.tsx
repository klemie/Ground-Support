import React from 'react';
import ComponentCard from '../../components/ComponentCard';
import { Alert, Grid } from '@mui/material';

interface ComponentProps {
	componentIds: string[];
	refresh: () => void;
}

const ComponentsTab: React.FC<ComponentProps> = (props: ComponentProps) => {
	const { componentIds, refresh } = props;

	return (
		<div>
			{ !!!componentIds.length && <Alert severity="info">No Components. Please click the + component button to create one</Alert>}
			<Grid container spacing={3}>
				{componentIds.map((componentId: string) => (
					<Grid item>
						<ComponentCard onDelete={refresh} componentId={componentId} />
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default ComponentsTab;


import { useState, useEffect } from "react"
import Header, { Breadcrumb } from "../components/Header";
import { Grid, Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Toolbar, Typography } from "@mui/material";



export default function ComponentDocs() {
    const [ currentComponentName, setCurrentComponentName ] = useState("");

	const breadCrumbs: Breadcrumb[] = [
		{ name: "Component Docs", path: "/", active: false },
		{ name: currentComponentName, path: "/", active: true }
	];

	const drawerWidth = 240;
	const componentNames = ["Module", "Real time Graphs", "Map", "Component Card", "Data Table"];

    return(
        <>
            <Grid container direction="column" paddingX="2rem" paddingY="2rem" gap={3}>
				{/* Page Header */}
				<Grid item>
					<Header breadCrumbs={breadCrumbs} />
				</Grid>

				{/* Parameters Controllers */}
				<Grid container direction="column" justifyContent="space-between" alignItems="center">
					<Box sx={{ display: 'flex' }}>
						<Drawer
							sx={{
								width: drawerWidth,
								flexShrink: 0,
								'& .MuiDrawer-paper': {
									width: drawerWidth,
									boxSizing: 'border-box'
								}
							}}
							variant="permanent"
							anchor="right"
						>
							<Toolbar>
								<Typography variant="h5">
									Components
								</Typography>
							</Toolbar>
        					<Divider />
							<List>
								{ componentNames.map((text, index) => (
									<ListItem key={text} disablePadding>
										<ListItemButton>
											<ListItemText primary={text} />
										</ListItemButton>
									</ListItem>
								))}
							</List>
						</Drawer>
						<Box
							component="main"
							sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
						>

						</Box>
					</Box>
                </Grid>
			</Grid>
        </>
    );

}
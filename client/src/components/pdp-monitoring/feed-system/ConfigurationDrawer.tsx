import { Drawer, Paper, Stack, Typography } from '@mui/material';
import React from 'react';

import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
interface ConfigurationDrawerProps {
    isOpen: boolean;
    closeDrawer: () => void;
}

const ConfigurationDrawer: React.FC<ConfigurationDrawerProps> = (props: ConfigurationDrawerProps) => {
    const { isOpen } = props;
    const colors: string[] = [
		'rgba(255, 197, 87, 1)',
		'rgba(214, 91, 79, 1)',
		'rgba(0, 94, 184, 1)',
		'rgba(69, 136, 201, 1)'
	];

    return (
        <Drawer
            anchor="right"
            variant="persistent"
            open={isOpen}
            sx={{
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    height: 'calc(100vh - 64px)',
                    borderRadius: 1,
                    boxSizing: 'border-box',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                },
            }}
        >
            <Stack>
                <div style={{ height: '100%' }}>
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
                <IconButton onClick={props.closeDrawer} >
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6">Configuration</Typography>
            </Stack>
        </Drawer>
    );
}

export default ConfigurationDrawer;
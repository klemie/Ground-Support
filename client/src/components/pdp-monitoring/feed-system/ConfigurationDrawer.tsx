import { Drawer } from '@mui/material';
import React from 'react';

interface ConfigurationDrawerProps {
    isOpen: boolean;
    closeDrawer: () => void;
}

const ConfigurationDrawer: React.FC<ConfigurationDrawerProps> = (props: ConfigurationDrawerProps) => {
    const { isOpen } = props;
    
    return (
        <Drawer
            anchor="right"
            variant="persistent"
            open={isOpen}
        >
            test
        </Drawer>
    );
}

export default ConfigurationDrawer;
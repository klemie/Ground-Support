import { PaletteMode, useMediaQuery } from '@mui/material';
import ViewProvider from '../utils/view-provider';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMemo, useState } from 'react';
import { getDesignTokens } from './Theme';
import { SocketGateway } from '../utils/socket-context';
import { MonitoringGateway } from '../utils/monitoring-system/monitoring-socket-context';

function App() {
	const [mode, setMode] = useState<PaletteMode>('dark');

	// const colorMode = useMemo(() =>({
	// 	toggleColorMode: () => {
	// 		setMode((prevMode: PaletteMode) =>
	// 		  prevMode === 'light' ? 'dark' : 'light',
	// 		);
	// 	  },
	// }), []);

	const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

	return (
		<MonitoringGateway>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<ViewProvider />
			</ThemeProvider>
		</MonitoringGateway>
	);
}

export default App;

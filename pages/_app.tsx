import '@/styles/globals.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from '../styles';

import type { AppProps } from 'next/app';
import { UIProvider } from '../context/ui';
import { EntriesProvider } from '../context/entrie';
import { SnackbarProvider } from 'notistack';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SnackbarProvider maxSnack={3}>
 <EntriesProvider>
			<UIProvider sidemenuOpen={false} isAddingEntry={false} isDragging={false}>
				<ThemeProvider theme={darkTheme}>
					<Component {...pageProps} />
					<CssBaseline />
				</ThemeProvider>
			</UIProvider>
		</EntriesProvider>
</SnackbarProvider>
	);
}

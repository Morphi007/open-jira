import { createTheme} from '@mui/material';
import { grey, red } from '@mui/material/colors';



export const darkTheme = createTheme({
    palette: {
		mode: 'dark',
        background: {
			default: "#1A1C20",
		},
		error: {
			main: red.A400,
		},
		
	},
	components:{
			MuiAppBar:{
				defaultProps:{},
				styleOverrides:{
					root: {
						backgroundColor: "#2C3639",
					}
				}
			}
	}
 
});

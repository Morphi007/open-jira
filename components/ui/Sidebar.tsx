import { useContext } from 'react';
import {
	Drawer,
	Box,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
	Divider,
} from '@mui/material/';

import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { UIContext } from '../../context/ui';

const menuItems: string[] = ['Inbox', 'stared', 'send', 'Email', 'Drafats'];

export const Sidebar = () => {
	const { sidemenuOpen,closeSideMenu} = useContext(UIContext);
	return (
		<Drawer anchor="left" open={sidemenuOpen} onClose={() => closeSideMenu()}>
			<Box sx={{ width: 200 }}>
				<Box sx={{ paddin: '5px 10px' }}>
					<Typography variant="h4">Menu</Typography>
				</Box>
				<List>
					{menuItems.map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>
								{index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
				<Divider></Divider>
				<List>
					{menuItems.map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>
								{index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
			</Box>
		</Drawer>
	);
};

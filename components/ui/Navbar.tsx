import React, { FC, useContext } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from '../../context/ui';
import NextLink from 'next/link';


type Props = {};

export const Navbar: FC<Props> = () => {
	const { openSideMenu } = useContext(UIContext);

	return (
		<AppBar position="sticky" elevation={0}>
			<Toolbar>
				<IconButton size="large" edge="start" onClick={openSideMenu}>
					<MenuOutlinedIcon />
				</IconButton>
					
				<NextLink href="/" passHref >
				  <Typography variant="h6" color="white">OpenJira</Typography>
				
               </NextLink>
			</Toolbar>
		</AppBar>
	);
};

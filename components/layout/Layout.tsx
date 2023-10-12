import React, { FC } from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import { Navbar,Sidebar} from '../ui';


type Props = {
	children?: React.ReactNode;
	title?: string;
};


export const Layout: FC<Props> = ({ children, title }) => {
	return (
		<Box sx={{flexFlow:1}}>
			<Head>
				<title>{title || 'Jira app'}</title>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
				<meta name="autor" content="ZMorphy" />
				<meta name="description" content={`Open jira  ${title}`} />
				<meta name="keywords" content={`${title},Open jira`} />
                <meta property="og:title" content={`informacion sobre ${title}`} />
				<meta property="og:description" content={`esta es la pagina sobre ${title}`} />
			</Head>
		    <Navbar/>
       <Sidebar/>
    	<Box style={{ padding: '10px 20px' }}>{children}</Box>
		</Box>
			
	);
};

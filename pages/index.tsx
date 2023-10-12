import React from 'react';
import { NextPage } from 'next';
import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import { Layout } from '@/components/layout';
import { EntryList, NewEntry } from '@/components/ui';

type Props = {};

const HomePage: NextPage = (props: Props) => {
	return (
		<Layout title={'Home-open Jira'}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={4}>
					<Card sx={{ height: 'calc(100vh - 100px) ' }}>
						<CardHeader title="pendiente" />
                         <NewEntry/>
						<EntryList status="pending" />
					</Card>
				</Grid>

				<Grid item xs={12} sm={4}>
					<Card sx={{ height: 'calc(100vh - 100px)' }}>
						<CardHeader title="en progreso" />
						<EntryList status="in-progress" />
					</Card>
				</Grid>

				<Grid item xs={12} sm={4}>
					<Card sx={{ height: 'calc(100vh - 100px)' }}>
						<CardHeader title="completada" />
						<EntryList status="finished" />
					</Card>
				</Grid>
			</Grid>
		</Layout>
	);
};

export default HomePage;

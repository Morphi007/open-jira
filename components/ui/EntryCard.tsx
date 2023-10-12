import React, { DragEvent, FC, useContext } from 'react';
import { useRouter } from 'next/router';
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Typography,
} from '@mui/material';
import { UIContext } from '@/context/ui';
import { Entry } from '@/interfaces';
import { dateFunction } from '@/utils/';



type Props = {
	entry: Entry;
};

export const EntryCard: FC<Props> = ({ entry }) => {
	const { startDrag, endtDrag } = useContext(UIContext);

	const router = useRouter()
	
	const onDragStart = (event: DragEvent) => {
		event.dataTransfer.setData('text', entry._id);
		startDrag();
	};


	const onDragEnd = () => {
		endtDrag();
	};

	const HandleCardLink=()=>{
           router.push(`/entries/${entry._id}`)
		  
	}

	

	return (
		<Card
		   onClick={HandleCardLink}
			sx={{ marginBottom: 1 }}
			draggable={true}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
		>
			<CardActionArea>
				<CardContent>
					<Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
				</CardContent>

				<CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
					<Typography variant="body2">{dateFunction.getformatDistanceToNow(entry.createdAt)} </Typography>
				</CardActions>
			</CardActionArea>
		</Card>
	);
};

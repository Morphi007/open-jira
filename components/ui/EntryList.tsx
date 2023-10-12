import React, { FC, useContext, useMemo, DragEvent } from 'react';
import { List, Paper } from '@mui/material';
import { EntryCard } from './EntryCard';
import { EntryStatus } from '@/interfaces';
import { EntriesContext } from '@/context/entrie';
import { UIContext } from '@/context/ui';
import styles from './EntryList.module.css';

type Props = {
	status: EntryStatus;
};

export const EntryList: FC<Props> = ({ status }) => {
	const { entries, updateEntry } = useContext(EntriesContext);
	const { isDragging, endtDrag } = useContext(UIContext);

	const entrieByStatus = useMemo(
		() => entries.filter((entry) => entry.status === status),
		[entries],
	);

	const allowDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
		const id = event.dataTransfer.getData('text');

		const entry = entries.find((e) => e._id === id)!;
		entry.status = status;
		updateEntry(entry);
		endtDrag();
	};

	return (
		<div
			onDrop={onDropEntry}
			onDragOver={allowDrop}
			className={isDragging ? styles.dragging : ''}
		>
			<Paper
				sx={{
					height: 'calc(100vh - 180px)',
					backgroundColor: 'transparent',
					padding: '1px 7px',
					overflow: 'auto',
					"&::-webkit-scrollbar": {
						width: "5px",
						bgcolor: "#3b454486",
					  },
					  "&::-webkit-scrollbar-thumb": {
						background: "#676565",
						border: "7px none #fffff",
						borderRadius: "10px",
					  },
					  "&::-webkit-scrollbar-thumb:hover": {
						background: "#434242",
						border: "7px none #fffff",
						borderRadius: "10px",
					  },
					
				}}
			>
				<List sx={{ opacity: isDragging ? 0.1 : 1, transition: 'all .3s' }}>
					{entrieByStatus.map((entry) => (
						<EntryCard key={entry._id} entry={entry} />
					))}
				</List>
			</Paper>
		</div>
	);
};

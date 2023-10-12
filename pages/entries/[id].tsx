import React, { ChangeEvent, FC,useState, useContext,useMemo } from 'react';
import { GetServerSideProps } from 'next';

import {
	capitalize,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	RadioGroup,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	Radio,
	TextField,
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';
import { Layout } from '@/components/layout';
import { dbEntries } from '@/database';
import { Entry, EntryStatus } from '@/interfaces';
import { EntriesContext } from '../../context/entrie';
import { dateFunction } from '@/utils';

type Props = {
	entry: Entry
	
};

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

export const EntryView:FC<Props>= ({entry}) => {


	const [inputValue, setinputValue] = useState(entry.description);
	const [status, setStatus] = useState<EntryStatus>(entry.status);
	const [touched, setTouched] = useState(false);
	const {updateEntry} = useContext(EntriesContext)
	
	const isNotValid = useMemo(
		() => inputValue.length <= 0 && touched,
		[inputValue, touched],
	);

	const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
		setinputValue(event.target.value);
	};

	const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
		//console.log(event.target.value);
		setStatus(event.target.value as EntryStatus);
	};

	const HandleOnsave = () => {
		if(inputValue.trim().length ===0 ) return;
		const updateEntrys:Entry={
			...entry,
			status,
			description: inputValue
		}
		updateEntry(updateEntrys,true)
	
	};

	return (
		

		<Layout title={inputValue.substring(0,20)+"..."}>
			<Grid container justifyContent="center" sx={{ marginTop: 2 }}>
				<Grid item xs={12} sm={8} md={6}>
					<Card>
						<CardHeader
							title={`Entrada:`}
							subheader={`creada  ${dateFunction.getformatDistanceToNow(entry.createdAt)}`}
						/>
						<CardContent>
							<TextField
								sx={{ marginTop: 2, marginBottom: 1 }}
								fullWidth
								placeholder="nueva entrada"
								autoFocus
								multiline
								label="Nueva entada"
								value={inputValue}
								onChange={onInputValueChanged}
								helperText={isNotValid && 'ingrese la entrada'}
								onBlur={() => {
									setTouched(true);
								}}
								error={isNotValid}
							/>
							<FormControl>
								<FormLabel>Estado:</FormLabel>
								<RadioGroup row value={status} onChange={onStatusChange}>
									{validStatus.map((option) => (
										<FormControlLabel
											key={option}
											value={option}
											control={<Radio />}
											label={capitalize(option)}
										/>
									))}
								</RadioGroup>
							</FormControl>
						</CardContent>
						<CardActions>
							<Button
								startIcon={<SaveOutlinedIcon />}
								variant="contained"
								fullWidth
								color="success"
								onClick={HandleOnsave}
								disabled={inputValue.length <= 0}
							>
								Save
							</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>

			<IconButton sx={{ position: 'fixed', bottom: 30, right: 30, background: 'red' }}>
				<DeleteOutlinedIcon />
			</IconButton>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({params}) => {

	const {id} = params as { id: string };
    
	const entry = await dbEntries.getEntryByid(id);

    if(!entry){
        
		return{
		  redirect:{
			 destination:"/",
			 permanent: false,
		  }
		}
	}

	return {
		props: {
		    entry
		},
	};
};

export default EntryView;

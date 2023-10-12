import React, { ChangeEvent, useState,useContext } from 'react';
import { UIContext } from '@/context/ui';
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { EntriesContext } from '@/context/entrie';

type Props = {};

export const NewEntry = ({}) => {

	
	const [inputValue, setInputValue] = useState('');
	const [touched, setTouched] = useState(false);

	const onTetFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

   const {addNeEntry} = useContext(EntriesContext)
   const {isAddingEntry,setIsAddingEntry}=useContext(UIContext)

	const HandleSave = () => {
		 if(inputValue.length===0) return;
		// console.log({})
		 addNeEntry(inputValue)
		 setIsAddingEntry(false)
		 setInputValue("")
		 setTouched(false)
	};

	return (
		<Box sx={{ marginBottom: 2, paddingX: 1 }}>
			{isAddingEntry? (
				<>
					<TextField
						fullWidth
						sx={{ marginTop: 2, marginBottom: 1 }}
						placeholder="Nueva entrada"
						autoFocus
						multiline
						label="Nueva entrada"
						helperText={inputValue.length <= 0 && touched && 'inserte valor'}
						error={inputValue.length <= 0 && touched}
						value={inputValue}
						onChange={onTetFieldChange}
						onBlur={() => setTouched(true)}
					/>
					<Box display="flex" justifyContent={'space-between'}>
						<Button variant="text" onClick={() => setIsAddingEntry(false)}>
							Cancelar
						</Button>

						<Button
							variant="outlined"
							sx={{ backgroundColor: '#434242', color: '#ffffff' }}
							endIcon={<SaveIcon />}
							onClick={HandleSave}
						>
							Guardar
						</Button>
					</Box>
				</>
			) : (
				<>
					<Button
						endIcon={<AddTaskIcon />}
						fullWidth
						variant="outlined"
						onClick={() => setIsAddingEntry(true)}
					>
						Agregar tarea
					</Button>
				</>
			)}
		</Box>
	);
};

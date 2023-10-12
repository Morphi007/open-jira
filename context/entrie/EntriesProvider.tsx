import React, { FC, useReducer, useEffect } from 'react';
import { EntriesContext, entriesReducer } from './';
import { useSnackbar } from 'notistack';


import { Entry } from '../../interfaces';
import entriesApi from '@/apis/entriesApis';

export interface EntriesState {
	entries: Entry[];

}

interface Props {
	children?: React.ReactNode | undefined;
}

const Entries_INITIAL_STATE: EntriesState = {
	entries: [],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

     //enviar datos 
	const addNeEntry = async (description: string) => {
		const {data}= await entriesApi.post<Entry>('/entries',{description});

		dispatch({ type: '[Entries] - add-Entry', payload: data });
	};

	//actulizar datos 
	const updateEntry = async({_id,description,status}:Entry,showSnackbar=false) => {
		try {
			const {data}= await entriesApi.put<Entry>(`/entries/${_id}`,{description,status});
        dispatch({ type: '[Entries] - ENTRY -UPDATED', payload:data });
	      //todo navbar
		  if(showSnackbar){
			enqueueSnackbar("Entrada actualizada",{
				variant:"success",
				anchorOrigin:{
					vertical:"top",
					horizontal:"right"
				}
			  })

		  }
		  

	} catch (error) {
			console.log(error);
		}
	};
 
	//traer datos 
	const refreshEntries = async () => {
		const { data } = await entriesApi.get<Entry[]>('/entries');
		dispatch({ type: '[Entries] - REFRESH-DATA', payload: data });
		//console.log(data);
	};

	useEffect(() => {
		refreshEntries();
	}, []);
   /**________ */
	//returns
	return (
		<EntriesContext.Provider
			value={{
				...state,
				addNeEntry,
				updateEntry,
			}}
		>
			{children}
		</EntriesContext.Provider>
	);
};

import { createContext } from 'react';
import { Entry } from '../../interfaces';

interface ContextProps {
	entries: Entry[];
	//method
	addNeEntry: (description: string) => void;
	updateEntry: (entry: Entry,showSnackbar?:boolean) => void;
}

export const EntriesContext = createContext({} as ContextProps);

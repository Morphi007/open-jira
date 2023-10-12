import { Entry } from '../../interfaces';
import { EntriesState } from './';

type EntriesActionType =
	| { type: '[Entries] - add-Entry'; payload: Entry }
	| { type: '[Entries] - ENTRY -UPDATED'; payload: Entry }
	| { type: '[Entries] - REFRESH-DATA'; payload: Entry[] }

export const entriesReducer = (
	state: EntriesState,
	action: EntriesActionType,
): EntriesState => {
	switch (action.type) {
		case '[Entries] - add-Entry':
			return {
				...state,
				entries: [...state.entries, action.payload],
			}
		case '[Entries] - ENTRY -UPDATED':
			return {
				...state,
				entries: state.entries.map((entry) => {
					if (entry._id === action.payload._id) {
						entry.status = action.payload.status;
						entry.description = action.payload.description;
					}
					return entry;
				}),
			}
		case "[Entries] - REFRESH-DATA":
			return {
				...state,
				entries: [...action.payload]
			};
		default:
			return state;
	}
};

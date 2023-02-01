import { Contents } from "./Contents";

export interface MeaningState {
	meanings: Meaning[];
	loading: boolean;
	error: null | string;
}

export enum MeaningActionsTypes {
	FETCH__MEANING = 'FETCH__MEANING',
	FETCH__MEANING__SUCCESS = 'FETCH__MEANING__SUCCESS',
	FETCH__MEANING__ERROR = 'FETCH__MEANING__ERROR',
}

interface FetchMeaningsAction {
	type: MeaningActionsTypes.FETCH__MEANING;
}
interface FetchMeaningsSuccessAction {
	type: MeaningActionsTypes.FETCH__MEANING__SUCCESS,
	payload: Meaning[];
}
interface FetchMeaningsErrorAction {
	type: MeaningActionsTypes.FETCH__MEANING__ERROR,
	payload: string;
}

export type MeaningAction = FetchMeaningsAction | FetchMeaningsSuccessAction | FetchMeaningsErrorAction;

export interface Meaning {
	name: string;
	paramName: string;
	content: Contents[] | null;
	available: boolean;
	_id: string;
}

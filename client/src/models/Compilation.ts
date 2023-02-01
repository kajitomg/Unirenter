import { Meaning } from "./Meaning";

export enum CompilationActionTypes {
	FETCH__COMPILATION = 'FETCH_COMPILATION',
	FETCH__COMPILATION__SUCCESS = 'FETCH_COMPILATION__SUCCESS',
	FETCH__COMPILATION__ERROR = 'FETCH_COMPILATION__ERROR',
}

export interface CompilationState {
	compilations: Compilation[];
	loading: boolean;
	error: null | string;
}
interface FetchCompilationAction {
	type: CompilationActionTypes.FETCH__COMPILATION;
}
interface FetchCompilationSuccessAction {
	type: CompilationActionTypes.FETCH__COMPILATION__SUCCESS;
	payload: Compilation[];
}
interface FetchCompilationErrorAction {
	type: CompilationActionTypes.FETCH__COMPILATION__ERROR;
	payload: string;
}

export type CompilationAction = FetchCompilationAction | FetchCompilationSuccessAction | FetchCompilationErrorAction

export interface Compilation {
	name: string;
	paramName: string;
	meanings: Meaning[] | null;
	available: boolean;
	_id: string;
}
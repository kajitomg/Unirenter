import { Meaning } from "./Meaning";

export enum FilterActionTypes {
	FETCH__FILTERS = 'FETCH__FILTERS',
	FETCH__FILTERS__SUCCESS = 'FETCH__FILTERS__SUCCESS',
	FETCH__FILTERS__ERROR = 'FETCH__FILTERS__ERROR',
	CLEAR__FILTERS = 'CLEAR__FILTERS',
	UPDATE__AVAILABLE__FILTER = 'UPDATE__AVAILABLE__FILTER',
	DELETE__AVAILABLE__FILTER = 'DELETE__AVAILABLE__FILTER'
}
export interface FilterState {
	filters: Filter[];
	availabled: Filter[];
	loading: boolean;
	error: null | string;

}

interface FetchFiltersAction {
	type: FilterActionTypes.FETCH__FILTERS;
}
interface FetchFiltersSuccessAction {
	type: FilterActionTypes.FETCH__FILTERS__SUCCESS;
	payload: Filter[]
}
interface FetchFiltersErrorAction {
	type: FilterActionTypes.FETCH__FILTERS__ERROR;
	payload: string;
}
interface ClearFiltersAction {
	type: FilterActionTypes.CLEAR__FILTERS;
}
interface UpdateAvailableFilterAction {
	type: FilterActionTypes.UPDATE__AVAILABLE__FILTER;
	payload: Filter[];
}


export type FilterAction = FetchFiltersAction | FetchFiltersSuccessAction | FetchFiltersErrorAction | ClearFiltersAction | UpdateAvailableFilterAction


export interface Filter {
	name: string;
	paramName: string;
	type: string;
	meanings: Meaning[] | null;
	available: boolean;
	_id: string;
}
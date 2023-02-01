import { Filter } from "./Filter";
import { Meaning } from "./Meaning";

export enum CategoryActionTypes {
	FETCH__CATEGORY = 'FETCH__CATEGORY',
	FETCH__CATEGORY__SUCCESS = 'FETCH__CATEGORY__SUCCESS',
	FETCH__CATEGORY__ERROR = 'FETCH__CATEGORY__ERROR',
	UPDATE__AVAILABLE__CATEGORY = 'UPDATE__AVAILABLE__CATEGORY'
}

export interface CategoryState {
	categories: Category[];
	availabled: Category[];
	loading: boolean;
	error: null | string;
}
interface FetchCategoryAction {
	type: CategoryActionTypes.FETCH__CATEGORY;
}
interface FetchCategorySuccessAction {
	type: CategoryActionTypes.FETCH__CATEGORY__SUCCESS;
	payload: Category[];
}
interface FetchCategoryErrorAction {
	type: CategoryActionTypes.FETCH__CATEGORY__ERROR;
	payload: string;
}
interface UpdateAvailableCategoryAction {
	type: CategoryActionTypes.UPDATE__AVAILABLE__CATEGORY;
	payload: Category[];
}

export type CategoryAction = FetchCategoryAction | FetchCategorySuccessAction | FetchCategoryErrorAction | UpdateAvailableCategoryAction

export interface Category {
	name: string;
	paramName: string;
	meanings: Meaning[] | null;
	filters: Filter[];
	compilatons: Filter[] | null;
	available: boolean;
	_id: string;
}
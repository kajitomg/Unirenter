import { Category } from "./Category";
import { Filter } from "./Filter";
import { Meaning } from "./Meaning";

export enum CollectionActionTypes {
	FETCH__COLLECTIONS = 'FETCH__COLLECTIONS',
	FETCH__COLLECTIONS__SUCCESS = 'FETCH__COLLECTIONS__SUCCESS',
	FETCH__COLLECTIONS__ERROR = 'FETCH__COLLECTIONS__ERROR',
	UPLOAD__COLLECTIONS__SUCCESS = 'UPLOAD__COLLECTIONS__SUCCESS',
	UPDATE__PAGES__SUCCESS = 'UPDATE__PAGES__SUCCESS',
	UPDATE__PAGE__SUCCESS = 'UPDATE__PAGE__SUCCESS',
	CLEAR__COLLECTIONS__SUCCESS = 'CLEAR__COLLECTIONS__SUCCESS'
}

export interface CollectionState {
	collections: Collection[];
	pages: number;
	page: number;
	loading: boolean;
	error: null | string;
}

interface FetchCollectionAction {
	type: CollectionActionTypes.FETCH__COLLECTIONS;
}
interface FetchCollectionSuccessAction {
	type: CollectionActionTypes.FETCH__COLLECTIONS__SUCCESS;
	payload: Collection[];
}
interface ClearCollectionsAction {
	type: CollectionActionTypes.CLEAR__COLLECTIONS__SUCCESS;
}
interface UpdatePagesAction {
	type: CollectionActionTypes.UPDATE__PAGES__SUCCESS;
	payload: number;
}
interface UpdatePageAction {
	type: CollectionActionTypes.UPDATE__PAGE__SUCCESS;
	payload: number;
}
interface FetchCollectionErrorAction {
	type: CollectionActionTypes.FETCH__COLLECTIONS__ERROR;
	payload: string;
}

export type CollectionAction = FetchCollectionAction | FetchCollectionSuccessAction | FetchCollectionErrorAction | UpdatePagesAction | UpdatePageAction | ClearCollectionsAction;

export interface Collection {
	category: Category;
	filter: Filter;
	meaning: Meaning;
	numberOfProducts: number;
	image: string;
	_id: string;
}
import { Category } from "./Category";
import { Filter } from "./Filter";


export enum ProductActionTypes {
	FETCH__PRODUCTS = 'FETCH__PRODUCTS',
	FETCH__PRODUCTS__SUCCESS = 'FETCH__PRODUCTS__SUCCESS',
	FETCH__PRODUCTS__ERROR = 'FETCH__PRODUCTS__ERROR',
	SET__PRODUCT = 'SET__PRODUCT',
	UPDATE__AVAILABLE__PRODUCT = 'UPDATE__AVAILABLE__PRODUCT',
	CLEAR__PRODUCTS__SUCCESS = 'CLEAR__PRODUCTS__SUCCESS',
	UPDATE__PAGES__SUCCESS = 'UPDATE__PAGES__SUCCESS',
	UPDATE__PAGE__SUCCESS = 'UPDATE__PAGE__SUCCESS',
	SEARCH__PRODUCTS__SUCCESS = 'SEARCH__PRODUCTS__SUCCESS'

}
export interface ProductState {
	products: Product[],
	availabled: Product[],
	page: number,
	pages: number,
	loading: boolean,
	error: null | string
}

interface FetchProductAction {
	type: ProductActionTypes.FETCH__PRODUCTS,
}
interface FetchProductSuccessAction {
	type: ProductActionTypes.FETCH__PRODUCTS__SUCCESS;
	payload: Product[];
}
interface SearchProductSuccessAction {
	type: ProductActionTypes.SEARCH__PRODUCTS__SUCCESS;
	payload: Product[];
}
interface ClearProductSuccessAction {
	type: ProductActionTypes.CLEAR__PRODUCTS__SUCCESS;

}
interface UpdatePagesSuccessAction {
	type: ProductActionTypes.UPDATE__PAGES__SUCCESS;
	payload: number;
}
interface UpdatePageSuccessAction {
	type: ProductActionTypes.UPDATE__PAGE__SUCCESS;
	payload: number;
}
interface FetchProductErrorAction {
	type: ProductActionTypes.FETCH__PRODUCTS__ERROR;
	payload: string;
}
interface SetProductAction {
	type: ProductActionTypes.SET__PRODUCT;
	payload: Product[];
}
interface UpdateAvailableProductAction {
	type: ProductActionTypes.UPDATE__AVAILABLE__PRODUCT;
	payload: Product[];
}

export type ProductAction = FetchProductErrorAction | FetchProductSuccessAction | FetchProductAction | SetProductAction | UpdateAvailableProductAction | ClearProductSuccessAction | UpdatePagesSuccessAction | UpdatePageSuccessAction | SearchProductSuccessAction

export interface Product {
	name: string;
	priceSell: number;
	priceRental: number;
	images: string[];
	category: Category;
	filters: Filter[];
	article: string;
	like: boolean;
	_id: string;
}
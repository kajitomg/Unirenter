import { ProductAction, ProductActionTypes, ProductState } from "../../models/Product"


const defaultState: ProductState = {
	products: [],
	availabled: [],
	page: 0,
	pages: 0,
	loading: false,
	error: null,
}

export const productReducer = (state = defaultState, action: ProductAction): ProductState => {
	switch (action.type) {
		case ProductActionTypes.FETCH__PRODUCTS:
			return {
				...state,
				loading: true,
				error: null
			}
		case ProductActionTypes.UPDATE__AVAILABLE__PRODUCT:
			return {
				...state,
				availabled: action.payload,
			}
		case ProductActionTypes.FETCH__PRODUCTS__SUCCESS:
			return {
				...state,
				products: [...state.products, ...action.payload],
				loading: false,
				error: null
			}
		case ProductActionTypes.UPDATE__PAGES__SUCCESS:
			return {
				...state,
				pages: action.payload
			}
		case ProductActionTypes.SEARCH__PRODUCTS__SUCCESS:
			return {
				...state,
				products: action.payload,
				loading: false,
				error: null
			}
		case ProductActionTypes.UPDATE__PAGE__SUCCESS:
			return {
				...state,
				page: action.payload
			}
		case ProductActionTypes.CLEAR__PRODUCTS__SUCCESS:
			return {
				...state,
				products: []
			}
		case ProductActionTypes.FETCH__PRODUCTS__ERROR:
			return {
				...state,
				products: [],
				loading: false,
				error: action.payload
			}
		case ProductActionTypes.SET__PRODUCT:
			return {
				...state,
				products: action.payload,
				loading: false,
				error: null
			}

		default:
			return state
	}
}
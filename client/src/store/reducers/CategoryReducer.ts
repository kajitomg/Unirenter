import { Category, CategoryAction, CategoryActionTypes, CategoryState } from "../../models/Category";


const defaultState: CategoryState = {
	categories: [],
	availabled: [],
	loading: false,
	error: null,
}

export const categoryReducer = (state = defaultState, action: CategoryAction): CategoryState => {
	switch (action.type) {
		case CategoryActionTypes.FETCH__CATEGORY:
			return {
				...state,
				categories: [],
				loading: true,
				error: null,
			}
		case CategoryActionTypes.UPDATE__AVAILABLE__CATEGORY:
			return {
				...state,
				availabled: action.payload,
			}
		case CategoryActionTypes.FETCH__CATEGORY__SUCCESS:
			return {
				...state,
				categories: action.payload,
				loading: false,
				error: null,
			}
		case CategoryActionTypes.FETCH__CATEGORY__ERROR:
			return {
				...state,
				categories: [],
				loading: false,
				error: action.payload,
			}

		default:
			return state
	}
}
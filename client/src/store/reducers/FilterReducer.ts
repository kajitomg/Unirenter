import { FilterAction, FilterActionTypes, FilterState } from "../../models/Filter";


const defaultState: FilterState = {
	filters: [],
	availabled: [],
	loading: false,
	error: null,
}

export const filterReducer = (state = defaultState, action: FilterAction): FilterState => {
	switch (action.type) {
		case FilterActionTypes.FETCH__FILTERS:
			return {
				...state,
				loading: true,
				error: null,
				filters: []
			}
		case FilterActionTypes.UPDATE__AVAILABLE__FILTER:
			return {
				...state,
				availabled: action.payload,
			}
		case FilterActionTypes.FETCH__FILTERS__SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				filters: action.payload
			}
		case FilterActionTypes.FETCH__FILTERS__ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
				filters: []
			}
		case FilterActionTypes.CLEAR__FILTERS:
			return {
				...state,
				loading: false,
				error: null,
				filters: []
			}
		default:
			return state
	}

}

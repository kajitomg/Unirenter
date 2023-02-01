import { CollectionAction, CollectionActionTypes, CollectionState } from "../../models/Collection"


const defaultState: CollectionState = {
	collections: [],
	pages: 0,
	page: 0,
	loading: false,
	error: null,
}

export const collectionReducer = (state = defaultState, action: CollectionAction): CollectionState => {
	switch (action.type) {
		case CollectionActionTypes.FETCH__COLLECTIONS:
			return {
				...state,
				loading: true,
				error: null,
			}
		case CollectionActionTypes.CLEAR__COLLECTIONS__SUCCESS:
			return {
				...state,
				collections: [],
			}
		case CollectionActionTypes.FETCH__COLLECTIONS__SUCCESS:
			return {
				...state,
				collections: [...state.collections, ...action.payload],
				loading: false,
				error: null,
			}
		case CollectionActionTypes.UPDATE__PAGES__SUCCESS:
			return {
				...state,
				pages: action.payload,
			}
		case CollectionActionTypes.UPDATE__PAGE__SUCCESS:
			return {
				...state,
				page: action.payload,
			}
		case CollectionActionTypes.FETCH__COLLECTIONS__ERROR:
			return {
				...state,
				collections: [],
				loading: false,
				error: action.payload,
			}

		default:
			return state
	}
}
import { AddressAction, AddressActionTypes, AddressState } from "../../models/Address";


const defaultState: AddressState = {
	address: null,
	loading: false,
	error: null,
}

export const addressReducer = (state = defaultState, action: AddressAction): AddressState => {
	switch (action.type) {
		case AddressActionTypes.FETCH__ADDRESS:
			return {
				...state,
				address: null,
				loading: true,
				error: null,
			}
		case AddressActionTypes.FETCH__ADDRESS__SUCCESS:
			return {
				...state,
				address: action.payload,
				loading: false,
				error: null,
			}
		case AddressActionTypes.FETCH__ADDRESS__ERROR:
			return {
				...state,
				address: null,
				loading: false,
				error: action.payload,
			}

		default:
			return state
	}
}
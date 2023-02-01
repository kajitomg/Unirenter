import { MeaningAction, MeaningActionsTypes, MeaningState } from "../../models/Meaning";

const defaultState: MeaningState = {
	meanings: [],
	loading: false,
	error: null,
}

export const meaningReducer = (state = defaultState, action: MeaningAction): MeaningState => {
	switch (action.type) {
		case MeaningActionsTypes.FETCH__MEANING:
			return {
				...state,
				meanings: [],
				loading: true,
				error: null,
			}
		case MeaningActionsTypes.FETCH__MEANING__SUCCESS:
			return {
				...state,
				meanings: action.payload,
				loading: false,
				error: null,
			}
		case MeaningActionsTypes.FETCH__MEANING__ERROR:
			return {
				...state,
				meanings: [],
				loading: false,
				error: action.payload,
			}

		default:
			return state;
	}
}
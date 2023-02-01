import { RecordAction, RecordActionTypes, RecordState } from "../../models/Record"


const defaultState: RecordState = {
	loading: false,
	error: null,
}

export const recordReducer = (state = defaultState, action: RecordAction): RecordState => {
	switch (action.type) {
		case RecordActionTypes.SET__RECORD:
			return {
				loading: true,
				error: null
			}
		case RecordActionTypes.SET__RECORD__SUCCESS:
			return {
				...state,
				loading: false,
			}
		case RecordActionTypes.SET__RECORD__ERROR:
			return {
				loading: false,
				error: action.payload
			}

		default:
			return state
	}
}
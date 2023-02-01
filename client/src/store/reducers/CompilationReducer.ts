import { CompilationAction, CompilationActionTypes, CompilationState } from "../../models/Compilation"

const defalultState: CompilationState = {
	compilations: [],
	loading: false,
	error: null,
}

export const compilationReducer = (state = defalultState, action: CompilationAction): CompilationState => {
	switch (action.type) {
		case CompilationActionTypes.FETCH__COMPILATION:
			return {
				...state,
				compilations: [],
				loading: true,
				error: null
			}
		case CompilationActionTypes.FETCH__COMPILATION__SUCCESS:
			return {
				...state,
				compilations: action.payload,
				loading: false,
				error: null
			}
		case CompilationActionTypes.FETCH__COMPILATION__ERROR:
			return {
				...state,
				compilations: [],
				loading: false,
				error: action.payload
			}

		default:
			return state
	}
}
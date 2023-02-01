import axios from "axios"
import { Dispatch } from "redux"
import { CompilationAction, CompilationActionTypes } from "../../models/Compilation"
import { Paths } from "../../paths"

export const fetchCompilationAction = () => {
	return async (dispatch: Dispatch<CompilationAction>) => {
		try {
			dispatch({
				type: CompilationActionTypes.FETCH__COMPILATION
			})
			const response = await axios.get(`${Paths.APIUrl}api/compilation/get`)
			return dispatch({
				type: CompilationActionTypes.FETCH__COMPILATION__SUCCESS,
				payload: response.data
			})
		} catch (e) {
			return dispatch({
				type: CompilationActionTypes.FETCH__COMPILATION__ERROR,
				payload: 'Произошла ошибка при загрузке подборок'
			})
		}
	}
}
import axios from "axios"
import { Dispatch } from "redux"
import { Meaning, MeaningAction, MeaningActionsTypes } from "../../models/Meaning"
import { Paths } from "../../paths"

interface meaningResponse {
	data: Meaning[]
}

export const FetchMeaningAction = () => {
	return async (dispatch: Dispatch<MeaningAction>) => {
		try {
			dispatch({ type: MeaningActionsTypes.FETCH__MEANING })
			const response: meaningResponse = await axios.post(`${Paths.APIUrl}api/meaning/get`,)
			return dispatch({
				type: MeaningActionsTypes.FETCH__MEANING__SUCCESS,
				payload: response.data
			})
		} catch (error) {
			return dispatch({
				type: MeaningActionsTypes.FETCH__MEANING__ERROR,
				payload: 'Произошла ошибка при загрузке подкатегорий'
			})
		}
	}
}
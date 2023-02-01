import axios from "axios"
import { Dispatch } from "redux"
import { Address } from "../../models/Address"
import { RecordAction, RecordActionTypes } from "../../models/Record"
import { Paths } from "../../paths"



export const setRecordAction = (phonenumber: string | null, address: Address | null) => {
	return async (dispatch: Dispatch<RecordAction>) => {
		try {
			dispatch({
				type: RecordActionTypes.SET__RECORD
			})
			await axios.post(`${Paths.APIUrl}api/record/create`, { phonenumber, address })
			return dispatch({
				type: RecordActionTypes.SET__RECORD__SUCCESS,
			})
		} catch (e) {
			return dispatch({
				type: RecordActionTypes.SET__RECORD__ERROR,
				payload: 'Произошла ошибка отправке телефона'
			})
		}
	}
}
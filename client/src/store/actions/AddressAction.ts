import axios from "axios"
import { Dispatch } from "redux"
import { Address, AddressAction, AddressActionTypes } from "../../models/Address"
import { Paths } from "../../paths"

interface Response {
	data: Address[];
}


export const fetchAddressAction = (city: string) => {
	return async (dispatch: Dispatch<AddressAction>) => {
		try {
			dispatch({
				type: AddressActionTypes.FETCH__ADDRESS
			})
			const response: Response = await axios.post(`${Paths.APIUrl}api/address/post`, { city })

			return dispatch({
				type: AddressActionTypes.FETCH__ADDRESS__SUCCESS,
				payload: response.data[0]
			})
		} catch (e) {
			return dispatch({
				type: AddressActionTypes.FETCH__ADDRESS__ERROR,
				payload: 'Произошла ошибка при загрузке категорий'
			})
		}
	}
}
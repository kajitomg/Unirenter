import axios from "axios"
import { Dispatch } from "redux"
import { CollectionAction, CollectionActionTypes } from "../../models/Collection"
import { Paths } from "../../paths"


export const fetchCollectionAction = (page: number) => {
	return async (dispatch: Dispatch<CollectionAction>) => {
		try {
			dispatch({
				type: CollectionActionTypes.FETCH__COLLECTIONS
			})
			const response = await axios.post(`${Paths.APIUrl}api/collection/get`, {
				page
			})
			dispatch({
				type: CollectionActionTypes.UPDATE__PAGES__SUCCESS,
				payload: response.data.pages
			})
			dispatch({
				type: CollectionActionTypes.UPDATE__PAGE__SUCCESS,
				payload: response.data.page
			})
			return dispatch({
				type: CollectionActionTypes.FETCH__COLLECTIONS__SUCCESS,
				payload: response.data.collections
			})
		} catch (e) {
			dispatch({
				type: CollectionActionTypes.FETCH__COLLECTIONS__ERROR,
				payload: "Произошла ошибка при загрузке коллекций"
			})

		}
	}
}
export const clearCollectionAction = () => {
	return async (dispatch: Dispatch<CollectionAction>) => {
		try {
			dispatch({
				type: CollectionActionTypes.CLEAR__COLLECTIONS__SUCCESS
			})
		} catch (e) {
			dispatch({
				type: CollectionActionTypes.FETCH__COLLECTIONS__ERROR,
				payload: "Произошла ошибка при отчистке коллекций"
			})

		}
	}
}
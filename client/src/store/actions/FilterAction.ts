import axios from "axios"
import { Dispatch } from "redux"
import { Filter, FilterAction, FilterActionTypes } from "../../models/Filter"
import { availabledParams } from "../../models/Url/availabledParams";
import { Paths } from "../../paths"

interface FilterResponse {
	data: Filter[];
}


export const fetchFilterAction = (filters: Filter[], stateFilters: Filter[]) => {
	return async (dispatch: Dispatch<FilterAction>) => {
		try {

			dispatch({ type: FilterActionTypes.FETCH__FILTERS })
			const response: FilterResponse = await axios.post(`${Paths.APIUrl}api/filter/get`, {
				filters
			}
			)
			if (stateFilters.length === 0) {
				await availabledParams(response.data, 1)
			}

			return dispatch({
				type: FilterActionTypes.FETCH__FILTERS__SUCCESS,
				payload: response.data
			})
		} catch (e) {
			return dispatch({
				type: FilterActionTypes.FETCH__FILTERS__ERROR,
				payload: 'Произошла ошибка при загрузке фильтров'
			})
		}
	}
}
export const clearFilterAction = () => {
	return async (dispatch: Dispatch<FilterAction>) => {
		try {

			return dispatch({ type: FilterActionTypes.CLEAR__FILTERS })

		} catch (e) {
			return dispatch({
				type: FilterActionTypes.FETCH__FILTERS__ERROR,
				payload: 'Произошла ошибка при очистке фильтров'
			})
		}
	}
}
export const updateAvailabledFiltersAction = (filters: Filter[]) => {
	return async (dispatch: Dispatch<FilterAction>) => {
		try {
			const tempFilters: Filter[] = []
			filters.map((filter) => {
				if (filter.available) {
					tempFilters.push(filter)
				}
			})
			dispatch({
				type: FilterActionTypes.UPDATE__AVAILABLE__FILTER,
				payload: tempFilters
			})
		} catch (e) {
			return dispatch({
				type: FilterActionTypes.FETCH__FILTERS__ERROR,
				payload: 'Произошла ошибка при очистке фильтров'
			})
		}
	}
}
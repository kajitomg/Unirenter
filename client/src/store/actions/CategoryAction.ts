import axios from "axios"
import { Dispatch } from "redux"
import { Category, CategoryAction, CategoryActionTypes } from "../../models/Category"
import { availabledParams } from "../../models/Url/availabledParams"
import { Paths } from "../../paths"

interface CategoryResponse {
	data: Category[]
}


export const fetchCategoryAction = () => {
	return async (dispatch: Dispatch<CategoryAction>) => {
		try {
			dispatch({
				type: CategoryActionTypes.FETCH__CATEGORY
			})
			const response: CategoryResponse = await axios.get(`${Paths.APIUrl}api/category/get`)

			availabledParams(response.data, 0)

			return dispatch({
				type: CategoryActionTypes.FETCH__CATEGORY__SUCCESS,
				payload: response.data
			})
		} catch (e) {
			return dispatch({
				type: CategoryActionTypes.FETCH__CATEGORY__ERROR,
				payload: 'Произошла ошибка при загрузке категорий'
			})
		}
	}
}
export const updateAvailabledCategoriesAction = (categories: Category[]) => {
	return async (dispatch: Dispatch<CategoryAction>) => {
		try {
			const tempCategories: Category[] = []
			categories.map((category) => {
				if (category.available) {
					tempCategories.push(category)
				}
			})
			dispatch({
				type: CategoryActionTypes.UPDATE__AVAILABLE__CATEGORY,
				payload: tempCategories
			})
		} catch (e) {
			return dispatch({
				type: CategoryActionTypes.FETCH__CATEGORY__ERROR,
				payload: 'Произошла ошибка при загрузке категорий'
			})
		}
	}
}
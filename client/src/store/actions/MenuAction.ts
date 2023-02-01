import axios from "axios"
import { Dispatch } from "redux"
import { Menu, MenuAction, MenuActionTypes } from "../../models/Menu"
import { availabledParams } from "../../models/Url/availabledParams"
import { Paths } from "../../paths"

interface menuResponse {
	data: Menu[]
}

export const fetchMenuAction = () => {
	return async (dispatch: Dispatch<MenuAction>) => {
		try {
			dispatch({
				type: MenuActionTypes.FETCH__MENU
			})
			const response: menuResponse = await axios.get(`${Paths.APIUrl}api/menu/get`)

			availabledParams(response.data, 2)

			return dispatch({
				type: MenuActionTypes.FETCH__MENU__SUCCESS,
				payload: response.data
			})
		} catch (e) {
			return dispatch({
				type: MenuActionTypes.FETCH__MENU__ERROR,
				payload: 'Произошла ошибка при загрузке меню'
			})
		}
	}
}
export const updateAvailabledMenusAction = (menus: Menu[]) => {
	return async (dispatch: Dispatch<MenuAction>) => {
		try {
			const tempMenus: Menu[] = []
			menus.map((menu) => {
				if (menu.available) {
					tempMenus.push(menu)
				}
			})
			dispatch({
				type: MenuActionTypes.UPDATE__AVAILABLE__MENU,
				payload: tempMenus
			})
		} catch (e) {
			return dispatch({
				type: MenuActionTypes.FETCH__MENU__ERROR,
				payload: 'Произошла ошибка при загрузке меню'
			})
		}
	}
}
import { MenuAction, MenuActionTypes, MenuState } from "../../models/Menu"


const defaultState: MenuState = {
	menus: [],
	availabled: [],
	loading: false,
	error: null,
}

export const menuReducer = (state = defaultState, action: MenuAction): MenuState => {
	switch (action.type) {
		case MenuActionTypes.FETCH__MENU:
			return {
				...state,
				menus: [],
				loading: true,
				error: null,
			}
		case MenuActionTypes.UPDATE__AVAILABLE__MENU:
			return {
				...state,
				availabled: action.payload,
			}
		case MenuActionTypes.FETCH__MENU__SUCCESS:
			return {
				...state,
				menus: action.payload,
				loading: false,
				error: null,
			}
		case MenuActionTypes.FETCH__MENU__ERROR:
			return {
				...state,
				menus: [],
				loading: false,
				error: action.payload,
			}


		default:
			return state
	}
}
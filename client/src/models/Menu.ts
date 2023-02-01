import { Meaning } from "./Meaning";

export enum MenuActionTypes {
	FETCH__MENU = 'FETCH__MENU',
	FETCH__MENU__SUCCESS = 'FETCH__MENU__SUCCESS',
	FETCH__MENU__ERROR = 'FETCH__MENU__ERROR',
	UPDATE__AVAILABLE__MENU = 'UPDATE__AVAILABLE__MENU'
}

export interface MenuState {
	menus: Menu[];
	availabled: Menu[];
	loading: boolean;
	error: null | string;
}

interface FetchMenuAction {
	type: MenuActionTypes.FETCH__MENU;
}
interface FetchMenuSuccessAction {
	type: MenuActionTypes.FETCH__MENU__SUCCESS;
	payload: Menu[];
}
interface FetchMenuErrorAction {
	type: MenuActionTypes.FETCH__MENU__ERROR;
	payload: string;
}
interface UpdateAvailableMenuAction {
	type: MenuActionTypes.UPDATE__AVAILABLE__MENU;
	payload: Menu[];
}

export type MenuAction = FetchMenuAction | FetchMenuSuccessAction | FetchMenuErrorAction | UpdateAvailableMenuAction

export interface Menu {
	name: string;
	paramName: string;
	meanings: Meaning[] | null;
	available: boolean;
	_id: string;
}
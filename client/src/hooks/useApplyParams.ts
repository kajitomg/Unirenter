import { useNavigate } from "react-router-dom"
import { searchAvailable } from "./useSearchAvailable"
import { useTypedSelector } from "./useTypedSelector"
import { makeParamString } from "../models/Url"
import { Menu } from "../models/Menu"
import { Filter } from "../models/Filter"
import { Category } from "../models/Category"

export const useApplyParams = () => {
	const navigate = useNavigate()

	const { categories } = useTypedSelector(state => state.category)
	const { filters } = useTypedSelector(state => state.filter)
	const { menus } = useTypedSelector(state => state.menu)

	return function (path: null | string = null, category: null | Category[] = null, filter: null | Filter[] = null, menu: null | Menu[] = null) {
		navigate(`${path ? path : ''}?${makeParamString(searchAvailable(category ? category : categories, filter ? filter : filters, menu ? menu : menus))}`)
	}
}
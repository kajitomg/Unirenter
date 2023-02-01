import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import * as filterActions from '../store/actions/FilterAction'
import * as categoryActions from '../store/actions/CategoryAction'
import * as menuActions from '../store/actions/MenuAction'
import * as compilationActions from '../store/actions/CompilationAction'
import * as productActions from '../store/actions/ProductAction'
import * as collectionActions from '../store/actions/CollectionAction'
import * as meaningActions from '../store/actions/MeaningAction'
import * as addressActions from '../store/actions/AddressAction'
import * as recordActions from '../store/actions/RecordAction'

const actions = {
	...filterActions,
	...categoryActions,
	...menuActions,
	...compilationActions,
	...productActions,
	...collectionActions,
	...meaningActions,
	...addressActions,
	...recordActions
}
export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(actions, dispatch)
}
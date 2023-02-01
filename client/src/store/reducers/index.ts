import { combineReducers } from "redux";
import { categoryReducer } from "./CategoryReducer";
import { compilationReducer } from "./CompilationReducer";
import { filterReducer } from "./FilterReducer";
import { menuReducer } from "./MenuReducer";
import { productReducer } from "./ProductReducer";
import { collectionReducer } from "./CollectionReducer";
import { meaningReducer } from "./MeaningReducer";
import { addressReducer } from "./AddressReducer";
import { recordReducer } from "./RecordReducer";

export const rootReducer = combineReducers({
	filter: filterReducer,
	category: categoryReducer,
	menu: menuReducer,
	compilation: compilationReducer,
	product: productReducer,
	collection: collectionReducer,
	meaning: meaningReducer,
	address: addressReducer,
	record: recordReducer,
})

export type RootState = ReturnType<typeof rootReducer>
import { ICategoryMenu } from "./Category";
import { IFilterMenu } from "./Filter";
import { IMeaning } from "./Meaning";

export interface Collection {
	category: ICategoryMenu;
	filter: IFilterMenu;
	meaning: IMeaning;
	numberOfProducts: number;
	image: string;
	_id: string;
}
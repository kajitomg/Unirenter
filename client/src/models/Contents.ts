import { Category } from "./Category";
import { Compilation } from "./Compilation";
import { Filter } from "./Filter";
import { Menu } from "./Menu";


export interface Contents {
	name: string;
	available: boolean;
	paramName: string;
}

export type Content = Category | Compilation | Filter | Menu
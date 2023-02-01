import { Schema, model } from 'mongoose';
import { ObjectId } from 'mongoose-typescript';
const Meaning = require("./Meaning");


interface IFilter {
	name: string;
	paramName: string;
	available: boolean;
	_id: string;
}
export interface IFilterProduct extends IFilter {
	meaning: typeof Meaning | null;
}

export interface IFilterMenu extends IFilter {
	type: string;
	meanings: typeof Meaning[] | null;

}

const filterMenuSchema = new Schema<IFilterMenu>({
	name: { type: "string", required: true },
	paramName: { type: "string", required: true },
	type: { type: "string", required: true },
	meanings: [{ type: "Object" }],
	available: { type: "boolean", required: true },
});

const filterProductSchema = new Schema<IFilterProduct>({
	name: { type: "string", required: true },
	paramName: { type: "string", required: true },
	meaning: [{ type: "Object" }],
	available: { type: "boolean", required: true },
});

export const FilterMenu = model<IFilterMenu>('Filters', filterMenuSchema);
export const FilterProduct = model<IFilterProduct>('ProductFilters', filterProductSchema);

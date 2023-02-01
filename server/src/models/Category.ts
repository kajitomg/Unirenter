import { Schema, model, connect } from 'mongoose';
import { ObjectId } from 'mongoose-typescript';
const Compilation = require("./Compilation");
const Filter = require("./Filter");
const Meaning = require("./Meaning");


export interface ICategory {
	name: string;
	paramName: string;
	available: boolean;
	_id: string;
}
export interface ICategoryMenu extends ICategory {
	meanings: typeof Meaning[] | null;
	filters: typeof Filter[] | typeof ObjectId | null;
	compilations: typeof Filter[] | typeof ObjectId | null;
}

const categorySchema = new Schema<ICategoryMenu>({
	name: { type: "string", required: true },
	paramName: { type: "string", required: true },
	meanings: [{ type: "Object" }],
	filters: [{ type: ObjectId, ref: "Filter" }],
	compilations: [{ type: ObjectId, ref: "Filter" }],
	available: { type: "boolean", required: true },
});

export const Category = model<ICategoryMenu>('Categories', categorySchema);
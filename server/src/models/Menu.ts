import { Schema, model, connect } from 'mongoose';
import { ObjectId } from 'mongoose-typescript';
const Meaning = require("./Meaning");

export interface IMenu {
	name: string;
	paramName: string;
	type: string;
	meanings: typeof Meaning[] | null;
	available: boolean;
	_id: string;
}

const menuSchema = new Schema<IMenu>({
	name: { type: "string", required: true },
	paramName: { type: "string", required: true },
	type: { type: "string", required: true },
	meanings: [{ type: "Object" }],
	available: { type: "boolean", required: true },
});

export const Menu = model<IMenu>('Menu', menuSchema);
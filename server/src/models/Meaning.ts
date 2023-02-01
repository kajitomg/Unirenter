import { Schema, model, connect } from 'mongoose';
import { type } from 'os';
const Contents = require("./Content");


export interface IMeaning {
	name: string;
	paramName: string;
	content: string[] | null;
	available: boolean;
	_id: string;
}

const meaningSchema = new Schema<IMeaning>({
	name: { type: "string", required: true },
	paramName: { type: "string", required: true },
	content: [{ type: "Object" }],
	available: { type: "boolean", required: true },
});

export const Meaning = model<IMeaning>('Meanings', meaningSchema);
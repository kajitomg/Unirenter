import { Schema, model, connect } from 'mongoose';
import { ObjectId } from 'mongoose-typescript';
import { IFilterMenu } from './Filter';


const compilationSchema = new Schema<IFilterMenu>({
	name: { type: "string", required: true },
	type: { type: "string", required: true },
	meanings: [{ type: ObjectId, ref: "Meaning" }],
	available: { type: "boolean", required: true },
});

export const Compilation = model<IFilterMenu>('Compilations', compilationSchema);
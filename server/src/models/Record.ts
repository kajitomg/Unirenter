import { Schema, model, connect } from 'mongoose';
import { ObjectId } from 'mongoose-typescript';
import { IAddress } from './Address'


export interface IRecord {
	phonenumber: string;
	address: IAddress;
}

const recordSchema = new Schema<IRecord>({
	phonenumber: { type: "string", required: true },
	address: [{ type: "Object" }],
});

export const Record = model<IRecord>('Records', recordSchema);
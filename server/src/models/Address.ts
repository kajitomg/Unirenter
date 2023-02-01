import { Schema, model, connect } from 'mongoose';
import { ObjectId } from 'mongoose-typescript';

export interface IAddress {
	city: string;
	metro: string | null;
	street: string;
	house: string;
	building: string | null;
	phonenumber: string;
	available: boolean;
	id: string;
}

const addressSchema = new Schema<IAddress>({
	city: { type: "string", required: true },
	metro: { type: "string" },
	street: { type: "string", required: true },
	house: { type: "string", required: true },
	building: { type: "string" },
	phonenumber: { type: "string", required: true },
	available: { type: "boolean", required: true },
});

export const Address = model<IAddress>('Addresses', addressSchema);
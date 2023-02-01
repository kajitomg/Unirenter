import { Schema, model, connect } from 'mongoose';
import { ObjectId } from 'mongoose-typescript';
import { ICategory } from './Category';
import { IFilterProduct } from './Filter';
const Category = require("./Category");


export interface IProduct {
	name: string;
	paramName: string;
	priceSell: number;
	priceRental: number;
	images: string[];
	category: ICategory;
	filters: IFilterProduct[]
	article: string;
	like: boolean;
	_id: string;
}

const productSchema = new Schema<IProduct>({
	name: { type: "string", required: true },
	paramName: { type: "string", required: true },
	priceSell: { type: "number", required: true },
	priceRental: { type: "number", required: true },
	images: [{ type: "String", required: true }],
	category: { type: ObjectId, ref: "ICategory", required: true },
	filters: [{ type: "Object", required: true }],
	article: { type: "string", required: true },
	like: { type: "boolean", required: true },
})

export const Product = model<IProduct>('Products', productSchema);
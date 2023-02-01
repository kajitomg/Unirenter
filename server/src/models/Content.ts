import { Schema, model, connect } from 'mongoose';
const Address = require("./Address")

export interface Content {
	name: string,
	available: boolean,
	paramName: string,

}

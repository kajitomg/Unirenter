import { Content } from "../../Contents"
import { makeUrlArrayOfArray } from "./makeUrlArrayOfArray"


export enum paramNames {
	category,
	filter,
	menu
}

export type paramContent = [string, [] | null]
export type paramMeaning = [string, paramContent[] | null]
export type paramElement = [string, paramMeaning[] | null]
export type paramType = [string, paramElement[] | null]


export function makeParams(content: Content[][]) {

	const types = makeUrlArrayOfArray(content)

	let params: paramType[] | null = []
	for (let index = 0; index < types.length; index++) {
		if (types[index])
			params.push([paramNames[index], types[index]])
	}
	return params
}
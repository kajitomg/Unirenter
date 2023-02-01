import { Content, Contents } from "../models/Contents"


export const searchAvailable = (category: Content[], filter: Content[], menu: Content[]) => {

	const types = [category, filter, menu]

	let searchedElements: Content[][] = []
	types.forEach((type, i) => {
		searchedElements.push([])
		type.forEach(element => {
			if (element.available) {
				return searchedElements[i]?.push(element)
			}
		})
	})
	return searchedElements
}

import { Content } from "../../Contents"

export const makeUrlArrayOfArray = (types: Content[][]) => {
	const contents: [string, [string, [string, [] | null][] | null][] | null][][] | null[] = []
	types.map((type, i) => {
		contents[i] = []
		type.map(element => {
			const meanings: [string, [string, [] | null][] | null][] = []

			element.meanings?.map(meaning => {
				const contents: [string, [] | null][] = []
				if (meaning.available) {
					if (meaning.content) {
						meaning.content?.map(content => {
							if (content.available) {
								contents.push([content.paramName, null])
							}
						})
					}
					meanings.push([meaning.paramName, contents.length === 0 ? null : contents])
				}
			})
			if (element.paramName !== 'price') {
				contents[i]?.push([element.paramName, meanings.length === 0 ? null : meanings])
			}
			if (element.paramName === 'price' && i === 1) {
				contents[i]?.push([element.paramName, [['0+10000', null]]])
			}
		})
		if (contents[i]?.length === 0) {
			contents[i] = null
		}
	})
	return contents
}
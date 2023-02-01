import { Category, } from "../Category"
import { Filter, } from "../Filter"
import { Menu, } from "../Menu"
import { paramContent, paramElement, paramMeaning } from "./Makeurl/makeParams"
import { makeUrlArrayOfString } from "./Makeurl/makeUrlArrayOfString"


export const availabledParams = (type: Category[] | Filter[] | Menu[], index: number) => {

	const parsedParams: any[] = makeUrlArrayOfString(window.location.search.substring(1))

	type.map(type => {
		parsedParams[index]?.[1]?.forEach((element: paramElement) => {
			const elementName = element[0]
			const elements = element[1]
			if (type.paramName === elementName) {
				type.available = true
				if (elements !== null && type.meanings && type.meanings.length !== 0) {
					type.meanings.map((meaning) => {
						elements?.forEach((paramMeaning: paramMeaning) => {
							const paramMeaningName = paramMeaning[0]
							const paramMeanings = paramMeaning[1]
							if (meaning.paramName === paramMeaningName) {
								meaning.available = true
								if (paramMeanings !== null && meaning.content && meaning.content.length !== 0) {
									meaning.content.map((content) => {
										paramMeanings?.forEach((paramContent: paramContent) => {
											const paramContentName = paramContent[0]
											if (content.paramName === paramContentName) {
												content.available = true
											}
										})
									})
								}
							}
						})
					})
				}
			}
		})
	})
}
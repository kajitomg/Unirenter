import { Content } from "../../Contents"
import { makeParams, paramContent } from "./makeParams"

export const makeParamString = (availables: Content[][]) => {

	const params = makeParams(availables)

	let paramString: string = ''
	params.map((param: string | any[], i: number) => {
		paramString = paramString + param[0] + (param[1] === null ? '' : '=')
		param[1]?.map((type: string | any[], i: number) => {
			paramString = paramString + type[0] + (type[1] === null ? '' : ':')
			type[1]?.map((meaning: string | any[], i: number) => {
				paramString = paramString + meaning[0] + (meaning[1] === null ? '' : '-')
				meaning[1]?.map((content: string | paramContent[], i: number) => {
					paramString = paramString + content[0] + (meaning[1].length !== i + 1 ? ';' : '')
				})
				paramString = paramString + (type[1].length !== i + 1 ? ',' : '')
			})
			paramString = paramString + (param[1].length !== i + 1 ? '&' : '')
		})
		paramString = paramString + (params.length !== i + 1 ? '/' : '')
	})

	return paramString
}
export const makeUrlArrayOfString = (paramString: string) => {
	let parsedParams: any[] = paramString.split('/').map(element =>
		element.split('=')
	)
	if (!paramString) {
		return parsedParams = [null]
	}
	parsedParams.map(type => {
		type[1] = type[1]?.split('&')
		type[1]?.map((element: any[] | string, i: number) => {
			if (typeof element === 'string') {
				element = element.split(':')
			}
			if (!element[1]) {
				element[1] = null
			}
			if (typeof element[1] === 'string') {
				element[1] = element[1]?.split(',')
			}
			element[1]?.map((meaning: any[] | string, i: number) => {
				if (typeof meaning === 'string') {
					meaning = meaning?.split('-')
				}
				if (!meaning[1]) {
					meaning[1] = null
				}
				if (typeof meaning[1] === 'string') {
					meaning[1] = meaning[1]?.split(';')
				}
				meaning[1]?.map((content: any[] | string, i: number) => {
					if (typeof content === 'string') {
						content = content?.split(',')
					}
					if (!content[1]) {
						content[1] = null
					}
					meaning[1][i] = content
				})
				element[1][i] = meaning
			})
			type[1][i] = element
		})
	})
	return parsedParams
}
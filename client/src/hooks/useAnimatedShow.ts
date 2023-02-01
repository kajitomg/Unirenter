import { useState } from "react"
const status = {
	opened: false,
	hidden: true
}
export const useAnimatedShow = (className: string, duration: number, classes?: any) => {
	const [visible, setVisible] = useState<boolean>(false)
	const [available, setAvailable] = useState<boolean>(false)

	const compiledClass: Array<any> = [className, classes ? available ? classes.available : '' : available ? 'available' : '', classes ? visible ? classes.visible : '' : visible ? 'visible' : '']
	function show() {
		if (status.opened) {
			setVisible(!visible)
			setTimeout(() => {
				setAvailable(!available)
				status.hidden = true
				status.opened = false
			}, duration)
		}
		if (status.hidden) {
			setAvailable(!available)
			setTimeout(() => {
				setVisible(!visible)
				status.opened = true
				status.hidden = false
			}, 0)
		}
	}
	return { compiledClass, show, visible }
}




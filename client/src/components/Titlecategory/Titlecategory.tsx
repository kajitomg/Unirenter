import React, { useEffect, useState } from 'react'
import classes from './Titlecategory.module.scss'

const Titlecategory = () => {

	const [location, setLocation] = useState(window.location)
	useEffect(() => {

		setLocation(window.location)

	}, [window.location.search, window.location.pathname])

	return (
		<section className={[classes.root, !location.pathname.split('/')[2] ? classes.available : ''].join(' ')}>
			<span>Вечерние платья напрокат в Москве</span>
		</section>
	)
}

export { Titlecategory }
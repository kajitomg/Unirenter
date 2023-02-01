import React, { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import classes from './Content.module.scss'

interface ContentProps {
	children: React.ReactNode;
}

const Content: FC<ContentProps> = ({ children }) => {

	const location = useLocation()

	return (
		<section className={[classes.root, location.pathname.split('/')[2] ? classes.small : ''].join(' ')}>
			{children}
		</section>
	)
}

export { Content }
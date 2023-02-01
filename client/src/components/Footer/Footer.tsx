import React, { FC } from 'react'
import { Categories, Details } from './Components'
import classes from './Footer.module.scss'

interface FooterProps {
}

const Footer: FC<FooterProps> = () => {

	return (
		<footer className={classes.root}>
			<Categories />
			<Details />
		</footer>
	)
}

export { Footer }
import React, { FC } from 'react'
import classes from './Modalcontent.module.scss'

interface ModalcontentProps {
	children: React.ReactNode
}

const Modalcontent: FC<ModalcontentProps> = ({ children }) => {
	return (
		<section className={classes.root} onClick={(e) => { e.stopPropagation() }}>
			{children}
		</section>
	)
}

export { Modalcontent }
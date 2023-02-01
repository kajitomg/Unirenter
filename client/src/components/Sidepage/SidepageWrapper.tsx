import React, { FC, useEffect } from 'react'
import { TypeSP, Sidepage } from '../../models/Sidepage'
import classes from './SidepageWrapper.module.scss'

interface SidepageWrapperProps {
	sidepage: Sidepage,
	type: TypeSP,
	children: React.ReactNode
}

const SidepageWrapper: FC<SidepageWrapperProps> = ({ sidepage, type, children }) => {
	return (
		<div className={[classes.root, (sidepage.available && sidepage.type === type) ? classes.available : ''].join(' ')}>
			{children}
		</div>
	)
}

export { SidepageWrapper }
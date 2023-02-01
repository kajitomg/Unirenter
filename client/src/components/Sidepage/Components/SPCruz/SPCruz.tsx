import React, { FC, useEffect } from 'react'
import { Sidepage } from '../../../../models/Sidepage'
import classes from './SPCruz.module.scss'

interface SPCruzProps {
	sidepage: Sidepage;
	rerender: () => void;
}

const SPCruz: FC<SPCruzProps> = ({ rerender, sidepage, }) => {

	return (
		<div className={classes.root} onClick={() => { sidepage.setSidepage(null, sidepage.type?.content, false); rerender() }}>
			<span></span>
			<span></span>
		</div>
	)
}

export { SPCruz }
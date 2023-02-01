import React, { FC, useState } from 'react'
import { TypeSP } from '../../../../models/Sidepage';
import { SPChanger } from '../SPChanger/SPChanger';
import classes from './SPChangersWrapper.module.scss'

interface SPChangersWrapperProps {
	type: TypeSP;
	rerender: () => void;
}

const SPChangersWrapper: FC<SPChangersWrapperProps> = ({ type, rerender }) => {

	return (
		<section className={classes.root}>
			{
				type.changers.map(changer =>
					<SPChanger rerender={rerender} changer={changer} type={type} key={changer._id} />
				)
			}
		</section>
	)
}

export { SPChangersWrapper }
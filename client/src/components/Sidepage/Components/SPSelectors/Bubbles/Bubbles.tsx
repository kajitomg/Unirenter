import React, { FC } from 'react'
import { Meaning } from '../../../../../models/Meaning'
import classes from './Bubbles.module.scss'

interface BubblesProps {
	elements: Meaning[] | null;
}

const Bubbles: FC<BubblesProps> = ({ elements }) => {
	return (
		<ul className={classes.root} onClick={(event) => event.stopPropagation()}>
			<li className={[classes.element].join(' ')} >
				36
			</li>
			<li className={[classes.element].join(' ')} >
				38
			</li>
			<li className={[classes.element, classes.available].join(' ')} >
				40
			</li>
			{/* {
				elements?.map((element) =>
					<li className={[classes.element, element.available ? classes.available : ''].join(' ')} key={element._id}>
						{element.name}
					</li>
				)
			} */}
		</ul>
	)
}

export { Bubbles }
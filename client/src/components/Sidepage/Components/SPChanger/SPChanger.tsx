import React, { FC } from 'react'
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Changer, Changers } from '../../../../models/Changer';
import { TypeSP } from '../../../../models/Sidepage'
import classes from './SPChanger.module.scss'

interface SPChangerProps {
	type: TypeSP;
	rerender: () => void;
	changer: Changer;
}

const SPChanger: FC<SPChangerProps> = ({ type, rerender, changer }) => {

	const category = useTypedSelector(state => state.category)
	const menu = useTypedSelector(state => state.menu)
	const filter = useTypedSelector(state => state.filter)

	return (


		<div className={[classes.root, changer.available ? classes.available : ''].join(' ')} onClick={() => {

			// Отображение контента и=при нажатии
			if (changer.name === Changers.menu) {
				type.setContent(menu.menus)
			}
			if (changer.name === Changers.category) {
				type.setContent(category.categories)
			}
			if (changer.name === Changers.filter) {
				type.setContent(filter.filters)
			}
			if (changer.name === Changers.compilation) {
				type.setContent(filter.filters)
			}
			type.setChanger(changer)
			rerender()
		}}>{changer.name}</div>

	)

}

export { SPChanger }
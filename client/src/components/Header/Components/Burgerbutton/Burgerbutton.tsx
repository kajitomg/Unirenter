import React, { FC } from 'react'
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Changers } from '../../../../models/Changer';
import { CatalogSP, BurgerSP, Sidepage } from '../../../../models/Sidepage';
import classes from './Burgerbutton.module.scss'

interface BurgerbuttonProps {
	rerender: () => void;
	sidepage: Sidepage;
	burger: BurgerSP;
	catalog: CatalogSP;
}

const Burgerbutton: FC<BurgerbuttonProps> = ({ sidepage, burger, catalog, rerender }) => {

	const category = useTypedSelector(state => state.category)
	const menu = useTypedSelector(state => state.menu)

	return (
		<div className={classes.root} onClick={() => {

			if (sidepage.type === burger && sidepage.available) {
				sidepage.setSidepage(burger, burger.content, !sidepage.available)
				return rerender()
			};
			if (sidepage.type !== burger) {
				sidepage.setSidepage(burger, burger.content, true)
				return rerender()
			};
			if (sidepage.type !== catalog && sidepage.available) {
				sidepage.setSidepage(burger, menu.menus, sidepage.available)
				burger.setContent()
				return rerender()
			}
			sidepage.setSidepage(burger, burger.content, !sidepage.available)
			burger.changers.map(changer => {
				if (changer.available && changer.name === Changers.category) {
					burger.setContent(category.categories)
				}
				if (changer.available && changer.name === Changers.menu) {
					burger.setContent(menu.menus)
				}
			})

			return rerender()
		}}>
			<div className={[classes.lines, sidepage.available ? '' : classes.available].join(' ')}>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
	)
}

export { Burgerbutton }
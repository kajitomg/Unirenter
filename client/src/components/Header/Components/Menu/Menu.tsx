import React, { FC, useEffect, useState } from 'react'
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Sidepage, TypeSP } from '../../../../models/Sidepage';
import { SPButtonOrange, SPButtonTransparent, SPContentWrapper, SPChangersWrapper, SidepageWrapper, SPCruz } from '../../../Sidepage'
import { Changers } from '../../../../models/Changer';
import { searchAvailable } from '../../../../hooks/useSearchAvailable';
import classes from './Menu.module.scss'

interface MenuProps {
	changeItem: boolean;
	rerender: () => void;
	sidepage: Sidepage;
	catalog: TypeSP;
}

const Menu: FC<MenuProps> = ({ changeItem, rerender, sidepage, catalog }) => {

	const filter = useTypedSelector(state => state.filter)
	const category = useTypedSelector(state => state.category)
	const menu = useTypedSelector(state => state.menu)
	const params = searchAvailable(category.categories, filter.filters, menu.menus)

	const [showButtons, setShowButtons] = useState<boolean>(false)
	const [availableChanger, setAvailableChanger] = useState('')

	useEffect(() => {
		if (params[0].length === 0 || params[1].length === 0) {
			setShowButtons(false)
		}
		if (params[0].length > 0 || params[1].length > 0) {
			setShowButtons(true)
		}

	}, [params[0], params[1].length])

	useEffect(() => {
		catalog.changers.forEach(changer => {
			if (changer.available) {
				setAvailableChanger(changer.name)
			}
		})
	}, [changeItem])
	useEffect(() => {
		catalog.changers.forEach(changer => {
			if (changer.name === Changers.category && changer.available) {
				catalog.setContent(category.categories)
			}
			if (changer.name === Changers.filter && changer.available) {
				catalog.setContent(filter.filters)
			}
			if (changer.name === Changers.compilation && changer.available) {
				catalog.setContent(filter.filters)
			}
		})
		rerender()
	}, [category.categories, filter.filters])
	return (
		<SidepageWrapper sidepage={sidepage} type={catalog}>
			<section className={classes.header}>
				<SPChangersWrapper rerender={rerender} type={catalog} />
				<SPCruz sidepage={sidepage} rerender={rerender} />
			</section>
			<SPContentWrapper
				content={catalog.content}
				changers={catalog.changers}
				loading={
					filter.loading && Changers.compilation === availableChanger
					|| filter.loading && Changers.filter === availableChanger
					|| category.loading && Changers.category === availableChanger
				}
			/>
			{showButtons &&
				<section className={classes.buttons}>
					<SPButtonOrange rerender={rerender}>Показать</SPButtonOrange>
					<SPButtonTransparent rerender={rerender}>Сбросить</SPButtonTransparent>
				</section>
			}
		</SidepageWrapper>
	)
}

export { Menu }
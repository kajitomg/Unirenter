import React, { FC, useEffect, useState } from 'react'
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { BurgerSP, Sidepage } from '../../../../models/Sidepage'
import { SPButtonOrange, SPButtonTransparent, SPContentWrapper, SPChangersWrapper, SidepageWrapper, SPCruz } from '../../../Sidepage'
import { searchAvailable } from '../../../../hooks/useSearchAvailable';
import { Changers } from '../../../../models/Changer';
import classes from './Burger.module.scss'

interface BurgerProps {
	changeItem: boolean;
	rerender: () => void;
	sidepage: Sidepage;
	burger: BurgerSP;
}

const Burger: FC<BurgerProps> = ({ rerender, changeItem, sidepage, burger }) => {

	const category = useTypedSelector(state => state.category)
	const menu = useTypedSelector(state => state.menu)
	const filter = useTypedSelector(state => state.filter)

	const params = searchAvailable(category.categories, filter.filters, menu.menus)

	const [showButtons, setShowButtons] = useState<boolean>(false)
	const [availableChanger, setAvailableChanger] = useState('')

	useEffect(() => {
		if (params[0].length === 0) {
			setShowButtons(false)
		}
		if (params[0].length > 0) {
			setShowButtons(true)
		}
	}, [params[0].length])

	useEffect(() => {
		burger.changers.forEach(changer => {
			if (changer.available) {
				setAvailableChanger(changer.name)
			}
		})
	}, [changeItem])

	useEffect(() => {
		burger.changers.forEach(changer => {
			if (changer.name === Changers.category && changer.available) {
				burger.setContent(category.categories)
			}
		})
		rerender()
	}, [category.categories])

	return (
		<SidepageWrapper sidepage={sidepage} type={burger}>
			<section className={classes.header}>
				<div className={classes.form}>
					<div className={classes.search}>
						<div className={classes.icon}>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z" stroke="#2B2A28" />
								<path d="M22 21.9999L18.7823 18.7822" stroke="#2B2A28" />
							</svg>
						</div>
						<div className={classes.input}>
							<input type='text' placeholder='Поиск' />
						</div>
					</div>
					<SPCruz sidepage={sidepage} rerender={rerender} />
				</div>
				<SPChangersWrapper rerender={rerender} type={burger} />
			</section>
			<SPContentWrapper
				content={burger.content}
				changers={burger.changers}
				loading={
					menu.loading && Changers.menu === availableChanger
					|| category.loading && Changers.category === availableChanger
				}
			/>
			{showButtons && Changers.category === availableChanger &&
				<section className={classes.buttons}>
					<SPButtonOrange>Показать</SPButtonOrange>
					<SPButtonTransparent>Сбросить</SPButtonTransparent>
				</section>
			}
		</SidepageWrapper >

	)
}

export { Burger }
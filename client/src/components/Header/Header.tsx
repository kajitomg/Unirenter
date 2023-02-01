import React, { FC, useEffect, useState } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { BurgerSP, CatalogSP, Sidepage } from '../../models/Sidepage'
import { Burgerbutton, Logo, Menu, Burger, Buttons, Fastmenu, Contacts } from './Components'
import { useLocation } from 'react-router-dom'
import classes from './Header.module.scss'

interface HeaderProps {
}

const Header: FC<HeaderProps> = ({ }) => {
	const [scroll, setScroll] = useState<number>(0);
	const [burger, setBurger] = useState<BurgerSP>(new BurgerSP())
	const [catalog, setCatalog] = useState<CatalogSP>(new CatalogSP())
	const [sidepage, setSidepage] = useState<Sidepage>(new Sidepage())

	const [changeItem, setChangeItem] = useState<boolean>(false)
	function rerender() {
		setChangeItem(!changeItem)
	}

	const category = useTypedSelector(state => state.category)
	const menu = useTypedSelector(state => state.menu)
	const location = useLocation()

	const handleScroll = () => {
		setScroll(window.scrollY);
	};
	useEffect(() => {
		burger.initChangers()
		catalog.initChangers()
	}, []);
	useEffect(() => {
		burger.setContent(menu.menus)
		catalog.setContent(category.categories)
	}, [menu.menus, category.categories]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	return (
		<header className={[classes.root, scroll > 70 || location.pathname.split('/')[2] ? classes.small : ''].join(' ')}>
			<Burger rerender={rerender} changeItem={changeItem} sidepage={sidepage} burger={burger} />
			<Menu rerender={rerender} changeItem={changeItem} sidepage={sidepage} catalog={catalog} />
			<section className={classes.top}>
				<div className={classes.menu_wrapper}>
					<Burgerbutton sidepage={sidepage} burger={burger} catalog={catalog} rerender={rerender} />
					<Logo />
				</div>
				<Contacts />
				<Buttons scroll={scroll} rerender={rerender} catalog={catalog} sidepage={sidepage} burger={burger} />
			</section>
			<section className={[classes.bottom, scroll > 70 || location.pathname.split('/')[2] ? classes.hidden : ''].join(' ')}>
				<Fastmenu catalog={catalog} sidepage={sidepage} rerender={rerender} />
			</section>

		</header>
	)
}

export { Header }
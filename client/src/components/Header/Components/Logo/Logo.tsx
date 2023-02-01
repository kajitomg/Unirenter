import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import logo from '../../../../images/logo/logo.svg'
import { Instances } from '../../../../static/instances'
import classes from './Logo.module.scss'

interface LogoProps {
}

const buttonType = {
	rental: 'rental',
	sell: 'sell'
}

const Logo: FC<LogoProps> = ({ }) => {

	const [type, setType] = useState<string>(buttonType.rental)

	const { products } = useTypedSelector(state => state.product)

	const { updateAvailabledProductsAction } = useActions()

	return (
		<div className={classes.root}>
			<Link to='/homepage'>
				<img src={logo} alt="" />
			</Link>
			<div className={classes.types}>
				<button className={[classes.type, type === buttonType.rental ? classes.available : ''].join(' ')} onClick={() => {
					Instances.buttons.sell.available = false;
					Instances.buttons.rental.available = true;
					setType(buttonType.rental)
					updateAvailabledProductsAction(products)
				}}>{Instances.buttons.rental.name}</button>
				<div className={classes.dot}></div>
				<button className={[classes.type, type === buttonType.sell ? classes.available : ''].join(' ')} onClick={() => {
					Instances.buttons.rental.available = false;
					Instances.buttons.sell.available = true;
					setType(buttonType.sell)
					updateAvailabledProductsAction(products)
				}}>{Instances.buttons.sell.name}</button>
			</div>
		</div>
	)
}

export { Logo }
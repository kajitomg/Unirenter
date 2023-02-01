import React, { FC, useState } from 'react'
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import classes from './Dress.module.scss'

interface DressProps {
	bottomVisible: number;
	setBottomVisible: (number: number) => void;
	hovered: boolean;
}

const Dress: FC<DressProps> = ({ bottomVisible, hovered, setBottomVisible }) => {

	const address = useTypedSelector(state => state.address)
	const [phonenumber, setPhonenumber] = useState('')
	const { setRecordAction } = useActions()

	const handlerSubmit = async (event: any) => {
		event.preventDefault();
		if (phonenumber.length === 11) {
			await setRecordAction(phonenumber, address.address)
			setPhonenumber('')
			await setBottomVisible(2)
		}
	}
	const handlerChange = (event: any) => {
		event.preventDefault()
		setPhonenumber(event.target.value)

	}

	return (
		<section className={[classes.root, bottomVisible === 1 && hovered || bottomVisible === 2 && hovered ? classes.available : ''].join(' ')}>
			<div className={classes.texts}>
				<span className={[classes.text, classes.title].join(' ')}>
					{bottomVisible === 1 && 'Хотите примерить?'}
					{bottomVisible === 2 && 'Благодарим за запись!'}
				</span>
				<span className={classes.text}>
					{bottomVisible === 1 && 'Оставьте свой телефон и мы Вам скоро перезвоним!'}
					{bottomVisible === 2 && 'В ближайшее время свяжемся с Вами.'}
				</span>
			</div>
			<form className={classes.form} action="" onSubmit={(event) => handlerSubmit(event)}>
				<section className={classes.input}>
					<input type='phonenumber' placeholder={address.address?.phonenumber} value={phonenumber} onChange={(event) => handlerChange(event)} />
				</section>
				<button className={classes.arrow} type='submit'>
					<span></span>
					<span></span>
					<span></span>
				</button>
			</form>
		</section>
	)
}

export { Dress }
import React, { FC, useState, useTransition } from 'react'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import classes from './Makean.module.scss'

interface MakeanProps {
	disable?: boolean;
}


const Makean: FC<MakeanProps> = ({ disable }) => {

	const address = useTypedSelector(state => state.address)

	const [phonenumber, setPhonenumber] = useState<string>('')
	const [available, setAvailable] = useState(true)

	const { setRecordAction } = useActions()
	const handlerSubmit = (event: any) => {
		event.preventDefault();
		if (phonenumber.length === 11) {
			setRecordAction(phonenumber, address.address)
			setPhonenumber('')
			setAvailable(false)
		}
	}
	return (
		<form method='POST' className={[classes.root, available || disable ? classes.available : ''].join(' ')} onSubmit={(event) => handlerSubmit(event)}>
			{available ?
				<>
					<div className={classes.input}>
						<input type='phonenumber' className={classes.phonenumber} placeholder={address.address?.phonenumber} value={phonenumber} onChange={(e) => {
							if (!disable) {
								setPhonenumber(e.target.value)
							}
						}} />
					</div>
					<button type='submit' className={classes.button}>Записаться</button>
				</>
				:
				disable
					?
					<>
						<div className={classes.input}>
							<input type='phonenumber' className={classes.phonenumber} placeholder={address.address?.phonenumber} value={phonenumber} onChange={(e) => {
								if (!disable) {
									setPhonenumber(e.target.value)
								}
							}} />
						</div>
						<button type='submit' className={classes.button}>Записаться</button>
					</>
					:
					<>
						<div className={[classes.text, classes.text_big].join(' ')}>
							<span>Благодарим за запись!</span>
						</div>
						<div className={classes.text}>
							<span>
								В ближайшее время свяжемся с Вами.
							</span>
						</div>
					</>
			}
		</form>
	)
}

export { Makean }
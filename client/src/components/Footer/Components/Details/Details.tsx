import React, { useEffect, useState } from 'react'
import vkontakte from '../../../../images/icons/vk.svg'
import whatsapp from '../../../../images/icons/what.svg'
import facebook from '../../../../images/icons/fb.svg'
import instagram from '../../../../images/icons/inst.svg'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { Loader } from '../../../Loader'
import classes from './Details.module.scss'

const Details = () => {
	const [resize, setResize] = useState<number>(window.innerWidth);

	const address = useTypedSelector(state => state.address)

	const handleResize = () => {
		setResize(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<section className={classes.root}>
			<div className={classes.wrapper}>
				<div className={classes.general}>
					<h2 className={classes.title}>Контактные данные</h2>
					<button className={classes.mail}>love@unirenter.ru</button>
					{
						address.loading
							?
							<div className={classes.loading}>
								<Loader />

							</div>
							:
							<button className={classes.phonenumber}>{address.address?.phonenumber}</button>
					}
				</div>
				<div className={classes.socials}>
					{resize > 780 &&
						<button className={classes.social}>
							<img src={vkontakte} alt="" />
						</button>
					}
					<button className={classes.social}>
						<img src={whatsapp} alt="" />
					</button>
					{resize > 780 &&
						<>
							<button className={classes.social}>
								<img src={facebook} alt="" />
							</button>
							<button className={classes.social}>
								<img src={instagram} alt="" />
							</button>
						</>
					}
				</div>
			</div>
			{
				address.loading
					?
					<div className={classes.loading}>
						<Loader />
					</div>
					:
					<div className={classes.address}>{address.address?.city},{address.address?.metro && `м. ${address.address?.metro},`} ул. {address.address?.street} д. {address.address?.house} {address.address?.building && `корпус ${address.address?.building}`}</div>
			}
			<button className={classes.goto}>Схема проезда</button>
		</section>
	)
}

export { Details }
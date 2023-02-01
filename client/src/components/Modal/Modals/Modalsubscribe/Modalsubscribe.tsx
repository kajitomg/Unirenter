import React, { FC, useEffect, useState } from 'react'
import { Ceo } from '../../../Ceo'
import { Makean } from '../../../Makean/Makean'
import { Modalcontent, Modalwrapper } from '../../Components'
import classes from './Modalsubscribe.module.scss'
import { Map } from '../../../Map'
import { Video } from '../../../Video'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'

interface ModalsubscribeProps {
	wrapperClass: Array<any>;
	showModal: () => void;

}
const Modalsubscribe: FC<ModalsubscribeProps> = ({ showModal, wrapperClass }) => {
	const [width, setWidth] = useState<number>(window.innerWidth);

	const address = useTypedSelector(state => state.address)

	const handleResize = () => {
		setWidth(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<Modalwrapper wrapperClass={wrapperClass} showModal={showModal} >
			<Modalcontent>
				<div className={classes.root}>
					<div className={classes.ceo_wrapper}>
						<Ceo showModal={showModal} />
					</div>
					<div className={classes.bottom}>
						<div className={classes.left}>
							<div className={classes.text}>
								Записаться на примерку
							</div>
							<div className={classes.makean_wrapper}>
								<Makean />
							</div>
							{
								width <= 720 &&

								<div className={classes.video}>
									<Video />
								</div>
							}
							<div className={classes.address}>
								<span>{address.address?.city}</span>, {address.address?.metro && `м. ${address.address?.metro}`} ул. {address.address?.street} д. {address.address?.house} {address.address?.building && `корпус ${address.address?.building}`}
							</div>
							<div className={classes.map}>
								<Map />
							</div>
						</div>
						{
							width > 720 &&
							<div className={classes.right}>
								<div className={classes.video}>
									<Video />
								</div>
							</div>
						}
					</div>
				</div>
			</Modalcontent>
		</Modalwrapper>
	)
}

export { Modalsubscribe }
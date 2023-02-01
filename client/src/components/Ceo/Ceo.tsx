import React, { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import img1 from '../../images/icons/ceo1.svg'
import img2 from '../../images/icons/ceo2.svg'
import img3 from '../../images/icons/ceo3.svg'
import img4 from '../../images/icons/ceo4.svg'
import classes from './Ceo.module.scss'

interface CeoProps {
	showModal: () => void;
}

const Ceo: FC<CeoProps> = ({ showModal }) => {

	const location = useLocation()

	return (
		<section className={[classes.root, location.pathname.split('/')[2] ? classes.hide : ''].join(' ')}>
			<section className={classes.elements}>
				<div className={classes.element} onClick={() => { showModal() }}>
					<div className={classes.image}>
						<img src={img1} alt="" />
						<div className={classes.circe}>
							<span></span>
						</div>
					</div>
					<div className={classes.text}>
						<h2 className={classes.title}>Крупнейший свадебный салон</h2>
						<span className={classes.description}>15 000 моделей в наличии: Платья. Костюмы. Аксессуары. 7 салонов по России.</span>
					</div>
				</div>
				<div className={classes.element} onClick={() => { showModal() }}>
					<div className={classes.image}>
						<img src={img2} alt="" />
						<div className={classes.circe}>
							<span></span>
						</div>
					</div>
					<div className={classes.text}>
						<h2 className={classes.title}>Прокат и Продажа</h2>
						<span className={classes.description}>Можно взять напрокат без залога или купить. Прокат выгодней покупки в 10 раз.</span>
					</div>
				</div>
				<div className={classes.element} onClick={() => { showModal() }}>
					<div className={classes.image}>
						<img src={img3} alt="" />
						<div className={classes.circe}>
							<span></span>
						</div>
					</div>
					<div className={classes.text}>
						<h2 className={classes.title}>Нам доверяют</h2>
						<span className={classes.description}>30000+ довольных клиентов в год. 1000+ отзывов с рейтингом 5 звезд на Яндекс.Картах.</span>
					</div>
				</div>
				<div className={classes.element} onClick={() => { showModal() }}>
					<div className={classes.image}>
						<img src={img4} alt="" />
						<div className={classes.circe}>
							<span></span>
						</div>
					</div>
					<div className={classes.text}>
						<h2 className={classes.title}>Услуги Ателье</h2>
						<span className={classes.description}>Подшиваем по длине, изменяем размер и перешиваем под Ваши пожелания.</span>
					</div>
				</div>
			</section>
		</section>
	)
}

export { Ceo }
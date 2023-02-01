import React, { FC, useEffect, useState } from 'react'
import { Makean } from '../../components/Makean/Makean'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { Card } from '../../components/Card'
import classes from './Like.module.scss'

interface LikeProps {
	view: number;
	setView: (value: number) => void;

}

const Like: FC<LikeProps> = ({ setView, view }) => {


	const mokeData = [[], [], [], []]
	const product = useTypedSelector(state => state.product)

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<section className={classes.root} >
			<section className={classes.info}>
				<div className={classes.text}>Записаться на примерку</div>
				<div className={classes.makean_wrapper}>
					<Makean />
				</div>
			</section>
			<section className={[classes.cards, view === 1 ? classes.more : classes.less].join(' ')}>
				{product.loading
					?
					mokeData.map((data, index) =>
						<Card key={index} loading={product.loading} />
					)
					:
					product.availabled?.map(product =>
						<Card product={product} key={product._id} />
					)
				}
				{
					!product.loading && product.availabled.length === 0 && <div className={classes.empty}><span>Вы ничего не добавили в понравившееся</span></div>
				}
			</section>
		</section>
	)
}

export { Like }
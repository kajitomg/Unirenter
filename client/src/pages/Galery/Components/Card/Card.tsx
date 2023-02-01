
import React, { FC } from 'react'
import { Loader } from '../../../../components/Loader';
import { Makean } from '../../../../components/Makean/Makean';
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Product } from '../../../../models/Product'
import { Paths } from '../../../../paths';
import { Instances } from '../../../../static/instances';
import classes from './Card.module.scss'

interface CardProps {
	product?: Product;
	loading: boolean;
}

const Card: FC<CardProps> = ({ product, loading }) => {

	const { products } = useTypedSelector(state => state.product)

	const mokeData = [[], [], [], []]

	const { updateAvailabledProductsAction } = useActions()

	return (
		<section className={classes.root} key={product?._id}>
			<div className={classes.info}>
				<div className={classes.left}>
					<div className={classes.name}>
						{loading
							?
							<div className={classes.loading}>
								<Loader />
							</div>
							:
							product?.name
						}
					</div>
					<div className={classes.wrapper}>
						{loading
							?
							<div className={classes.loading}>
								<Loader />
							</div>
							:
							Instances.buttons.sell.available
								?
								<span className={classes.price}>
									<span className={classes.price_rental}><span>Прокат</span> P{product?.priceRental.toLocaleString('de-DE')}</span>
									<span className={classes.price_sell}><span>Купить</span> P{product?.priceRental.toLocaleString('de-DE')}</span>
								</span>
								:
								<span className={classes.price}>P{product?.priceRental.toLocaleString('de-DE')}</span>
						}
						<button className={classes.button}>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M17 6L11.5 1L6 6" stroke="#2B2A28" />
								<line y1="-0.5" x2="13" y2="-0.5" transform="matrix(0 1 1 0 12 1)" stroke="#2B2A28" />
								<path d="M3 12V22H20V12" stroke="#2B2A28" />
							</svg>
						</button>
						<button className={[classes.button, classes.like, product?.like ? classes.available : ''].join(' ')} onClick={(e) => {
							if (product)
								product.like = !product.like
							updateAvailabledProductsAction(products)
							e.stopPropagation()
						}}>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M2.77216 3.77216C0.40928 6.13503 0.409282 9.96602 2.77216 12.3289L11.937 21.4937L12 21.4307L12.0631 21.4938L21.2279 12.329C23.5908 9.96609 23.5908 6.13511 21.2279 3.77223C18.865 1.40936 15.034 1.40936 12.6712 3.77224L12.3536 4.08978C12.1584 4.28505 11.8418 4.28505 11.6465 4.08978L11.3289 3.77216C8.96601 1.40928 5.13503 1.40928 2.77216 3.77216Z" stroke="#2B2A28" />
							</svg>
						</button>
					</div>
				</div>
				<div className={classes.right}>
					<div className={classes.makean_wrapper}>
						<Makean />
					</div>
					<div className={classes.cruz}>
						<span></span>
						<span></span>
					</div>
				</div>
			</div>
			<div className={classes.images}>
				{loading
					?
					mokeData.map((data, index) =>
						<div className={[classes.image, classes.loading].join(' ')} key={index}>
							<Loader />
						</div>
					)
					:
					product?.images.map((image: any, i: number) =>
						<div className={classes.image} key={image}>
							<img
								src={Paths.APIUrl + image} alt=""
							/>
						</div>
					)
				}
			</div>
		</section>
	)
}

export { Card }
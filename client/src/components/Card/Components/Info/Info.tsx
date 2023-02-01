import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../../Loader';
import { useActions } from '../../../../hooks/useActions';
import { searchAvailable } from '../../../../hooks/useSearchAvailable';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Product } from '../../../../models/Product'
import { makeParamString } from '../../../../models/Url';
import { Instances } from '../../../../static/instances';
import classes from './Info.module.scss'
import { useApplyParams } from '../../../../hooks/useApplyParams';

interface InfoProps {
	product?: Product;
	bottomVisible: number;
	setBottomVisible: (value: number) => void;
	loading?: boolean;
}

const Info: FC<InfoProps> = ({ product, bottomVisible, setBottomVisible, loading }) => {
	const applyParams = useApplyParams()

	const { products } = useTypedSelector(state => state.product)

	const { updateAvailabledProductsAction } = useActions()

	return (
		<section className={classes.root} onClick={() => {
			if (product && !loading)
				applyParams(`/catalog/${product._id}`)
		}}>
			<section className={classes.top}>
				<section className={classes.left}>
					<button className={classes.fit} onClick={(e) => {
						if (!loading) {
							setBottomVisible(1);
							e.stopPropagation()
						}
					}}
					>примерить</button>
				</section>
				<section className={classes.right}>
					{
						loading
							?
							<div className={classes.loading}>
								<Loader />
							</div>
							:
							Instances.buttons.sell.available
								?
								<span className={classes.price} >
									<span className={classes.price_rental}><span>Прокат</span> P{product?.priceRental.toLocaleString('de-DE')}</span>
									<span className={classes.price_sell}><span>Купить</span> P{product?.priceSell.toLocaleString('de-DE')}</span>
								</span>
								:
								<span className={classes.price}>P{product?.priceRental.toLocaleString('de-DE')}</span>
					}
					<button className={[classes.button, classes.share].join(' ')} onClick={(e) => e.stopPropagation()}>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M17 6L11.5 1L6 6" stroke="#2B2A28" />
							<line y1="-0.5" x2="13" y2="-0.5" transform="matrix(0 1 1 0 12 1)" stroke="#2B2A28" />
							<path d="M3 12V22H20V12" stroke="#2B2A28" />
						</svg>
					</button>
					<button className={[classes.button, classes.like, product?.like ? classes.available : ''].join(' ')} onClick={(e) => {
						if (!loading) {
							if (product)
								product.like = !product?.like
							updateAvailabledProductsAction(products)
							e.stopPropagation()
						}
					}}>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M2.77216 3.77216C0.40928 6.13503 0.409282 9.96602 2.77216 12.3289L11.937 21.4937L12 21.4307L12.0631 21.4938L21.2279 12.329C23.5908 9.96609 23.5908 6.13511 21.2279 3.77223C18.865 1.40936 15.034 1.40936 12.6712 3.77224L12.3536 4.08978C12.1584 4.28505 11.8418 4.28505 11.6465 4.08978L11.3289 3.77216C8.96601 1.40928 5.13503 1.40928 2.77216 3.77216Z" stroke="#2B2A28" />
						</svg>
					</button>
				</section>
			</section>
			<section className={classes.bottom}>
				<span className={classes.name}>
					{loading
						?
						<div className={classes.loading}>
							<Loader />
						</div>
						:
						product?.name
					}
				</span>
				<span className={classes.articul}>
					{loading
						?
						<div className={classes.loading}>
							<Loader />
						</div>
						:
						`Артикул: ${product?.article}`
					}
				</span>
			</section>
		</section>
	)
}

export { Info }
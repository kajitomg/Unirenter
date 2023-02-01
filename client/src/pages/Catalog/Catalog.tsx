import React, { FC } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { Card } from '../../components/Card'
import classes from './Catalog.module.scss'
import cardClasses from '../../components/Card/Card.module.scss'

interface CatalogProps {
	view: number;
	setView: (value: number) => void;

}

const Catalog: FC<CatalogProps> = ({ view }) => {

	const product = useTypedSelector(state => state.product)

	const mokeData = [[], [], [], [], [], [], [], [], [], [], [], []]

	return (
		<section className={classes.root}>
			<section className={[classes.cards, view === 1 ? classes.more : classes.less].join(' ')}>
				{
					product.loading
						?
						mokeData.map((data, index) =>
							<Card key={index} loading={product.loading} />
						)
						:
						product.products?.map(product =>
							<Card product={product} key={product._id} />
						)
				}
				{
					product.products.length === 0 && !product.loading && <div className={classes.empty}><span>Ничего не найдено</span></div>
				}
			</section>
		</section>
	)
}

export { Catalog }
import React, { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import { useApplyParams } from '../../hooks/useApplyParams';
import { searchAvailable } from '../../hooks/useSearchAvailable';
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { makeParamString } from '../../models/Url';
import classes from './Applyed.module.scss'

interface ApplyedProps {

}

const Applyed: FC<ApplyedProps> = ({ }) => {
	const applyParams = useApplyParams()

	const filter = useTypedSelector(state => state.filter)
	const { page: numberOfCollectionPage } = useTypedSelector(state => state.collection)
	const { page: numberOfProductPage } = useTypedSelector(state => state.product)

	const [productpage, setProductpage] = useState<number>(numberOfProductPage)
	const [collectionpage, setCollectionpage] = useState<number>(numberOfCollectionPage);
	const [visible, setVisible] = useState(false)

	const { fetchProductAction, fetchCollectionAction, updateAvailabledFiltersAction, clearCollectionAction, clearProductsAction } = useActions()

	const location = useLocation()

	useEffect(() => {
		let stop = false
		filter.filters.map((filter) => {
			if (filter.available) {
				stop = true
			}
			if (!filter.available) {
				setVisible(false)
			}
		})
		if (stop) {
			setVisible(true)
		}
	}, [filter.filters, filter.availabled])

	return (

		<section className={[classes.root, visible && filter.filters.length > 0 && location.pathname === '/catalog' ? classes.available : ''].join(' ')} >
			<button className={classes.button} onClick={() => {
				filter.filters.map((filterInner) => {
					filterInner.available = false;
					if (window.location.pathname === '/catalog') {
						clearProductsAction()
						fetchProductAction(productpage)
					}
					updateAvailabledFiltersAction(filter.filters)
					clearCollectionAction()
					fetchCollectionAction(collectionpage)
					applyParams()
				}
				)
			}}>
				<span></span>
				<span></span>
			</button>
			<ul className={classes.list}>
				{filter.filters.map((filterItterated) =>
					filterItterated.available &&
					<li className={classes.element} key={filterItterated._id} onClick={() => {
						filter.filters.map((filterInner) => {
							if (filterItterated._id === filterInner._id) {
								filterInner.available = false;
							}
							if (window.location.pathname === '/catalog') {
								clearProductsAction()
								fetchProductAction(productpage)
							}
							updateAvailabledFiltersAction(filter.filters)
							clearCollectionAction()
							fetchCollectionAction(collectionpage)
							applyParams()
						}
						)
					}}>
						<div className={classes.name}>{filterItterated.name}</div>
						<div className={classes.cruz}>
							<span></span>
							<span></span>
						</div>
					</li>
				)}
			</ul>
		</section>


	)
}

export { Applyed }
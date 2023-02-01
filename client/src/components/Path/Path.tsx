import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'
import { useApplyParams } from '../../hooks/useApplyParams'
import { searchAvailable } from '../../hooks/useSearchAvailable'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import classes from './Path.module.scss'

interface PathProps {

}

const Path: FC<PathProps> = ({ }) => {
	const applyParams = useApplyParams()

	const category = useTypedSelector(state => state.category)
	const { page: numberOfCollectionPage } = useTypedSelector(state => state.collection)
	const { page: numberOfProductPage } = useTypedSelector(state => state.product)


	const { fetchCollectionAction, clearFilterAction, updateAvailabledCategoriesAction, clearCollectionAction, clearProductsAction, fetchProductAction } = useActions()

	const [location, setLocation] = useState(window.location)
	const [productpage, setProductpage] = useState<number>(numberOfProductPage)
	const [collectionpage, setColectionpage] = useState<number>(numberOfCollectionPage);

	useEffect(() => {
		setLocation(window.location)
		if (!window.location.search) {
			category.categories.map((category) => {
				category.available = false
			})
		}
		updateAvailabledCategoriesAction(category.categories)
	}, [window.location.search, window.location.pathname])

	return (
		<section className={[classes.root,
		location.pathname !== '/'
			&& location.pathname !== '/homepage'
			&& location.pathname !== '/like'
			&& !location.pathname.split('/')[2]
			? classes.available : ''].join(' ')} >
			<div className={classes.branch} onClick={() => {
				applyParams('/')
				clearFilterAction()
				clearCollectionAction()
				fetchCollectionAction(collectionpage)
			}}>Главная</div>
			{
				location.pathname === '/catalog'
					?
					<div className={classes.branch} onClick={() => {
						applyParams('/catalog')
						if (window.location.pathname === '/catalog') {
							clearFilterAction()
							clearProductsAction()
							fetchProductAction(productpage)
						}
					}}>Каталог</div>
					:
					''
			}
			{
				category.categories.map((category) =>
					category.available
						?
						<div className={classes.branch} key={category._id}>{category.name}</div>
						:
						''
				)
			}

		</section>

	)
}

export { Path }
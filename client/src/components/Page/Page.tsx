import React, { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import { useApplyParams } from '../../hooks/useApplyParams';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Addresses } from '../../models/Address'
import classes from './Page.module.scss'

interface pageProps {
	children: React.ReactNode;
}

const Page: FC<pageProps> = ({ children, }) => {
	const applyParams = useApplyParams()
	const navigate = useNavigate()

	const location = useLocation()

	const category = useTypedSelector(state => state.category)
	const filter = useTypedSelector(state => state.filter)
	const { page: numberOfProductPage } = useTypedSelector(state => state.product)

	const { fetchMenuAction, fetchCategoryAction, fetchFilterAction, fetchProductAction, fetchAddressAction, clearProductsAction } = useActions()

	const [productpage, setProductpage] = useState<number>(numberOfProductPage)

	useEffect(() => {
		if (location.search) {
			navigate(location.search)
		}
		fetchCategoryAction()
		fetchMenuAction()
		clearProductsAction()
		fetchProductAction(productpage)
		fetchAddressAction(Addresses.moskow)
	}, [])

	useEffect(() => {
		if (category.categories.length > 0) {
			category.categories.forEach(category => {
				if (category.available) {
					fetchFilterAction(category.filters, filter.filters)
				}
			})
		}
	}, [category.categories])

	return (
		<main className={classes.root}>
			{children}
		</main>
	)
}

export { Page }
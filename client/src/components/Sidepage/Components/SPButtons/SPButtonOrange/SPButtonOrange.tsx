import React, { FC, ReactNode, useState } from 'react'
import { useActions } from '../../../../../hooks/useActions'
import { useTypedSelector } from '../../../../../hooks/useTypedSelector'
import classes from './SPButtonOrange.module.scss'

interface SPButtonProps {
	rerender?: () => void;
	children: ReactNode;
}

const SPButtonOrange: FC<SPButtonProps> = ({ children, rerender }) => {

	const { fetchProductAction, fetchCollectionAction, clearCollectionAction, clearProductsAction } = useActions()

	const { page: numberOfCollectionPage } = useTypedSelector(state => state.collection)
	const { page: numberOfProductPage } = useTypedSelector(state => state.product)


	const [productpage, setProductpage] = useState<number>(numberOfProductPage)
	const [collectionpage, setCollectionpage] = useState<number>(numberOfCollectionPage);

	return (
		<div className={classes.root}
			onClick={() => {
				if (window.location.pathname === '/catalog') {
					clearProductsAction()
					return fetchProductAction(productpage)
				}
				if (rerender) {
					rerender()
				}
				clearCollectionAction()
				return fetchCollectionAction(collectionpage)
			}}
		>
			<span className={classes.text}>{children}</span>
		</div>
	)
}

export { SPButtonOrange }
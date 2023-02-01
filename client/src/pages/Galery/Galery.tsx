import React, { FC, useEffect, useState } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Card } from './Components';
import classes from './Galery.module.scss'

interface GaleryProps {
}

const Galery: FC<GaleryProps> = ({ }) => {

	const { products, loading } = useTypedSelector(state => state.product)

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<>
			{
				loading
					?
					<Card loading={loading} />
					:
					products.map((product) =>
						product._id === window.location.pathname.split('/')[2] &&
						<Card product={product} key={product._id} loading={loading} />

					)
			}
		</>
	)
}

export { Galery }
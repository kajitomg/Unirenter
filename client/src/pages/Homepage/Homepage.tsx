import React, { useEffect, useState } from 'react'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { Card, Modifiers } from './Components/Card'
import classes from './Homepage.module.scss'

const Homepage = () => {
	const { fetchCollectionAction, clearFilterAction, clearCollectionAction } = useActions()

	const { loading, collections, page: numberOfPage } = useTypedSelector(state => state.collection)

	const [resize, setResize] = useState<number>(window.innerWidth);
	const [page, setPage] = useState<number>(numberOfPage);

	const mokeData = [[], [], [], [], [], [], [], [], [], [], [], []]

	const handleResize = () => {
		setResize(window.innerWidth);
	};
	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		clearCollectionAction()
		fetchCollectionAction(page)
		if (window.location.search === '') {
			clearFilterAction()
		}
	}, [])


	return (
		<section className={classes.root}>
			{
				<section className={classes.gallery}>
					<div className={[classes.top, resize >= 550 ? classes.row : classes.column].join(' ')}>
						<div className={[resize >= 550 ? classes.column : classes.row].join(' ')}>
							{
								loading
									?
									mokeData.map((data, i) =>
										(i === 0 && resize >= 550 || (i === 0 || i === 1) && resize < 550)
										&&
										<Card resize={resize} key={i} modifier={Modifiers.ADAPTIVE} loading={loading} />
									)
									:
									collections.map((collection, i) =>
										(i === 0 && resize >= 550 || (i === 0 || i === 1) && resize < 550)
										&&
										<Card collection={collection} resize={resize} key={collection._id} modifier={Modifiers.ADAPTIVE} loading={loading} />

									)}
						</div>
						<div className={classes.column}>
							<div className={classes.row}>
								{
									loading
										?
										mokeData.map((data, i) =>
											((i === 1 || i === 2 || i === 3 || i === 4) && resize > 1100 ||
												(i === 2 || i === 3) && resize < 550 ||
												(i === 1 || i === 2) && (resize >= 550 && resize <= 1100))
											&&
											<Card resize={resize} key={i} modifier={Modifiers.DEFAULT} loading={loading} />
										)
										:
										collections.map((collection, i) =>
											((i === 1 || i === 2 || i === 3 || i === 4) && resize > 1100 ||
												(i === 2 || i === 3) && resize < 550 ||
												(i === 1 || i === 2) && (resize >= 550 && resize <= 1100))
											&&
											<Card collection={collection} resize={resize} key={collection._id} modifier={Modifiers.DEFAULT} loading={loading} />
										)}
							</div>
						</div>
						<div className={classes.column}>
							{
								loading
									?
									mokeData.map((data, i) =>
										resize >= 550
										&&
										(i === 5 && resize > 1100 || i === 3 && resize <= 1100)
										&&
										<Card resize={resize} key={i} modifier={Modifiers.BIG} loading={loading} />
									)
									:
									collections.map((collection, i) =>
										resize >= 550
										&&
										(i === 5 && resize > 1100 || i === 3 && resize <= 1100)
										&&
										<Card collection={collection} resize={resize} key={collection._id} modifier={Modifiers.BIG} loading={loading} />
									)}
						</div>
					</div>
					<div className={[classes.row, classes.bottom].join(' ')}>
						{
							loading
								?
								mokeData.map((data, i) =>
									(i > 5 && resize > 1100 || i > 3 && resize <= 1100)
									&&
									<Card resize={resize} key={i} modifier={Modifiers.SMALL} loading={loading} />
								)
								:
								collections.map((collection, i) =>
									(i > 5 && resize > 1100 || i > 3 && resize <= 1100)
									&&
									<Card collection={collection} resize={resize} key={collection._id} modifier={Modifiers.SMALL} loading={loading} />
								)}
					</div>
				</section>
			}

		</section>
	)
}

export { Homepage }
import React, { FC } from 'react'
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Loader } from '../../../Loader';
import { FooterCategory } from '../FooterCategory';
import classes from './Categories.module.scss'

interface CategoriesProps {
}

const Categories: FC<CategoriesProps> = ({ }) => {

	const category = useTypedSelector(state => state.category)
	const mokeData = [[], [], [], [], [], [], [], [], [], [], [], [], [], []]


	return (
		<section className={classes.root}>
			{category.loading
				?
				mokeData.map((data, index) =>
					<div className={classes.loading} key={index}>
						<Loader />
					</div>
				)
				:
				<>
					<div className={classes.column}>
						{
							category.categories.map((element, index) =>
								(index + 1) % 4 === 1 &&
								<FooterCategory element={element} key={element._id} />
							)
						}
					</div>
					<div className={classes.column}>
						{
							category.categories.map((element, index) =>
								(index + 1) % 4 === 2 &&
								<FooterCategory element={element} key={element._id} />
							)
						}
					</div>
					<div className={classes.column}>
						{
							category.categories.map((element, index) =>
								(index + 1) % 4 === 3 &&
								<FooterCategory element={element} key={element._id} />
							)
						}
					</div>
					<div className={classes.column}>
						{
							category.categories.map((element, index) =>
								(index + 1) % 4 === 0 &&
								<FooterCategory element={element} key={element._id} />
							)
						}
					</div>
				</>


			}
		</section>
	)
}

export { Categories }
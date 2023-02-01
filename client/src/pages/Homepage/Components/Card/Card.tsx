import React, { FC } from 'react'
import { Collection } from '../../../../models/Collection';
import image1 from '../../../../images/card/image1.jpg'
import image2 from '../../../../images/card/image2.jpg'
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { searchAvailable } from '../../../../hooks/useSearchAvailable';
import { makeParamString } from '../../../../models/Url/Makeurl/makeParamString';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../../../hooks/useActions';
import { Loader } from '../../../../components/Loader';
import classes from './Card.module.scss'

export const Modifiers = {
	DEFAULT: 'DEFAULT',
	BIG: 'BIG',
	ADAPTIVE: 'ADAPTIVE',
	SMALL: 'SMALL'
}

interface CardProps {
	collection?: Collection;
	modifier: string;
	resize: number;
	loading: boolean;
}

const Card: FC<CardProps> = ({ collection, modifier, resize, loading }) => {

	const navigate = useNavigate()

	const menu = useTypedSelector(state => state.menu)
	const category = useTypedSelector(state => state.category)
	const filter = useTypedSelector(state => state.filter)

	const { fetchFilterAction } = useActions()

	const conditionClass = [loading ? classes.loading : '', modifier === Modifiers.ADAPTIVE ? resize >= 550 ? classes.big : classes.root : modifier === Modifiers.BIG ? classes.big : modifier === Modifiers.DEFAULT ? classes.root : modifier === Modifiers.SMALL ? classes.small : '']
	const conditionImage = modifier === Modifiers.ADAPTIVE && resize >= 550 || modifier === Modifiers.BIG ? image1 : image2

	return (
		<div className={conditionClass.join(' ')} onClick={() => {
			if (!loading) {
				if (collection) {
					collection?.filter.meanings?.map((meaning) => {
						if (meaning.name === collection?.meaning.name) {
							meaning.available = true
						}
					})
					navigate(`/catalog?${makeParamString(searchAvailable([collection.category], [collection.filter], menu.menus))}`)
					category.categories.map((category) => {
						if (category.name === collection?.category.name) {
							category.available = true;
						}
					})
					fetchFilterAction(collection.category.filters, filter.filters)
				}
			}

		}}>

			{loading ?
				<Loader />
				:
				<>
					<div className={classes.image}>
						<img src={conditionImage} alt="" />
						{/* <img
							src={Paths.APIUrl + collection?.image} alt=""
						/> */}
					</div>
					<button className={classes.button}>
						<div className={classes.model}>{collection?.meaning.name}</div>
						<div className={classes.numberofmodel}>{collection?.numberOfProducts} моделей</div>
					</button>
				</>
			}
		</div>
	)
}

export { Card }
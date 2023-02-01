import React, { FC, ReactElement, useEffect, useRef, useState } from 'react'
import { Loader } from '../../../Loader';
import { Product } from '../../../../models/Product'
import { Paths } from '../../../../paths'
import { Dress } from '../Dress';
import classes from './Slider.module.scss'

interface SliderProps {
	product?: Product;
	bottomVisible: number;
	setBottomVisible: (value: number) => void;
	hovered: boolean;
	loading?: boolean;
}

const Slider: FC<SliderProps> = ({ product, bottomVisible, setBottomVisible, hovered, loading }) => {

	const [availableImage, setAvailableImage] = useState<number>(0)
	const [prevAvailableImage, setPrevAvailableImage] = useState<number | null>(null)
	const [mouseDown, setMouseDown] = useState<boolean>(false)
	const [mouseStart, setMouseStart] = useState<number>(0)

	const interval = useRef<null | ReturnType<typeof setInterval>>(null)

	function onMouseUp(distance: number) {
		onMouseOver()
		if (product?.images) {
			if (distance - mouseStart < -60 && availableImage < product?.images.length - 1) {
				setPrevAvailableImage(availableImage)
				setAvailableImage(availableImage + 1)
			}
			if (distance - mouseStart < -60 && availableImage === product?.images.length - 1) {
				setPrevAvailableImage(availableImage)
				setAvailableImage(0)
			}
			if (distance - mouseStart > 60 && availableImage > 0) {
				setPrevAvailableImage(availableImage)
				setAvailableImage(availableImage - 1)
			}
			if (distance - mouseStart > 60 && availableImage === 0) {
				setPrevAvailableImage(availableImage)
				setAvailableImage(3)
			}
		}
	}
	function onMouseOver() {
		if (!loading) {
			if (interval.current) {
				clearInterval(interval.current)
			}
			interval.current = setInterval(() => swipeImages(), 3000)
		}

	}
	function onMouseLeave() {
		if (interval.current) {
			clearInterval(interval.current)
		}
	}
	function swipeImages() {
		let image = availableImage
		setAvailableImage(availableImage => image = availableImage)
		if (product?.images) {
			if (image < product?.images.length - 1) {
				setPrevAvailableImage(() => image)
				setAvailableImage(availableImage => availableImage + 1)

			}
			if (image === product?.images.length - 1) {
				setPrevAvailableImage(() => image)
				setAvailableImage(0)
			}
		}
	}



	function setImageClass(i: number) {
		const styles = [
			availableImage === i ? classes.available : '',
			availableImage === i
				? prevAvailableImage !== null && availableImage < prevAvailableImage
					? availableImage === 0
						&& prevAvailableImage === 3
						? classes.right_swipe
						: classes.left_swipe
					: availableImage === 3
						&& prevAvailableImage === 0
						? classes.left_swipe
						: classes.right_swipe
				: '',
			prevAvailableImage !== null && prevAvailableImage === i ? classes.previous : '',
			prevAvailableImage === i
				? prevAvailableImage !== null && availableImage < prevAvailableImage
					? availableImage === 0
						&& prevAvailableImage === 3
						? classes.left_swipe
						: classes.right_swipe
					: availableImage === 3
						&& prevAvailableImage === 0
						? classes.right_swipe
						: classes.left_swipe
				: '',
		]
		return styles
	}


	return (
		<section className={classes.root}
			onMouseOver={() => {
				onMouseOver()
			}}
			onMouseLeave={() => {
				onMouseLeave()
			}}
		>
			{loading
				?
				<div className={classes.loading}>
					<Loader />
				</div>
				:
				<>
					<div className={classes.images}
					>
						{
							product?.images.map((image, i) =>
								<div className={classes.image} key={image}
									onDragStart={(e) => {
										e.preventDefault()
									}}
									onMouseDown={(e) => {
										setMouseStart(e.pageX)
										setMouseDown(true)
									}}
									onMouseUp={(e) => {
										onMouseUp(e.pageX)
										setMouseDown(false)
									}}
									onTouchStart={(e: any) => {
										setMouseStart(e.changedTouches[0].pageX)
									}}
									onTouchEnd={(e) => {
										onMouseUp(e.changedTouches[0].pageX)
									}}
								>
									<img className={setImageClass(i).join(' ')}
										src={Paths.APIUrl + product.images[i]} alt=""
									/>
								</div>
							)
						}
					</div>
					<div className={[classes.shadow, bottomVisible === 1 && hovered || bottomVisible === 2 && hovered ? classes.big : classes.small].join(' ')}></div>

					<Dress bottomVisible={bottomVisible} setBottomVisible={setBottomVisible} hovered={hovered} />
					{(bottomVisible === 0 || (bottomVisible !== 0 && !hovered)) &&
						<ul className={classes.buttons}>
							{
								product?.images.map((image, i) =>
									<li className={[availableImage === i ? classes.available : ''].join(' ')} key={image} onClick={() => {
										setPrevAvailableImage(availableImage);
										setAvailableImage(i)
									}}></li>
								)
							}
						</ul>
					}
				</>
			}


		</section>
	)
}

export { Slider }
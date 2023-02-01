import React, { FC, useEffect, useRef, useState } from 'react'
import { Content } from '../../../../../models/Contents';
import classes from './Snake.module.scss'

interface SnakeProps {
	element: Content;
}

const Snake: FC<SnakeProps> = ({ element }) => {
	const snake = useRef<HTMLDivElement>(null)
	const priceRef = useRef<HTMLDivElement>(null)

	const [price, setPrice] = useState<number>(10000)

	const [clickMin, setClickMin] = useState<boolean>(false)
	const [clickMax, setClickMax] = useState<boolean>(false)

	const [minprice, setMinprice] = useState<number | string>(0)
	const [maxprice, setMaxprice] = useState<number | string>(price)

	const [prepricePosition, setPrepricePosition] = useState<number>(0)
	const [minpricePosition, setMinpricePosition] = useState<number>(0)
	const [pricePosition, setPricePosition] = useState<number>(0)
	const [maxpricePosition, setMaxpricePosition] = useState<number>(0)
	const [postpricePosition, setPostpricePosition] = useState<number>(0)

	useEffect(() => {
		if (snake.current) {
			setPricePosition(snake.current?.offsetWidth)
			setMaxpricePosition(snake.current?.offsetWidth)
		}
	}, [snake.current])

	useEffect(() => {

		if (maxpricePosition <= (minpricePosition + 20)) {
			setMinpricePosition(maxpricePosition - 20)
		}
		if (minpricePosition >= (maxpricePosition - 20)) {
			setMaxpricePosition(minpricePosition + 20)
		}

		setPrepricePosition(minpricePosition)
		setPricePosition(maxpricePosition - minpricePosition)
		if (snake.current) {
			if (maxpricePosition > snake.current?.offsetWidth) {
				return setMaxpricePosition(snake.current?.offsetWidth)
			}
			if (minpricePosition < 0) {
				return setMinpricePosition(0)
			}
			setPostpricePosition(snake.current?.offsetWidth - maxpricePosition)
			if (clickMin || clickMax) {
				setMinprice(minpricePosition / snake.current?.offsetWidth * 100 * (price / 100))
				setMaxprice(maxpricePosition / snake.current?.offsetWidth * 100 * (price / 100))

			}
		}

	}, [minpricePosition, maxpricePosition])
	useEffect(() => {
		if (snake.current) {
			if (!clickMin && !clickMax) {
				setPrepricePosition(snake.current?.offsetWidth * ((+minprice / (price / 100)) / 100))
				setMinpricePosition(snake.current?.offsetWidth * ((+minprice / (price / 100)) / 100))

				setPricePosition(snake.current?.offsetWidth * ((+maxprice / (price / 100)) / 100))
				setMaxpricePosition(snake.current?.offsetWidth * ((+maxprice / (price / 100)) / 100))
				setPostpricePosition(snake.current?.offsetWidth - snake.current?.offsetWidth * ((+maxprice / (price / 100)) / 100))
			}
		}
	}, [minprice, maxprice])

	function handleMouseDown(e: any, setClick: React.Dispatch<React.SetStateAction<boolean>>) {

		e.preventDefault();

		setClick(true)

	}
	function handleMove(event: any, setPricePosition: React.Dispatch<React.SetStateAction<number>>, click: boolean) {
		if (click) {

			const position = getRelativeX(event, event.currentTarget)

			return setPricePosition(position)

		}
	}

	function onSnakeClick(event: any) {
		const position = getRelativeX(event, event.currentTarget)
		if (snake.current) {
			if (position > (snake.current?.offsetWidth / 2)) {
				setMaxpricePosition(position)

			}
			if (position <= (snake.current?.offsetWidth / 2)) {
				setMinpricePosition(position)
			}
		}
	}


	function getRelativeX(event: any, referenceElement: any) {

		let x = event.pageX

		let left = referenceElement.offsetLeft

		let reference = referenceElement.offsetParent;

		while (reference) {
			left += reference.offsetLeft;
			reference = reference.offsetParent;
		}

		return x = x - left

	}

	return (
		<li className={classes.root}
			onMouseUp={() => {
				setClickMin(false)
				setClickMax(false)
			}}
			onClick={(e) => { e.stopPropagation() }}
		>
			<div className={classes.snake}
				ref={snake}
				onClick={(event) => {
					onSnakeClick(event)
				}}
				onMouseLeave={() => {
					setClickMin(false)
					setClickMax(false)
				}}
				onMouseMove={(event) => {
					if (clickMax) {
						handleMove(event, setMaxpricePosition, clickMax)
					}
					if (clickMin) {
						handleMove(event, setMinpricePosition, clickMin)
					}
				}}
			>
				<div className={classes.preprice}
					onClick={(e) => { e.stopPropagation() }}
					style={{ flex: `0 1 ${prepricePosition}px` }}
				></div>
				<div className={classes.minprice}
					onClick={(e) => { e.stopPropagation() }}
					onMouseDown={(e) => { handleMouseDown(e, setClickMin); }}
				>
					<span></span>
				</div>
				<div className={classes.price}
					onClick={(e) => { e.stopPropagation() }}
					ref={priceRef}
					style={{ flex: `0 1 ${pricePosition}px` }}
				></div>
				<div className={classes.maxprice}
					onClick={(e) => { e.stopPropagation() }}
					onMouseDown={(e) => { handleMouseDown(e, setClickMax) }}
				>
					<span></span>
				</div>
				<div className={classes.postprice}
					onClick={(e) => { e.stopPropagation() }}
					style={{ flex: `0 1 ${postpricePosition}px` }}
				></div>
			</div>
			<ul className={classes.prices}>
				<input type='text' className={classes.minprice} value={minprice} onChange={(event) => setMinprice(event.target.value)} />
				<input type='text' className={classes.maxprice} value={maxprice} onChange={(event) => setMaxprice(event.target.value)} />
			</ul>
		</li>
	)
}

export { Snake }
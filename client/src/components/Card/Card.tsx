import React, { FC, useEffect, useRef, useState } from 'react'
import { Slider, Info } from './Components';
import classes from './Card.module.scss'
import { Product } from '../../models/Product';

interface CardProps {
	product?: Product;
	loading?: boolean;
}

const Card: FC<CardProps> = ({ product, loading }) => {
	const [bottomVisible, setBottomVisible] = useState<number>(0)

	const [time, setTime] = useState<number>(0);
	const [hovered, setHovered] = useState<boolean>(false)
	const timer = useRef<null | ReturnType<typeof setInterval>>(null)
	const timeout = useRef<null | ReturnType<typeof setTimeout>>(null)

	function startTimer() {
		if (timer.current) {
			clearInterval(timer.current)
		}
		timer.current = setInterval(() => incrementTimer(), 1000)
	}
	function stopTimer() {
		if (timer.current) {

			clearInterval(timer.current)
		}
	}

	function incrementTimer() {
		setTime(time => time + 1)
	}

	useEffect(() => {
		if (time >= 15 && bottomVisible !== 2) {
			setBottomVisible(1)

		}
	}, [time])

	return (
		<div className={[classes.root, hovered ? classes.hovered : ''].join(' ')}
			onMouseOver={() => {
				if (!loading) {
					if (timeout.current)
						clearTimeout(timeout.current)
					setHovered(true)
					startTimer()

				}
			}}
			onMouseLeave={() => {
				if (!loading) {
					stopTimer()
					timeout.current = setTimeout(() => {
						setHovered(false)
					}, 3000)
				}
			}}>
			<Slider product={product} bottomVisible={bottomVisible} setBottomVisible={setBottomVisible} hovered={hovered} loading={loading} />
			<Info product={product} bottomVisible={bottomVisible} setBottomVisible={setBottomVisible} loading={loading} />
		</div>
	)
}

export { Card }
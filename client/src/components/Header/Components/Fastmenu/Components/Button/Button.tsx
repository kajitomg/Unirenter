import React, { FC, useEffect } from 'react'
import { useActions } from '../../../../../../hooks/useActions'
import { Content } from '../../../../../../models/Contents';
import { useTypedSelector } from '../../../../../../hooks/useTypedSelector';
import classes from './Button.module.scss';
import { useApplyParams } from '../../../../../../hooks/useApplyParams';

interface ButtonProps {
	element: Content;
	disabled: boolean;
}

const Button: FC<ButtonProps> = ({ element, disabled }) => {
	const applyParams = useApplyParams()

	const buttonClass = [classes.root, disabled ? classes.disabled : '', element.available ? classes.available : '']

	let { categories } = useTypedSelector(state => state.category)
	let { filters } = useTypedSelector(state => state.filter)

	const { fetchFilterAction, clearFilterAction, updateAvailabledCategoriesAction } = useActions()

	function disableCategory() {
		categories.map((category) => {
			if (category._id === element._id && element.available) {
				return clearFilterAction()
			}
			category.available = false
		})
	}
	function availableCategory() {
		categories.map((category) => {
			if (element._id === category._id && !category.available) {
				return
			}
			if (element._id === category._id) {
				clearFilterAction()
				return fetchFilterAction(category.filters, filters)
			}
		})
	}
	function toggleAvailable() {
		element.available = !element.available
	}
	return (
		<button className={buttonClass.join(' ')} onClick={() => {
			disableCategory()
			toggleAvailable()
			availableCategory()
			applyParams()
			updateAvailabledCategoriesAction(categories)
		}}>{element.name}</button>
	)
}

export { Button }
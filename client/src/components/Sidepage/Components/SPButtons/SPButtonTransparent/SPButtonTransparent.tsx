import React, { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../../../../../hooks/useActions'
import { useApplyParams } from '../../../../../hooks/useApplyParams'
import { searchAvailable } from '../../../../../hooks/useSearchAvailable'
import { useTypedSelector } from '../../../../../hooks/useTypedSelector'
import { makeParamString } from '../../../../../models/Url'
import classes from './SPButtonTransparent.module.scss'

interface SPButtonProps {
	rerender?: () => void;
	children: ReactNode;
}

const SPButtonTransparent: FC<SPButtonProps> = ({ children, rerender }) => {
	const applyParams = useApplyParams()

	const category = useTypedSelector(state => state.category)
	const menu = useTypedSelector(state => state.menu)

	const { clearFilterAction } = useActions()

	return (
		<div className={classes.root} onClick={() => {
			applyParams('', [], [], menu.menus)
			category.categories.forEach(category => {
				category.available = false
			})
			clearFilterAction()
			if (rerender) {
				rerender()
			}
		}}>
			<span className={classes.text}>{children}</span>
		</div>
	)
}

export { SPButtonTransparent }
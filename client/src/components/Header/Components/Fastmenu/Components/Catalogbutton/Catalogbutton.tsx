import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom';
import { searchAvailable } from '../../../../../../hooks/useSearchAvailable';
import { useTypedSelector } from '../../../../../../hooks/useTypedSelector';
import { makeParamString } from '../../../../../../models/Url';
import { Changers } from '../../../../../../models/Changer';
import { Sidepage, TypeSP } from '../../../../../../models/Sidepage';
import { Buttons } from '../../../../../../static/instances/button';

import classes from './Catalogbutton.module.scss';
import { useApplyParams } from '../../../../../../hooks/useApplyParams';

interface ButtonProps {
	sidepage: Sidepage;
	rerender: () => void;
	type: TypeSP;
}

const Catalogbutton: FC<ButtonProps> = ({ sidepage, type, rerender }) => {
	const applyParams = useApplyParams()

	const buttonClass = [classes.root, (sidepage.available && sidepage.type === type) ? classes.available : '']

	let { categories } = useTypedSelector(state => state.category)
	let { filters } = useTypedSelector(state => state.filter)

	return (
		<button className={buttonClass.join(' ')} onClick={() => {
			type.changers.map(changer => {

				if (changer.available && changer.name === Changers.category) {
					sidepage.setSidepage(type, categories, true)
				}
				if (changer.available && changer.name === Changers.compilation) {
					sidepage.setSidepage(type, filters, true)
				}
				if (changer.available && changer.name === Changers.filter) {
					sidepage.setSidepage(type, filters, true)
				}

			})
			applyParams()
			rerender()
		}}>{Buttons.catalog.name}</button>
	)
}

export { Catalogbutton }
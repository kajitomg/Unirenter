import React, { FC, useState } from 'react'
import { useActions } from '../../../../hooks/useActions'
import { useApplyParams } from '../../../../hooks/useApplyParams'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { Changers } from '../../../../models/Changer'
import { CatalogSP, Sidepage } from '../../../../models/Sidepage'
import classes from './Management.module.scss'

interface ManagementProps {
	view: number;
	setView: (number: number) => void;
}

const Management: FC<ManagementProps> = ({ setView, view }) => {

	const applyParams = useApplyParams()

	const [catalog, setCatalog] = useState<CatalogSP>(new CatalogSP())
	const [sidepage, setSidepage] = useState<Sidepage>(new Sidepage())


	const filter = useTypedSelector(state => state.filter)

	const { updateAvailabledFiltersAction } = useActions()
	return (
		<>
			<div className={[classes.views, window.location.pathname === '/catalog' ? classes.available : ''].join(' ')}>
				<span className={classes.text}>Вид:</span>
				<div className={classes.buttons}>
					<button className={[classes.viewbutton, view === 1 ? classes.available : ''].join(' ')} onClick={() => {
						setView(1)
					}}>1</button>
					<button className={[classes.viewbutton, view === 2 ? classes.available : ''].join(' ')} onClick={() => {
						setView(2)
					}}>2</button>
				</div>
			</div>
			<button className={classes.filterbutton}>
				<span className={classes.text} onClick={() => {
					catalog.changers.map(changer => {
						changer.available = false;
						if (changer.name === Changers.filter) {
							changer.available = true;
							sidepage.setSidepage(catalog, filter.filters, true)
						}
					})
					applyParams()
					updateAvailabledFiltersAction(filter.filters)
				}}>Фильтр</span>
				<div className={classes.image}>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</button>
		</>
	)
}

export { Management }
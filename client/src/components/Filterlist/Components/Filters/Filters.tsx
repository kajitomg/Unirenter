import React, { FC } from 'react'
import { useActions } from '../../../../hooks/useActions'
import { useApplyParams } from '../../../../hooks/useApplyParams'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { Loader } from '../../../Loader'
import classes from './Filters.module.scss'

interface FiltersProps {

}

const Filters: FC<FiltersProps> = ({ }) => {
	const applyParams = useApplyParams()

	const mockFilters = [[], [], [], [], [], [], [], [], [], []]

	const { updateAvailabledFiltersAction } = useActions()

	const filter = useTypedSelector(state => state.filter)
	const category = useTypedSelector(state => state.category)

	return (
		<ul className={[classes.root, filter.filters.length > 0 || filter.loading || category.loading ? classes.available : ''].join(' ')}>
			{
				filter.loading || category.loading
					?
					mockFilters.map((filterItteration, i) =>
						<li className={[classes.element, classes.loading].join(' ')} key={i} onClick={() => {
						}}>
							<Loader />
						</li>
					)
					:
					filter.filters.map((filterItteration, i) =>
						<li className={[classes.element, filterItteration.available ? classes.available : ''].join(' ')} key={filterItteration._id} onClick={() => {
							filterItteration.available = !filterItteration.available
							applyParams()
							updateAvailabledFiltersAction(filter.filters)
						}}>
							{filterItteration.name}
						</li>
					)
			}
		</ul>
	)
}

export { Filters }
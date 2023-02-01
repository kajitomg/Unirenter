import React, { FC, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useActions } from '../../../../hooks/useActions';
import { searchAvailable } from '../../../../hooks/useSearchAvailable';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Changer, Changers } from '../../../../models/Changer';
import { Content } from '../../../../models/Contents';
import { makeParamString } from '../../../../models/Url';
import { Bubbles, Snake } from '../..';
import classes from './SPContent.module.scss'
import { useApplyParams } from '../../../../hooks/useApplyParams';

interface SPContentProps {
	changers: Changer[];
	element: Content;
}

const SPContent: FC<SPContentProps> = ({ changers, element }) => {
	const applyParams = useApplyParams()

	const { menus } = useTypedSelector(state => state.menu)
	const { categories } = useTypedSelector(state => state.category)
	const { filters } = useTypedSelector(state => state.filter)

	const { fetchFilterAction, clearFilterAction, updateAvailabledCategoriesAction, updateAvailabledFiltersAction, updateAvailabledMenusAction } = useActions()

	return (
		<>
			<li className={[classes.root, element.available ? classes.available : ''].join(' ')} key={element._id} onClick={() => {
				changers.map((changer) => {
					changer.name === Changers.menu && changer.available &&
						menus.map((menu) => {
							if (element._id === menu._id && menu.available) {
								return
							}
							menu.available = false
						})
					changer.name === Changers.category && changer.available &&
						categories.map((category) => {
							if (element._id === category._id && category.available) {
								return clearFilterAction()
							}
							category.available = false
						})
				})
				element.available = !element.available;
				categories.map((category) => {
					if (element._id === category._id && !category.available) {
						return
					}
					if (element._id === category._id) {
						clearFilterAction()
						return fetchFilterAction(category.filters, filters)
					}
				})
				updateAvailabledCategoriesAction(categories)
				updateAvailabledFiltersAction(filters)
				updateAvailabledMenusAction(menus)
				applyParams()

			}}>
				<section className={classes.open}>
					<span className={[classes.name, classes.nameBlack, element.available ? classes.available : ''].join(' ')}>
						{element.name}
					</span>
					{((element.meanings !== null && element.meanings?.length > 0) || element.paramName === 'price' || element.paramName === 'size') &&
						<div className={[classes.arrow, element.available ? classes.available : ''].join(' ')} >
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M19.4447 8.48145L12.4815 15.4446L5.51836 8.48144" stroke="#2B2A28" />
							</svg>
						</div>
					}
				</section>
				<ul className={[classes.list, element.available ? classes.available : ''].join(' ')}>
					{
						element.paramName === 'price'
							?
							<ul>
								<Snake element={element} />
							</ul>
							:
							element.paramName === 'size'
								?
								<Bubbles elements={element.meanings} />
								:
								element.meanings?.map((meaning, i) =>
									<li key={element._id + meaning._id} className={[classes.item, meaning.available ? classes.available : ''].join(' ')}
										onClick={(e) => {
											e.stopPropagation();
											meaning.available = !meaning.available;
											updateAvailabledCategoriesAction(categories)
											updateAvailabledFiltersAction(filters)
											updateAvailabledMenusAction(menus)
											applyParams()

										}}>
										<section className={[classes.open, meaning.available ? classes.available : ''].join(' ')} >
											<span className={[classes.name, meaning.available ? classes.available : ''].join(' ')} >
												{meaning.name}
											</span>
											{meaning.content !== null && meaning.content?.length > 0 &&
												<div className={[classes.arrow, classes.arrowMiddle, meaning.available ? classes.available : ''].join(' ')}>
													<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M19.4447 8.48145L12.4815 15.4446L5.51836 8.48144" stroke="#2B2A28" />
													</svg>
												</div>
											}
										</section>
										<ul className={[classes.list, meaning.available ? classes.available : ''].join(' ')}>
											{
												meaning.content !== null &&
												meaning.content.map(content =>
													<li key={element._id + meaning._id + content.paramName} className={[classes.root, content.available ? classes.available : ''].join(' ')}
														onClick={async (e) => {
															e.stopPropagation();
															content.available = !content.available;
															updateAvailabledCategoriesAction(categories)
															updateAvailabledFiltersAction(filters)
															updateAvailabledMenusAction(menus)
															applyParams()

														}}>
														<section className={classes.open}>
															<span className={[classes.name, classes.nameUnderline, content.available ? classes.available : ''].join(' ')}>
																{content.name}
															</span>
														</section>
													</li>
												)
											}
										</ul>
									</li>
								)
					}
				</ul>

			</li>



		</>
	)
}

export { SPContent }
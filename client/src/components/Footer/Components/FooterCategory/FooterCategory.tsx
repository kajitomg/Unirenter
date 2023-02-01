import React, { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useActions } from '../../../../hooks/useActions';
import { useApplyParams } from '../../../../hooks/useApplyParams';
import { searchAvailable } from '../../../../hooks/useSearchAvailable';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Category } from '../../../../models/Category';
import { makeParamString } from '../../../../models/Url';
import classes from './FooterCategory.module.scss'

interface CategoryProps {
	element: Category;
}

const FooterCategory: FC<CategoryProps> = ({ element }) => {
	const applyParams = useApplyParams()

	const { fetchFilterAction, clearFilterAction } = useActions()

	const category = useTypedSelector(state => state.category)
	const filter = useTypedSelector(state => state.filter)

	return (
		<button className={[classes.root, element.available ? classes.available : ''].join(' ')} key={element._id} onClick={async () => {
			category.categories.map((innerIterationCategory) => {
				if (innerIterationCategory._id === element._id && innerIterationCategory.available) {
					return filter.filters = []
				}
				innerIterationCategory.available = false
			})
			element.available = !element.available
			applyParams()
			category.categories.map(async (innerIterationCategory) => {
				if (element._id === innerIterationCategory._id && !innerIterationCategory.available) {
					return
				}
				if (element._id === innerIterationCategory._id) {
					clearFilterAction()
					return fetchFilterAction(innerIterationCategory.filters, filter.filters)
				}
			})
		}}>
			<section className={classes.open}>
				<span className={[classes.name, element.available ? classes.available : ''].join(' ')}>
					{element.name}
				</span>
				{element.meanings !== null && element.meanings?.length > 0 &&
					<div className={[classes.arrow, element.available ? classes.available : ''].join(' ')} key={element._id}>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M19.4447 8.48145L12.4815 15.4446L5.51836 8.48144" stroke="#2B2A28" />
						</svg>
					</div>
				}
			</section>
			{element.meanings !== null && element.available &&
				<ul className={classes.list}>
					{
						element.available &&
						element.meanings?.map(meaning =>
							<li key={element._id + meaning._id} className={[classes.item, meaning.available ? classes.available : ''].join(' ')}
								onClick={(e) => {
									e.stopPropagation();
									meaning.available = !meaning.available;
									applyParams()

								}}>
								<section className={[classes.open, meaning.available ? classes.available : ''].join(' ')} key={element._id}>
									<span className={[classes.name, meaning.available ? classes.available : ''].join(' ')} key={element._id}>
										{meaning.name}
									</span>
									{meaning.content !== null && meaning.content?.length > 0 &&
										<div className={[classes.arrow, classes.middle].join(' ')}>
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M19.4447 8.48145L12.4815 15.4446L5.51836 8.48144" stroke="#2B2A28" />
											</svg>
										</div>
									}
								</section>
								<ul className={classes.list}>
									{
										meaning.content !== null && meaning.available &&
										meaning.content.map(content =>
											<li key={element._id + meaning._id + content.paramName} className={[classes.item, content.available ? classes.available : ''].join(' ')}
												onClick={(e) => {
													e.stopPropagation();
													content.available = !content.available;
													applyParams()

												}}>
												<section className={classes.open}>
													<span className={[classes.name, classes.underline, content.available ? classes.available : ''].join(' ')} key={element._id}>
														{content.name}
													</span>
												</section>
											</li>
										)
									}
								</ul>
							</li>
						)}
				</ul>
			}
		</button>
	)
}

export { FooterCategory }
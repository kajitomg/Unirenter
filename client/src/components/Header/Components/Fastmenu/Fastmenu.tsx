import React, { FC, useEffect, useState } from 'react'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { Sidepage, CatalogSP } from '../../../../models/Sidepage';
import { Loader } from '../../../Loader';
import { Button, Catalogbutton } from './Components';
import classes from './Fastmenu.module.scss'

interface FastMenuProps {
	rerender: () => void;
	sidepage: Sidepage;
	catalog: CatalogSP;
}

const Fastmenu: FC<FastMenuProps> = ({ sidepage, catalog, rerender }) => {
	const mokeData = [[], [], [], [], [], [], [], []]

	const { categories, loading: categoryLoading } = useTypedSelector(state => state.category)
	return (
		<section className={classes.root}>
			<ul className={classes.buttons}>
				{categoryLoading
					?
					mokeData.map((data, index) =>
						index < 10 ?
							index >= 4
								?
								<div className={[classes.loading, classes.disabled].join(' ')} key={index}>
									<Loader />
								</div>
								:
								<div className={classes.loading} key={index}>
									<Loader />
								</div>
							: ''
					)
					:
					!categoryLoading && categories.map((category, index) =>
						index < 8 ?
							index >= 4
								?
								<Button element={category} disabled={true} key={category._id} />
								:
								<Button element={category} disabled={false} key={category._id} />
							: ''
					)
				}
			</ul>
			<div className={classes.catalog}>
				<Catalogbutton rerender={rerender} sidepage={sidepage} type={catalog} />
			</div>
		</section>

	)
}

export { Fastmenu }
import React, { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Filters, Management } from './Components';
import classes from './Filterlist.module.scss'

interface FilterlistProps {
	view: number;
	setView: (value: number) => void;

}

const Filterlist: FC<FilterlistProps> = ({ setView, view }) => {

	const location = useLocation()


	return (
		<section className={[classes.root, location.pathname === '/catalog' ? classes.available : ''].join(' ')}>
			<div className={classes.left}>
				<Filters />
			</div>
			<div className={classes.right}>
				<Management setView={setView} view={view} />
			</div>
		</section>
	)
}

export { Filterlist }
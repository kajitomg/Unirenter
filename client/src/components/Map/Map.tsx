import React, { useEffect } from 'react'
import classes from './Map.module.scss'

const Map = () => {


	return (
		<div style={{ width: '100%', height: '100%' }} className={classes.root}>
			<script type="text/javascript" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Aeee8ace2d2d28e3ab2f55b2e0ebf4d05c73c3d341c2c18ca2f3bf32bab2b5f45&amp;width=100%25&amp;height=400&amp;lang=ru_RU&amp;scroll=true"></script>
		</div>
	)
}

export { Map }
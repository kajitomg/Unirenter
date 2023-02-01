import React, { useRef } from 'react'
import ReactPlayer from 'react-player'
import classes from './Video.module.scss'

const Video = () => {
	return (
		<div className={classes.root}>
			<ReactPlayer
				width={'100%'}
				height={'100%'}
				url={'./../../video/video.mp4'}
				playing={true}
				controls={true}
			/>
		</div>

	)
}

export { Video }
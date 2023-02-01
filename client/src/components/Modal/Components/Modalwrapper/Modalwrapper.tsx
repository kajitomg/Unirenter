import React, { FC, useState } from 'react'
import classes from './Modalwrapper.module.scss'

interface ModalwrapperProps {
	children: React.ReactNode
	wrapperClass: Array<any>;
	showModal: () => void;
}

const Modalwrapper: FC<ModalwrapperProps> = ({ children, showModal, wrapperClass }) => {

	return (
		<section className={wrapperClass.join(' ')} onClick={() => {
			showModal()
		}}>
			{children}
		</section>
	)
}

export { Modalwrapper }
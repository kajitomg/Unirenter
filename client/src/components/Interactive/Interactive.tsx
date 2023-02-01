import React, { FC, useEffect, useState } from 'react'
import calsses from './Interactive.module.scss'
import { Makean } from '../Makean/Makean'
import { useLocation, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

interface InteractiveProps {
	showModal: () => void;
}

const Interactive: FC<InteractiveProps> = ({ showModal }) => {
	const location = useLocation()

	const { fetchCollectionAction, fetchProductAction } = useActions()

	const product = useTypedSelector(state => state.collection)
	const collection = useTypedSelector(state => state.product)

	const [productpage, setProductpage] = useState<number>(product.page)
	const [collectionpage, setCollectionpage] = useState<number>(collection.page);
	const [resize, setResize] = useState<number>(window.innerWidth);
	const [disableMakean, setDisableMakean] = useState(false)

	useEffect(() => {
		if (resize >= 550 && resize <= 1100) {
			setDisableMakean(true)
		}
	}, [resize])
	const handleResize = () => {
		setResize(window.innerWidth);
	};
	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	return (
		<section className={[calsses.root, !location.pathname.split('/')[2] && location.pathname !== '/like' ? calsses.available : ''].join(' ')}>
			<div className={calsses.columns}>
				{resize >= 550 &&
					<div className={calsses.column}>
						<div className={calsses.recording_wrapper} onClick={() => {
							if (resize >= 550 && resize <= 1100) {
								showModal()
							}
						}}>
							<Makean disable={disableMakean} />
						</div>
					</div>
				}
				<div className={calsses.column}>
					<div className={calsses.loadmore_wrapper}>
						{/* {(location.pathname === '/catalog') && productpage > product.pages  - 1
							|| (location.pathname === '/homepage' || location.pathname === '/') && collectionpage > collection.pages - 1 && */}
						<section className={calsses.loadmore}>
							<div className={calsses.text} onClick={() => {
								if ((location.pathname === '/catalog') && productpage < product.pages - 1) {
									const page = productpage + 1
									fetchProductAction(page)
									setProductpage(() => page)
								}
								if ((location.pathname === '/homepage' || location.pathname === '/') && collectionpage < collection.pages - 1) {
									const page = collectionpage + 1
									fetchCollectionAction(page)
									setCollectionpage(() => page)
								}

							}}>Смотреть еще</div>
						</section>
						{/* } */}

					</div>
				</div>
				{resize >= 550 &&
					<div className={calsses.column}>
						<div className={calsses.chat_wrapper}>
							<section className={calsses.chat}>
								<div className={calsses.circle}>

								</div>
								<div className={calsses.icon}>
									<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M15.75 1.11163C16.0484 1.11163 16.3345 1.22874 16.5455 1.43722C16.7565 1.64569 16.875 1.92843 16.875 2.22325V11.1163C16.875 11.4111 16.7565 11.6938 16.5455 11.9023C16.3345 12.1108 16.0484 12.2279 15.75 12.2279H4.96575C4.36906 12.228 3.79686 12.4623 3.375 12.8793L1.125 15.1026V2.22325C1.125 1.92843 1.24353 1.64569 1.4545 1.43722C1.66548 1.22874 1.95163 1.11163 2.25 1.11163H15.75ZM2.25 0C1.65326 0 1.08097 0.234235 0.65901 0.651176C0.237053 1.06812 0 1.63361 0 2.22325L0 16.4443C2.36417e-05 16.5543 0.0330667 16.6618 0.0949469 16.7532C0.156827 16.8446 0.244763 16.9158 0.347624 16.9578C0.450486 16.9999 0.563649 17.0108 0.672791 16.9892C0.781932 16.9676 0.882147 16.9146 0.96075 16.8367L4.17037 13.6652C4.3813 13.4567 4.66741 13.3396 4.96575 13.3395H15.75C16.3467 13.3395 16.919 13.1053 17.341 12.6884C17.7629 12.2714 18 11.7059 18 11.1163V2.22325C18 1.63361 17.7629 1.06812 17.341 0.651176C16.919 0.234235 16.3467 0 15.75 0L2.25 0Z" fill="#2B2A28" />
									</svg>
								</div>
							</section>
						</div>
					</div>
				}
			</div>
		</section >
	)
}

export { Interactive }
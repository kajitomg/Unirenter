import React, { FC, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useActions } from '../../../../hooks/useActions';
import { useAnimatedShow } from '../../../../hooks/useAnimatedShow';
import { useApplyParams } from '../../../../hooks/useApplyParams';
import { searchAvailable } from '../../../../hooks/useSearchAvailable';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Changers } from '../../../../models/Changer';
import { TypeSP, Sidepage } from '../../../../models/Sidepage';
import { makeParamString } from '../../../../models/Url';
import classes from './Buttons.module.scss'

interface ButtonsProps {
	scroll: number;
	rerender: () => void;
	sidepage: Sidepage;
	catalog: TypeSP;
	burger: TypeSP;
}

const Buttons: FC<ButtonsProps> = ({ scroll, rerender, catalog, sidepage, burger }) => {
	const applyParams = useApplyParams()

	const { compiledClass, show, visible } = useAnimatedShow(classes.input, 200, classes)

	const { searchProductAction } = useActions()

	const [search, setSearch] = useState('');
	const category = useTypedSelector(state => state.category)

	return (
		<section className={[classes.root, scroll > 70 ? classes.big : ''].join(' ')}>
			<button className={classes.button}>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M13.8644 8.2363H10.1339C8.58889 8.2363 6.26539 6.9298 5.40739 6.0658C4.19989 4.8493 4.19989 2.8678 5.40889 1.6513C6.58339 0.469297 8.63239 0.469297 9.80839 1.6513C10.4579 2.3053 12.1829 4.9618 11.9459 6.7348H12.0524C11.8154 4.9618 13.5404 2.3053 14.1914 1.6513C15.3644 0.469297 17.4134 0.466297 18.5909 1.6513C19.8014 2.8678 19.8014 4.8478 18.5909 6.0643C17.7329 6.9283 15.4094 8.2363 13.8644 8.2363ZM13.8644 6.7363C14.9009 6.7363 16.8809 5.6593 17.5259 5.0083C18.1559 4.3753 18.1559 3.3433 17.5259 2.7103C16.9169 2.0968 15.8594 2.0998 15.2534 2.7103C14.2424 3.7273 13.2374 6.3253 13.5869 6.6868C13.5884 6.6868 13.6514 6.7363 13.8644 6.7363ZM7.60939 2.2363C7.18039 2.2363 6.77689 2.4043 6.47239 2.7103C5.84389 3.3433 5.84389 4.3753 6.47239 5.0083C7.11889 5.6593 9.09739 6.7363 10.1339 6.7363C10.3484 6.7363 10.4114 6.6883 10.4114 6.6883C10.7609 6.3238 9.75589 3.7258 8.74489 2.7103C8.44039 2.4043 8.03689 2.2363 7.60939 2.2363Z" fill="#F44336" />
					<path d="M1.5 11.2363V21.7363C1.5 22.5643 2.1735 23.2363 3 23.2363H21C21.828 23.2363 22.5 22.5643 22.5 21.7363V11.2363H1.5Z" fill="#FFC107" />
					<path d="M22.5 6.73633H1.5C0.6735 6.73633 0 7.40983 0 8.23633V11.9863C0 12.4003 0.336 12.7364 0.75 12.7364H23.25C23.664 12.7364 24 12.4003 24 11.9863V8.23633C24 7.40833 23.328 6.73633 22.5 6.73633Z" fill="#FFD54F" />
					<path d="M13.5 6.73633H10.5V23.2363H13.5V6.73633Z" fill="#F44336" />
				</svg>
			</button>
			{scroll > 70 &&
				<button className={classes.button}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M15.9719 1.82835L22.3359 2.53546C22.3359 2.53546 23.043 8.89942 15.9719 15.9705C8.90087 23.0416 2.53553 22.3358 2.53553 22.3358L1.82843 15.9719L6.77955 13.1434L9.25374 15.6176C9.25374 15.6176 11.0215 15.2641 13.1428 13.1427C15.2641 11.0214 15.6177 9.25366 15.6177 9.25366L13.1435 6.77948L15.9719 1.82835Z" stroke="#2B2A28" />
					</svg>
				</button>
			}
			<input value={search} type='text' className={compiledClass.join(' ')} onChange={(event) => {
				setSearch(event.target.value)
			}} />
			<button className={classes.button} onClick={() => {
				if (!visible) {
					show()
				}
				if (visible && search.length > 0) {
					applyParams('/catalog')
					searchProductAction(search)
				}
				if (visible && search.length === 0) {
					show()
				}
			}}>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z" stroke="#2B2A28" />
					<path d="M22 21.9999L18.7823 18.7822" stroke="#2B2A28" />
				</svg>
			</button>
			{scroll < 70 &&
				<button className={[classes.button, classes.widthoff].join(' ')}>
					<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M22 11C22 16.5228 12 24 12 24C12 24 2 16.5228 2 11C2 5.47715 6.47715 1 12 1C17.5228 1 22 5.47715 22 11Z" stroke="#2B2A28" />
						<circle cx="12" cy="11" r="3" stroke="#2B2A28" />
					</svg>
				</button>
			}
			<button className={[classes.like, classes.button, window.location.pathname === '/like' ? classes.available : ''].join(' ')} onClick={() => {
				applyParams('/like')
			}}>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M2.77216 3.77216C0.40928 6.13503 0.409282 9.96602 2.77216 12.3289L11.937 21.4937L12 21.4307L12.0631 21.4938L21.2279 12.329C23.5908 9.96609 23.5908 6.13511 21.2279 3.77223C18.865 1.40936 15.034 1.40936 12.6712 3.77224L12.3536 4.08978C12.1584 4.28505 11.8418 4.28505 11.6465 4.08978L11.3289 3.77216C8.96601 1.40928 5.13503 1.40928 2.77216 3.77216Z" stroke="#2B2A28" />
				</svg>
			</button>
			{scroll > 70 &&
				<button className={classes.button} onClick={() => {
					sidepage.setSidepage(burger, category.categories, true)
					burger.changers.map((changer) => {
						changer.available = false;
						if (changer.name === Changers.category) {
							changer.available = true;
						}
					})
					rerender()
				}}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" clipRule="evenodd" d="M3 7.5V8.5H21V7.5H3ZM10 16.5H14V15.5H10V16.5ZM18 12.5H6V11.5H18V12.5Z" fill="#2B2A28" />
					</svg>
				</button>
			}

		</section>
	)
}

export { Buttons }
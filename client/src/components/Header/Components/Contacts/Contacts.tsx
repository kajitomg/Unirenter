import React, { FC, useState } from 'react'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { Addresses } from '../../../../models/Address'
import { Loader } from '../../../Loader'

import classes from './Contacts.module.scss'
interface ContactsProps {
}

const Contacts: FC<ContactsProps> = ({ }) => {

	const [changeContacts, setChangeContacts] = useState<boolean>(false)

	const address = useTypedSelector(state => state.address)

	const { fetchAddressAction } = useActions()

	return (
		<div className={[classes.root, changeContacts ? classes.available : ''].join(' ')}>
			<div className={[classes.content, changeContacts ? classes.available : ''].join(' ')}>
				<div className={classes.addresses}>
					<div className={classes.contact}>
						<span className={classes.address}>

							{address.loading
								?
								<div className={classes.loading_city}>
									<Loader />
								</div>
								:
								<>
									<button className={[classes.moreaddress, changeContacts ? classes.available : ''].join(' ')} onClick={() => {
										setChangeContacts(!changeContacts)
									}}>
										<svg className={[classes.arrow, changeContacts ? classes.available : ''].join(' ')} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M19.4447 8.48145L12.4815 15.4446L5.51836 8.48144" stroke="#2B2A28" />
										</svg>

										<span className={classes.country}>
											{address.address?.city}
										</span>
									</button>
									{address.address?.metro
										&&
										<span>
											, м. {address.address?.metro}
										</span>
									}
								</>
							}
						</span>
					</div>
					<div className={classes.contact}>
						{address.loading
							?
							<div className={classes.loading_street}>
								<Loader />
							</div>
							:
							<span className={classes.address}>{!address.loading && `ул. ${address.address?.street} д. ${address.address?.house} ${address.address?.building && `корпус ${address.address?.building}`}`}</span>
						}

					</div>
				</div>
				<div className={[classes.phonenumbers, changeContacts ? classes.available : ''].join(' ')}>
					{address.loading
						?
						<div className={[classes.loading_phonenumber, classes.big].join(' ')}>
							<Loader />
						</div>
						:
						<div className={[classes.phonenumber, classes.big].join(' ')}>{address.address?.phonenumber}</div>
					}
					{address.loading
						?
						<div className={classes.loading_phonenumber}>
							<Loader />
						</div>
						:
						<div className={classes.phonenumber}>{address.address?.phonenumber}</div>
					}
				</div>
				{
					changeContacts &&
					<div className={[classes.cruz, changeContacts ? classes.available : ''].join(' ')} onClick={() => {
						setChangeContacts(!changeContacts)
					}}>
						<span></span>
						<span></span>
					</div>
				}
			</div>

			<div className={[classes.menu, changeContacts ? classes.available : ''].join(' ')}>
				<div className={classes.content}>
					<div className={classes.city} onClick={() => {
						if (address.address?.city === Addresses.moskow) {
							fetchAddressAction(Addresses.saintpeterburg)
						}
						if (address.address?.city === Addresses.saintpeterburg) {
							fetchAddressAction(Addresses.moskow)
						}
					}}>
						<div className={classes.name}>

							{address.address?.city === Addresses.moskow
								?
								Addresses.saintpeterburg
								:
								Addresses.moskow
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export { Contacts }
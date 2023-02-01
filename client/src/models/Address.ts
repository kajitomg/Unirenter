
export enum AddressActionTypes {
	FETCH__ADDRESS = 'FETCH__ADDRESS',
	FETCH__ADDRESS__SUCCESS = 'FETCH__ADDRESS__SUCCESS',
	FETCH__ADDRESS__ERROR = 'FETCH__ADDRESS__ERROR',
}

export interface AddressState {
	address: Address | null;
	loading: boolean;
	error: null | string;
}
interface FetchAddressAction {
	type: AddressActionTypes.FETCH__ADDRESS;
}
interface FetchAddressSuccessAction {
	type: AddressActionTypes.FETCH__ADDRESS__SUCCESS;
	payload: Address;
}
interface FetchAddressErrorAction {
	type: AddressActionTypes.FETCH__ADDRESS__ERROR;
	payload: string;
}

export type AddressAction = FetchAddressAction | FetchAddressSuccessAction | FetchAddressErrorAction

export const Addresses = {
	moskow: 'Москва',
	saintpeterburg: 'Санкт-Петербург',
}

export class Address {
	private _city: string;
	private _metro: string | null;
	private _street: string;
	private _house: string;
	private _building: string | null;
	private _phonenumber: string;
	private _available: boolean;
	private _id: string;

	constructor(city: string, metro: string | null, street: string, house: string, building: string | null, phonenumber: string, id: string) {
		this._city = city;
		this._metro = metro;
		this._street = street;
		this._house = house;
		this._building = building;
		this._phonenumber = phonenumber;
		this._available = false;
		this._id = id;
	}
	public get city(): string {
		return this._city;
	}
	public get metro(): string | null {
		return this._metro;
	}
	public get street(): string {
		return this._street;
	}
	public get house(): string {
		return this._house;
	}
	public get building(): string | null {
		return this._building;
	}
	public get phonenumber(): string {
		return this._phonenumber;
	}
	public get available(): boolean {
		return this._available;
	}
	public set available(value: boolean) {
		this._available = value;
	}

	public get id(): string {
		return this._id;
	}

}

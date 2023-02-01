import { Content } from "../Contents";
import { TypeSP } from "./type/TypeSP";


export class Sidepage {
	private static _instance: Sidepage | null = null
	private _type: TypeSP | null;
	private _available: boolean;
	private _rerender: boolean;

	constructor(type: TypeSP | null = null) {
		this._type = type;
		this._available = false;
		this._rerender = false;

		if (Sidepage._instance) {
			return Sidepage._instance
		}

		Sidepage._instance = this
	}
	public get type(): TypeSP | null {
		return this._type;
	}
	public get available(): boolean {
		return this._available;
	}
	public get rerender(): boolean {
		return this._rerender;
	}
	public set rerender(value: boolean) {
		this._rerender = value;
	}

	public setSidepage(type: TypeSP | null = this._type, content: Content[] | null = type ? type.content : type, available: boolean = this._available) {
		this._type = type
		this.availableSidepage(available)
		this._type?.setContent(content, available)
	}
	private availableSidepage(available: boolean) {
		this._available = available;
	}
}
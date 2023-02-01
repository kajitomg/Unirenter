
import { Changer } from "../../Changer";
import { Content } from "../../Contents";

export enum SidepageTypes {
	burger = 'Burger',
	catalog = 'Catalog',
}

export class TypeSP {
	private _name: SidepageTypes | null;
	private _available: boolean;
	private _changers: Changer[];
	private _content: Content[] | null;

	constructor() {
		this._name = null;
		this._available = false;
		this._changers = [];
		this._content = [];
	}

	public get name(): SidepageTypes | null {
		return this._name;
	}
	public set name(value: SidepageTypes | null) {
		this._name = value;
	}
	public get available(): boolean {
		return this._available;
	}
	public set available(value: boolean) {
		this._available = value;
	}
	public get changers(): Changer[] {
		return this._changers;
	}
	public set changers(value: Changer[]) {
		this._changers = value;
	}
	public get content(): Content[] | null {
		return this._content;
	}

	public set content(value: Content[] | null) {
		this._content = value;
	}

	public availableType(availabale: boolean) {
		this._available = availabale;
	}
	public setContent(content: Content[] | null = this._content, availabale: boolean = this._available) {
		this._content = content;
		this.availableType(availabale)
	}

	public setChanger(changer: Changer) {
		this._changers.forEach(thisChanger => {
			thisChanger.available = false
			if (thisChanger.name === changer.name) {
				thisChanger.available = true
			}
		})
	}


}
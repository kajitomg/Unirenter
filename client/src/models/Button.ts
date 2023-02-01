
export enum ButtonsEnum {
	catalog = 'Каталог',
	rental = 'Прокат',
	sell = 'Продажа',
}


export class Button {
	private _name: ButtonsEnum;
	private _available: boolean;
	private id: string;

	constructor(name: ButtonsEnum) {
		this._name = name;
		this._available = false;
		this.id = Math.floor(Math.random() * 10 ** 10).toString();
	}
	public get name(): ButtonsEnum {
		return this._name;
	}
	public get available(): boolean {
		return this._available;
	}
	public set available(value: boolean) {
		this._available = value;
	}
	public get _id(): string {
		return this.id;
	}

}
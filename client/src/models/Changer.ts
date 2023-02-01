
export enum Changers {
	category = 'Катерогии',
	filter = 'Фильтр',
	compilation = 'Подборки',
	menu = 'Меню',
}

export enum ParamChangers {
	category = 'category',
	filter = 'filter',
	compilation = 'compilation',
	menu = 'menu',
}

export class Changer {
	private _name: Changers;
	private _available: boolean;
	private id: string;

	constructor(name: Changers, available: boolean) {
		this._name = name;
		this._available = available;
		this.id = Math.floor(Math.random() * 10 ** 10).toString();
	}
	public get name(): Changers {
		return this._name;
	}
	public set name(value: Changers) {
		this._name = value;
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
	public set _id(value: string) {
		this.id = value;
	}
}
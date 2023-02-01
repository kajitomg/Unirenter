
import { Changer, Changers } from "../../Changer";
import { TypeSP, SidepageTypes } from "./TypeSP";

export class BurgerSP extends TypeSP {
	private static _instance: BurgerSP | null = null

	constructor() {
		super()
		this.name = SidepageTypes.burger;
		this.available = false;

		if (BurgerSP._instance) {
			return BurgerSP._instance
		}

		BurgerSP._instance = this
	}

	public initChangers(): void {
		this.changers = [];
		this.changers.push(new Changer(Changers.menu, true))
		this.changers.push(new Changer(Changers.category, false))
	}
}
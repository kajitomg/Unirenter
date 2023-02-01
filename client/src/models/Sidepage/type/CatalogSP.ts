
import { Changer, Changers } from "../../Changer";
import { TypeSP, SidepageTypes } from "./TypeSP";

export class CatalogSP extends TypeSP {
	private static _instance: CatalogSP | null = null;


	constructor() {
		super()
		this.name = SidepageTypes.catalog;
		this.available = false;

		if (CatalogSP._instance) {
			return CatalogSP._instance
		}

		CatalogSP._instance = this
	}


	public initChangers(): void {
		this.changers = [];
		this.changers.push(new Changer(Changers.compilation, false))
		this.changers.push(new Changer(Changers.filter, false))
		this.changers.push(new Changer(Changers.category, true))
	}


}
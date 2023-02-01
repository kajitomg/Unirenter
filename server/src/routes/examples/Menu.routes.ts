import { Address } from "../../models/Address"
import { Meaning } from "../../models/Meaning"
import { Menu } from "../../models/Menu"

const Router = require('express')

const router = new Router()

router.post('/create',
	async (req, res) => {
		try {
			const { name, paramName } = req.body
			const menu = await new Menu({ available: false, meanings: null, type: 'menu', name, paramName })
			menu.save()
			res.status(200).json(menu)
		} catch (e) {
			res.status(400).json(e.message)
		}
	}
)
router.get('/get',
	async (req, res) => {
		try {
			const menu = await Menu.find({ type: 'menu' })
			res.status(200).json(menu)
		} catch (e) {
			res.status(400).json(e.message)
		}
	}
)

module.exports = router
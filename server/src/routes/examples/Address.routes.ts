import { Address } from "../../models/Address"
import { Category } from "../../models/Category"
import { Meaning } from "../../models/Meaning"

const Router = require('express')

const router = new Router()

router.post('/create',
	async (req, res) => {
		try {
			const { country, metro, street, house, building, phonenumber } = req.body
			const address = await new Address({ country, metro, street, house, building, phonenumber, available: false })
			address.save()
			res.status(200).json(address)
		} catch (e) {
			res.status(400).json(e.message)
		}
	}
)
router.post('/post',
	async (req, res) => {
		try {
			const { city } = req.body
			const address = await Address.find({ city })
			res.status(200).json(address)
		} catch (e) {
			res.status(400).json(e.message)
		}
	}
)


module.exports = router
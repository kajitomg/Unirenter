import { Category } from "../../models/Category"
import { Compilation } from "../../models/Compilation"
import { FilterMenu } from "../../models/Filter"
import { Meaning } from "../../models/Meaning"

const Router = require('express')

const router = new Router()

router.post('/create',
	async (req, res) => {
		try {
			const { name, paramName } = req.body
			const meanings = await Meaning.find({ paramName: { $ne: 'decoration' } })
			const filters = await FilterMenu.find({})
			const category = await new Category({ available: false, meanings, name, filters, compilations: filters, paramName })
			category.save()
			res.status(200).json(category)
		} catch (e) {
			res.status(400).json(e.message)
		}
	}
)
router.get('/get',
	async (req, res) => {
		try {

			const category = await Category.find({})
			res.status(200).json(category)
		} catch (e) {
			res.status(400).json(e.message)
		}
	}
)


module.exports = router
import { Category } from "../../models/Category"
import { FilterMenu } from "../../models/Filter"
import { Meaning } from "../../models/Meaning"

const Router = require('express')

const router = new Router()

router.post('/create',
	async (req, res) => {
		try {
			const { name, paramName } = req.body
			const meanings = await Meaning.find({ paramName: { $ne: 'decoration' } })
			const filter = await new FilterMenu({ available: false, meanings, type: 'filter', name, paramName })
			filter.save()
			res.status(200).json(filter)
		} catch (e) {
			res.status(400).json(e.message)
		}
	}
)
router.post('/get',
	async (req, res) => {
		try {
			const { filters } = req.body
			const outputFilters = await FilterMenu.find({ _id: { $in: filters } })
			res.status(200).json(outputFilters)
		} catch (e) {
			res.status(400).json(e.message)
		}
	}
)

module.exports = router
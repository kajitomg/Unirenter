import { Compilation } from "../../models/Compilation"
import { Meaning } from "../../models/Meaning"

const Router = require('express')

const router = new Router()

router.post('/create',
	async (req, res) => {
		try {
			const { name } = req.body
			const meanings = await Meaning.find({})
			const compilation = await new Compilation({ available: false, meanings, type: 'compilation', name })
			compilation.save()
			res.status(200).json(compilation)
		} catch (e) {
			res.status(400).json(e.message)
		}
	}
)
router.get('/get',
	async (req, res) => {
		try {
			const compilation = await Compilation.find({ type: 'compilation' })
			res.status(200).json(compilation)
		} catch (e) {
			res.status(400).json(e.message)
		}
	}
)

module.exports = router
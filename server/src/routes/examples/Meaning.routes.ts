import { Meaning } from "../../models/Meaning"

const Router = require('express')

const router = new Router()

router.post('/create',
	async (req, res) => {
		try {
			const { name, paramName, content } = req.body
			const meaning = await new Meaning({ available: false, content, name, paramName })
			meaning.save()
			res.status(200).json(meaning)
		} catch (e) {
			res.status(400).json(e.message)
		}
	}
)
router.post('/get',
	async (req, res) => {
		try {
			let { meanings } = req.body
			meanings = await Meaning.find({ _id: { $in: meanings } })
			res.status(200).json(meanings)
		} catch (e) {
			res.status(400).json(e.message)
		}
	}
)

module.exports = router
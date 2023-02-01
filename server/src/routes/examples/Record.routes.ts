import { Record } from "../../models/Record"
const Router = require('express')

const router = new Router()

router.post('/create',
	async (req, res) => {
		try {
			const { phonenumber, address } = req.body
			let addresses = [address]
			const record = await new Record({ phonenumber, address: addresses })
			record.save()
			res.status(200).json()
		} catch (e) {
			res.status(400).json(e.message)
		}
	}
)
module.exports = router
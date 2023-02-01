import { Meaning } from "../../models/Meaning"
import { Category } from "../../models/Category"
import { FilterMenu, IFilterProduct } from "../../models/Filter"
import { Product } from "../../models/Produt"

const Router = require('express')

const router = new Router()

router.post('/create',
	async (req, res) => {
		try {
			const { name, paramName, priceSell, priceRental } = req.body

			const category = await Category.findOne({ paramName: 'eveningDresses' })
			const filters = await FilterMenu.find({}, { type: 0 })

			let productFilters = []

			filters.forEach(filter => {
				productFilters.push({ _id: filter._id, name: filter.name, paramName: filter.paramName, meaning: filter.meanings ? filter.meanings[1] : null, available: filter.available })
			})
			const ph1 = 'photo1.jpg'
			const ph2 = 'photo2.jpg'
			const ph3 = 'photo3.jpg'
			const ph4 = 'photo4.jpg'

			const product = await new Product({ name, priceSell, priceRental, images: [ph1, ph2, ph3, ph4], category, filters: productFilters, article: '123456', like: false, paramName })
			product.save()

			return res.status(200).json(product)
		} catch (e) {
			return res.status(400).json(e.message)
		}
	}
)
router.post('/get',
	async (req, res) => {
		try {
			const { name, page } = req.body
			const numberOfProducts = 40
			const defaultCategory = 'eveningDresses'

			const category = await Category.findOne({ paramName: name ? name : defaultCategory })
			const productsLength = await (await Product.find({ category })).length
			const products = await Product.find({ category }).skip(numberOfProducts * page).limit(numberOfProducts)

			return res.status(200).json({ products, page, pages: Math.ceil(productsLength / numberOfProducts) })
		} catch (e) {
			return res.status(400).json(e.message)
		}
	}
)

router.post('/search',
	async (req, res) => {
		try {
			const { request } = req.body
			const products = await Product.find({ name: request })

			return res.status(200).json(products)
		} catch (e) {
			return res.status(400).json(e.message)
		}
	}
)


module.exports = router
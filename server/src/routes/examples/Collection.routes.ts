import { Category, ICategoryMenu } from "../../models/Category"
import { Collection } from "../../models/Collection"
import { FilterMenu, IFilterMenu } from "../../models/Filter"
import { IMeaning, Meaning } from "../../models/Meaning"
import { IProduct, Product } from "../../models/Produt"

const Router = require('express')

const router = new Router()

router.post('/get',
	async (req, res) => {
		try {
			const { page } = req.body

			const categories: ICategoryMenu[] = await Category.find({})
			const category = categories[page]
			const products: IProduct[] = await Product.find({ category })
			const filters: IFilterMenu[] = await FilterMenu.find({ _id: { $in: category.filters } })

			const collections: Collection[] = []

			filters?.forEach((filter, filterIndex) => {
				filter.meanings?.forEach(meaning => {
					filter.available = true
					category.available = true


					const product = products?.map(product => {
						if (product.filters[filterIndex].meaning?.toString() === meaning.toString()) {
							return product
						}
					}).filter(product => product !== undefined)
					if (product.length !== 0)
						collections.push({ category, filter, meaning: meaning, numberOfProducts: product.length, image: product[0].images[0], _id: (Math.floor(Math.random() * 10 ** 12)).toString() })
				})
			})

			return res.status(200).json({ collections, page, pages: categories.length })

		} catch (error) {
			return res.status(400).json(error.message)
		}
	}
)

// router.post('/upload',
// 	async (req, res) => {
// 		try {
// 			const { params, page } = req.body

// 			const defaultCategory = 'eveningDresses'

// 			const categories: ICategoryMenu[] = await Category.find({})
// 			const category = categories[page]
// 			const products: IProduct[] = await Product.find({ category })
// 			const filters: IFilterMenu[] = await FilterMenu.find({ _id: { $in: category.filters } })

// 			const collections: Collection[] = []

// 			filters.forEach((filter, filterIndex) => {
// 				filter.meanings?.forEach(meaning => {
// 					filter.available = true
// 					category.available = true


// 					const product = products.map(product => {
// 						if (product.filters[filterIndex].meaning?.toString() === meaning.toString()) {
// 							return product
// 						}
// 					}).filter(product => product !== undefined)
// 					if (product.length !== 0)
// 						collections.push({ category, filter, meaning: meaning, numberOfProducts: product.length, image: product[0].images[0], _id: (Math.floor(Math.random() * 10 ** 12)).toString() })
// 				})
// 			})

// 			return res.status(200).json({ collections, pages: categories.length })

// 		} catch (error) {
// 			return res.status(400).json(error.message)
// 		}
// 	}
// )

module.exports = router
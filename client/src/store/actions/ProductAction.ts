import axios from "axios"
import { Dispatch } from "redux"
import { Product, ProductAction, ProductActionTypes } from "../../models/Product"
import { makeUrlArrayOfString } from "../../models/Url"
import { Paths } from "../../paths"


export const fetchProductAction = (page: number) => {
	return async (dispatch: Dispatch<ProductAction>) => {
		try {
			const params = makeUrlArrayOfString(window.location.search.substring(1))
			dispatch({
				type: ProductActionTypes.FETCH__PRODUCTS
			})
			const response = await axios.post(`${Paths.APIUrl}api/product/get`, {
				name: params[0]?.[1]?.[0]?.[0],
				page
			})
			dispatch({
				type: ProductActionTypes.UPDATE__PAGES__SUCCESS,
				payload: response.data.pages
			})
			dispatch({
				type: ProductActionTypes.UPDATE__PAGE__SUCCESS,
				payload: response.data.page
			})
			return dispatch({
				type: ProductActionTypes.FETCH__PRODUCTS__SUCCESS,
				payload: response.data.products
			})
		} catch (e) {
			return dispatch({
				type: ProductActionTypes.FETCH__PRODUCTS__ERROR,
				payload: 'Произошла ошибка при загрузке товаров'
			})

		}
	}
}
export const setProductAction = (product: Product) => {
	return async (dispatch: Dispatch<ProductAction>) => {
		try {
			dispatch({
				type: ProductActionTypes.SET__PRODUCT,
				payload: [product]
			})
		} catch (e) {
			return dispatch({
				type: ProductActionTypes.FETCH__PRODUCTS__ERROR,
				payload: 'Произошла ошибка при загрузке товаров'
			})
		}
	}
}
export const searchProductAction = (request: string) => {
	return async (dispatch: Dispatch<ProductAction>) => {
		try {
			dispatch({
				type: ProductActionTypes.FETCH__PRODUCTS
			})
			const response = await axios.post(`${Paths.APIUrl}api/product/search`, {
				request
			})
			dispatch({
				type: ProductActionTypes.CLEAR__PRODUCTS__SUCCESS
			})
			return dispatch({
				type: ProductActionTypes.SEARCH__PRODUCTS__SUCCESS,
				payload: response.data
			})
		} catch (e) {
			return dispatch({
				type: ProductActionTypes.FETCH__PRODUCTS__ERROR,
				payload: 'Произошла ошибка при поиске товаров'
			})
		}
	}
}
export const updateAvailabledProductsAction = (products: Product[]) => {
	return async (dispatch: Dispatch<ProductAction>) => {
		try {
			const tempProducts: Product[] = []
			products.map((product) => {
				if (product.like) {
					tempProducts.push(product)
				}
			})
			dispatch({
				type: ProductActionTypes.UPDATE__AVAILABLE__PRODUCT,
				payload: tempProducts
			})
		} catch (e) {
			return dispatch({
				type: ProductActionTypes.FETCH__PRODUCTS__ERROR,
				payload: 'Произошла ошибка при загрузке товаров'
			})
		}
	}
}
export const clearProductsAction = () => {
	return async (dispatch: Dispatch<ProductAction>) => {
		try {
			dispatch({
				type: ProductActionTypes.CLEAR__PRODUCTS__SUCCESS,
			})
		} catch (e) {
			return dispatch({
				type: ProductActionTypes.FETCH__PRODUCTS__ERROR,
				payload: 'Произошла ошибка при отчистке товаров'
			})
		}
	}
}
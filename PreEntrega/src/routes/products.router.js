import { Router } from "express"

import ProductManager from '../productManager.js'
let prods = new ProductManager()

const products = Router()

products.get('/', async (req, res) => {
    let getProducts = await prods.getProducts()
    let limit = req.query.limit
    if (!limit) return res.send(getProducts)
    return res.send(getProducts.slice(0, limit))
})

products.get('/:pid', async (req, res) => {
    let getProducts = await prods.getProductById(Number(req.params.pid))
    res.send(getProducts)
})

products.post('/', async (req, res) => {
    await prods.addProduct(req.body)
    return res.send(`Producto agregado!`)
})

products.put('/', async (req, res) => {
    await prods.updateProduct(req.body) 
    return res.send('Producto modificado')
})

products.delete('/:pid', async (req, res) => {
    await prods.deleteProduct(Number(req.params.pid))
    return res.send(`Producto eliminado!`)
})

export default products   
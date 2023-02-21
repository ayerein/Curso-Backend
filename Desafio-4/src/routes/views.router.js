import express from "express";
import ProductManager from '../productManager.js'
let products = new ProductManager()
const router = express.Router()

router.get('/', async (req, res) => {
    let getProducts = await products.getProducts()
    res.render('index', {getProducts})
})

router.get('/realtimeproducts', async (req, res) => {
    /* let getProducts = await products.getProducts() */
    res.render('realTimeProducts'/* , {getProducts} */)
})

/* router.post('/realtimeproducts', async (req, res) => {
    let newProduct = req.body
    if (newProduct) {
        await products.addProduct(newProduct)
        res.redirect("/realtimeproducts")
    }
}) */

export default router
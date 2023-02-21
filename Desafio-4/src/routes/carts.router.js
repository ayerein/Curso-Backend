import { Router } from "express";

import cartManager from "../cartsManager.js";
let cart = new cartManager()

const carts = Router()

carts.post('/', async (req, res) => {
    await cart.addCart()
    return res.send(`Nuevo carrito creado!`)
})

carts.get('/:cid', async (req, res) => {
    let productsCart = await cart.getProducts(Number(req.params.cid))
    return res.send(productsCart)
})

carts.post('/:cid/products/:pid', async (req, res) => {
    await cart.addProduct(req.params.cid, req.params.pid)
    return res.send(`Nuevo producto agregado!`)
})

export default carts
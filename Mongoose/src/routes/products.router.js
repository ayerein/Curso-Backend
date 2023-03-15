import { Router } from "express"
import { userModel } from "../models/user.model.js"

const products = Router()

products.get('/', async (req, res) => {
    try {
        let users = await userModel.find()
        let limit = req.query.limit
        if (!limit) return res.send({result:"success", payload: users})
    } catch (error) {
        console.error(error)
        res.status(500).send({error:"No se pudo obtener.", message: error})
    }
    
    return res.send(getProducts.slice(0, limit))
})

products.post("/", async (req, res) => {
    try {
        let {first_name, last_name, email} = req.body;
        if (!first_name || !last_name || !email) return res.status(400).send({status: "error", message: "Datos requeridos no enviados."});
        let user = await userModel.create({first_name, last_name, email});
        res.send({result: "success", payload: user});
    } catch (error) {
        console.error("No se pudo obtener usuarios con moongose: " + error);
        res.status(500).send({error: "No se pudo obtener usuarios con moongose", message: error});
    }
});

products.post("/", async (req, res) => {
    try {
        let userUpdated = req.body;
        let user = await userModel.updateOne({_id: req.params.id}, userUpdated);
        res.status(202).send(user)
    } catch (error) {
        console.error("No se pudo obtener usuarios con moongose: " + error);
        res.status(500).send({error: "No se pudo obtener usuarios con moongose", message: error});
    }
});

// products.get('/:pid', async (req, res) => {
//    let getProducts = await prods.getProductById(Number(req.params.pid))
//    res.send(getProducts)
// })

// products.post('/', async (req, res) => {
//    await prods.addProduct(req.body)
//    return res.send(`Producto agregado!`)
// })

// products.put('/', async (req, res) => {
//     await prods.updateProduct(req.body) 
//     return res.send('Producto modificado')
// })

products.delete('/:pid', async (req, res) => {
    await prods.deleteProduct(Number(req.params.pid))
    return res.send(`Producto eliminado!`)
})

export default products   
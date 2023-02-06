const fs = require('fs')

class Product{
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }
}

class ProductManager{
    #products
    #path
    constructor(){
        this.#products = new Array()
        this.#path = './file.json'
    }
    getProducts = async() => {
        try {
            if(!fs.existsSync(this.#path)){
                await fs.promises.writeFile(this.#path, '[]')
            }
            let productsFile = await fs.promises.readFile(this.#path, 'utf-8')
            this.#products = JSON.parse(productsFile)
            return (this.#products)
        } catch (error) {
            console.log(error)
        }
    }
    addProduct = async (title, description, price, thumbnail, stock) => {
        try {
            let code = null
            if(!fs.existsSync(this.#path)){
                await fs.promises.writeFile(this.#path, '[]')
                code = 1
            } else {
                this.#products.length > 0 ? code = this.#products[this.#products.length - 1].code +1 : code = 1
            }
            let productsFile = await fs.promises.readFile(this.#path, 'utf-8')
            let newProduct = new Product(title, description, price, thumbnail, code, stock)
            console.log('Nuevo producto agregado: ', newProduct)
            this.#products = JSON.parse(productsFile)
            this.#products.push(newProduct)
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#products, null, 2))
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
    }
    getProductById = async (id) => {
        let products = await this.getProducts()
        try {
            let product = products.filter(obj => obj.code === id)
            if (product.length > 0) return product
            return `No se encuentra el producto con id: ${id}`
        } catch (error) {
            console.log(error)
        }
    }
    deleteProduct = async (id) => {
        let products = await this.getProducts()
        try {
            if (id > products.length || id < 1) {
                console.log('Id not found')
            } else {
                let newArray = products.filter(obj => obj.code != id)
                await fs.promises.writeFile(this.#path, JSON.stringify(newArray, null, 2))
                console.log(`Se elimino el objeto con id: ${id}`)
            }
        } catch (error) {
            console.log(error)
        }
    }
    updateProduct = async (title, description, price, thumbnail, code, stock) => {
        let product = await this.getProducts()
        let newArray = product.filter(obj => obj.code != code)
        let newProduct = {title, description, price, thumbnail, code, stock}
        try{
            newArray.push(newProduct)
            await fs.promises.writeFile(this.#path, JSON.stringify(newArray, null, 2))
            console.log(`Se actualizo el siguiente producto: ${JSON.stringify(newProduct, null, 2)}`)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ProductManager
/* 

    let productManager = new ProductManager()
    let prueba = async () => {
        console.log(await productManager.getProducts())
        await productManager.addProduct('Producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 25)
        await productManager.addProduct('Producto prueba 2', 'Este es un producto prueba 2', 200, 'Sin imagen', 25)
        console.log(await productManager.getProducts())
        await productManager.getProductById(1)
        await productManager.getProductById(5)
        await productManager.updateProduct('Producto actualizado', 'Este es un producto prueba', 200, 'Sin imagen', 2, 25)
        await productManager.deleteProduct(1)
        await productManager.deleteProduct(5)
    }
    prueba()
     */
import fs from 'fs'

class Product{
    constructor(id, prod){
        this.id = id
        this.title = prod.title
        this.description = prod.description
        this.price = prod.price
        this.status = prod.status
        this.stock = prod.stock
        this.category = prod.category
        this.thumbnail = prod.thumbnail
        this.code = prod.code
    }
}

class ProductManager{
    #products
    #path
    constructor(){
        this.#products = new Array()
        this.#path = './src/productos.json'
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
    addProduct = async (prods) => {
        try {
            let id = null
            if(!fs.existsSync(this.#path)){
                await fs.promises.writeFile(this.#path, '[]')
                id = 1
            } else {
                let products = await this.getProducts()
                products.length > 0 ? id = products[products.length - 1].id +1 : id = 1
            }
            let productsFile = await fs.promises.readFile(this.#path, 'utf-8')
            this.#products = JSON.parse(productsFile)
            let newProduct = new Product(id, prods)
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
            let product = products.filter(obj => obj.id === id)
            if (product.length > 0) return product
            return `No se encuentra el producto con id: ${id}`
        } catch (error) {
            console.log(error)
        }
    }
    deleteProduct = async (id) => {
        let products = await this.getProducts()
        try {
            if (id < 1) {
                console.log('Id not found')
            } else {
                let newArray = products.filter(obj => obj.id != id)
                await fs.promises.writeFile(this.#path, JSON.stringify(newArray, null, 2))
                console.log(`Se elimino el objeto con id: ${id}`)
            }
        } catch (error) {
            console.log(error)
        }
    }
    updateProduct = async (prod) => {
        let products = await this.getProducts()
        let newArray = products.filter(obj => obj.id != prod.id)
        try{
            newArray.push(prod)
            await fs.promises.writeFile(this.#path, JSON.stringify(newArray, null, 2))
            console.log(`Se actualizo el siguiente producto: ${JSON.stringify(prod, null, 2)}`)
        } catch (error) {
            console.log(error)
        }
    }
}

export default ProductManager
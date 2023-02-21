import fs from 'fs'

class cart{
    constructor(id, products){
        this.id = id
        this.products = products
    }
}

class cartManager{
    #carts
    #path
    constructor(){
        this.#carts = new Array()
        this.#path = './src/carrito.json'
    }
    getCarts = async() => {
        try {
            if(!fs.existsSync(this.#path)){
                await fs.promises.writeFile(this.#path, '[]')
            }
            let cartsFile = await fs.promises.readFile(this.#path, 'utf-8')
            this.#carts = JSON.parse(cartsFile)
            return (this.#carts)
        } catch (error) {
            console.log(error)
        }
    }
    addCart = async () => {
        try {
            let id = null
            if(!fs.existsSync(this.#path)){
                await fs.promises.writeFile(this.#path, '[]')
                id = 1
            } else {
                let carts = await this.getCarts()
                carts.length > 0 ? id = carts[carts.length - 1].id +1 : id = 1
            }
            let products = []
            let newCart = new cart(id, products)
            this.#carts.push(newCart)
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#carts, null, 2))
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
    }
    getProducts = async (id) => {
        try {
            let carts = await this.getCarts()
            let cart = carts.find(obj => obj.id === id)
            if (cart) {
                if (cart.products.length > 0) return cart.products
                return `El carrito no tiene productos agregados`
            }
            return 'El carrito no existe'
        } catch (error) {
            console.log(error)
        }
    }
    addProduct = async (cid, pid) => {
        try {
            let carts = await this.getCarts()
            let selectCart = carts.find(obj => obj.id === Number(cid))
            let cartObject = selectCart.products.find(obj => obj.product === pid)
            let newCart = selectCart.products.filter(obj => obj.product != pid)
            let newCarts = carts.filter(obj => obj.id != Number(cid))
            if (cartObject){
                let quantity = cartObject.quantity +1
                newCart.push({"product":pid, "quantity":quantity})
            } else {
                newCart.push({"product":pid, "quantity":1})
            }
            let finishCart = new cart(Number(cid), newCart)
            newCarts.push(finishCart)
            await fs.promises.writeFile(this.#path, JSON.stringify(newCarts, null, 2))
        } catch (error) {
            console.log(error)
        }
    }
}

export default cartManager
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
    constructor(){
        this.products = new Array()
    }
    getProducts = () => {
        return console.log(this.products)
    }
    addProduct = (title, description, price, thumbnail, stock) => {
        let code = this.products.length +1
        let newProduct = new Product(title, description, price, thumbnail, code, stock)
        this.products.push(newProduct)
    }
    getProductById = (id) => {
        let product = this.products.filter(obj => obj.code === id)
        product.length > 0 ? console.log(product) : console.log('not Found')
    }
}

let productManager = new ProductManager()
productManager.getProducts()
productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 25)
productManager.getProducts()
productManager.getProductById(1)
productManager.getProductById(0)
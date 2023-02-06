let express = require ('express')
const app = express();
let ProductManager = require('./productManager')

let products = new ProductManager()

const PORT = 8080

app.use(express.urlencoded({extended:true}))

app.get('/products', async (request, response)=>{
    let getProducts = await products.getProducts()
    let limit = request.query.limit
    if (!limit) return response.send(getProducts)
    return response.send(getProducts.slice(0, limit))
})

app.get('/products/:pid', async (request, response)=>{
    let getProducts = await products.getProductById(Number(request.params.pid))
    response.send(getProducts)
})

app.listen(PORT, ()=> console.log(`Server on http://localhost:${PORT}`))
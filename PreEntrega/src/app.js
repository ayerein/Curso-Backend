import express from 'express'
import productsRouter from'./routes/products.router.js'
import cartsRouter from './routes/carts.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.send(   `
                <div>
                    <h1>Pagina Principal</h1>
                    <a href="http://localhost:8080/api/products">Productos</a>
                    <a href="http://localhost:8080/api/carts">Carrito</a>
                </div>
                `
    )
})

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)


const PORT = 8080
app.listen(PORT, ()=> console.log(`Server on http://localhost:${PORT}`))
import express from 'express'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import productsRouter from'./routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewRouter from './routes/views.router.js'

import ProductManager from './productManager.js'
let products = new ProductManager()

const PORT = 8080
const app = express()
const httpServer = app.listen(PORT, ()=> console.log(`Server on http://localhost:${PORT}`))

const socketServer = new Server(httpServer)


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname+'/public'))


app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/', viewRouter)

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)


socketServer.on('connection', async socket => {
    console.log('Nuevo cliente conectado')

    let sendProducts = await products.getProducts()
    socket.emit('sendProducts', (sendProducts))

    socket.on('newProduct', async data => {
        await products.addProduct(data)
        socketServer.emit('sendProducts', (await products.getProducts()))
    })    

    socket.on("deleteProduct", async id => {
        await products.deleteProduct(id)
        socketServer.emit("sendProducts", (await products.getProducts()))
    })
})


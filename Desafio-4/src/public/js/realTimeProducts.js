const socket = io()

let formProduct = document.getElementById("form-products")
let title = document.getElementById("title")
let description = document.getElementById("description")
let price = document.getElementById("price")
let thumbnail = document.getElementById("thumbnail")
let code = document.getElementById("code")
let stock = document.getElementById("stock")
let tabla = document.getElementById("tabla")

socket.on('sendProducts', (data) => {
    arrayProducts = data
    tabla.innerHTML = ''
    data.forEach(el => {
        tabla.innerHTML +=  `<tr>
                                <th>${el.id}</th>
                                <th>${el.title}</th>
                                <th>${el.price}</th>
                                <th>${el.code}</th>
                                <th>${el.stock}</th>
                                <th><button class="btn btn-light" onclick="deleteProduct(${el.id})">Eliminar</button></th>
                            </tr>`
    });
})

formProduct.addEventListener("submit", e => {
    e.preventDefault()
    let prod = {
        title: title.value,
        description: description.value,
        price: price.value,
        thumbnail: thumbnail.value,
        stock: stock.value,
        code: code.value
    }

    socket.emit("newProduct", prod)
    formProduct.reset()
})

function deleteProduct(id){
    socket.emit("deleteProduct", id)
}

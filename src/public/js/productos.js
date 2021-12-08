async function cargarProductos(productos) {
    const plantilla = await obtenerPlantillaProductos()
    const render = Handlebars.compile(plantilla);
    const html = render({ productos })
    document.getElementById('productos').innerHTML = html
}

function obtenerPlantillaProductos() {
    return fetch('/plantillas/listaProductos.hbs')
        .then(respuesta => respuesta.text())
}


socket.on('actualizarProductos', productos => {
    cargarProductos(productos)
});


function agregarProducto(form) {
    const producto = {
        title: form["title"].value,
        price: form["price"].value,
        thumbnail: form["thumbnail"].value,
    }
    socket.emit('nuevoProducto', producto);
    form.reset();
    return false;
}
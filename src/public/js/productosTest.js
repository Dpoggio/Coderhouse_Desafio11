
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

fetch('/api/productos-test')
    .then(response => response.json())
    .then(productos => cargarProductos(productos))
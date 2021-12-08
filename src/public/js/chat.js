Handlebars.registerHelper('formatDate', function(date) {
    return new Handlebars.SafeString(
        new Date(date).toLocaleString()
    );
});

// Normalizr
const authorSchema = new normalizr.schema.Entity('author', {}, { idAttribute: 'mail' });
const mensajesSchema = new normalizr.schema.Entity('mensajes', {
    mensajes: [ { author: authorSchema }]
});


async function cargarMensajes(mensajesNorm) {
    // Desnormalizacion
    const mensajesDenorm = normalizr.denormalize(mensajesNorm.result, mensajesSchema, mensajesNorm.entities);
    console.log(mensajesNorm)
    console.log(mensajesDenorm)
    const porcentaje = Math.trunc((JSON.stringify(mensajesNorm).length / JSON.stringify(mensajesDenorm).length)*100)
    
    // Carga
    const plantilla = await obtenerPlantillaMensajes()
    const render = Handlebars.compile(plantilla);
    const html = render({ mensajes: mensajesDenorm, porcentaje })
    document.getElementById('mensajes').innerHTML = html
    const scrollHeight = document.getElementById("mensajes").scrollHeight
    document.getElementById("mensajes").scrollTop = scrollHeight
}

function obtenerPlantillaMensajes() {
    return fetch('/plantillas/listaMensajes.hbs')
        .then(respuesta => respuesta.text())
}


socket.on('actualizarMensajes', mensajesNorm => {
    cargarMensajes(mensajesNorm)
});


function agregarMensaje(form) {
    const mensaje = {
        author: {
            mail: form["mail"].value,
            nombre: form["nombre"].value,
            apellido: form["apellido"].value,
            edad: form["edad"].value,
            alias: form["alias"].value,
            avatar: form["avatar"].value
        },
        text: form["mensaje"].value,
        fecha: new Date()
    }
    socket.emit('nuevoMensaje', mensaje);
    form["mensaje"].value=""
    return false;
}
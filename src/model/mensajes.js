const Contenedor = require('../lib/contenedorMongo.js')
const mongoose = require('../lib/mongoConnected.js')


const mensajeSchema = new mongoose.Schema({
    id: {type: Number },
    author: {
        mail: {type: String},
        nombre: {type: String},
        apellido: {type: String},
        edad: {type: String},
        alias: {type: String},
        avatar: {type: String}
    },
    text: {type: String },
    fecha: {type: Date }
})

class MensajeDaoMongo extends Contenedor{
    constructor(){
        const mensajes = mongoose.model('mensajes', mensajeSchema)
        super(mensajes)
    }
}

module.exports = MensajeDaoMongo
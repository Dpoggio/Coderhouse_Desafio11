const Contenedor = require('../lib/contenedorMongo.js')
const mongoose = require('../lib/mongoConnected.js')

const productoSchema = new mongoose.Schema({
    id: {type: Number},
    title: {type: String},
    thumbnail: {type: String}
})

class ProductoDaoMongo extends Contenedor{
    constructor(){
        const productos = mongoose.model('productos', productoSchema)
        super(productos)
    }
}

module.exports = ProductoDaoMongo
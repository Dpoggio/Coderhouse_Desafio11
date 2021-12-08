const Contenedor = require('../lib/contenedorDB.js')
const conn = require('../lib/connections.js')

class Productos extends Contenedor{
    constructor(){
        super(conn.mariaDb,'productos')
    }
}

module.exports = Productos
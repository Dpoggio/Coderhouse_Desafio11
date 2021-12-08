class Contenedor {
    /**
     * Genera el contenedor a partir de un objeto de conexion a una DB y un nombre de tabla.
     * @param {string} options : Objeto de configuracion de knex
     * @param {string} tabla : Nombre de la tabla
     */
    constructor(options, tabla) {
        this.knex = require('knex')(options)
        this.tabla = tabla
    }

    // Private
    /**
     * Procedimiento interno para realizar el manejo de una excepcion.
     * @param {Error} error : Error ocurrido
     */
    #handleError(error){
        throw error
    }

    // Public

    /**
     * Devuelve un array con los registros presentes en la tabla
     */
    async getAll(){
        try {
            return await this.knex(this.tabla)
        } catch(error){
            this.#handleError(error)
        }
    }

    /**
     * Recibe un id y devuelve el registro con ese id, o null si no esta
     * @param {number} id : id del registro a obtener
     */
    async getById(id){
        try {
            return await this.knex(this.tabla).where({id: id}).first()
        } catch(error){
            this.#handleError(error)
        }
    }

    /**
     * Recibe un objeto, lo guarda en la tabla, devuelve el id asignado
     * @param {object} objeto : objeto a guardar     
     */
    async save(objeto){
        
        try {
            const [ newID ] = await this.knex(this.tabla).insert(objeto)
            return await this.getById(newID)
        } catch(error){
            this.#handleError(error)
            return null
        }
    }

    /**
     * Reemplaza el registro en el id asignado por el objeto recibido
     * @param {object} objeto : objeto a guardar
     * @param {number} id : id del registro a reemplazar
     */
     async saveById(objeto, id){
        try {
            await this.knex(this.tabla).where({id: id})
                .update(objeto)
            return await this.getById(id)
        } catch(error){
            this.#handleError(error)
            return null
        }
    }

    /**
     * Elimina de la tabla el registro con el id buscado
     * @param {number} id : id del registro a eliminar
     */
    async deleteById(id){
        try {
            const regs = await this.knex(this.tabla).where({id: id}).del()
            return regs > 0 ? regs : null
        } catch(error){
            this.#handleError(error)
        }
    }

    /**
     * Elimina todos los registros en la tabla
     */
    async deleteAll(){
        try{
            return await this.knex(this.tabla).del()
        } catch(error){
            this.#handleError(error)
        }
    }
}

module.exports = Contenedor

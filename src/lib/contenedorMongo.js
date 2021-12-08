
class Contenedor {
    /**
     * Genera el contenedor a partir de un modelo de mongoose.
     * @param {Mongoose.Model} model : Modelo de coleccion de mongoose
     */
    constructor(model) {
        this.collection = model
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
     * Devuelve un array con los documentos presentes en la coleccion
     */
    async getAll(){
        try {
            const lista = await this.collection.find({}, {_id: 0, __v: 0}).lean()
            return lista
        } catch(error){
            this.#handleError(error)
        }
    }

    /**
     * Recibe un id y devuelve el documento con ese id, o null si no esta
     * @param {number} id : id del documento a obtener
     */
    async getById(id){
        try {
            return await this.collection.findOne({id: id}, {_id: 0, __v: 0})
        } catch(error){
            this.#handleError(error)
        }
    }

    /**
     * Recibe un objeto, lo guarda en la coleccion, devuelve el id asignado
     * @param {object} objeto : objeto a guardar     
     */
    async save(objeto){
        
        try {
            const maxIdDoc = await this.collection.findOne({}, {id: 1}).sort({id: -1}).limit(1)
            objeto.id = (maxIdDoc ? maxIdDoc.id : 0) + 1
            await this.collection.create(objeto)
            return objeto
        } catch(error){
            this.#handleError(error)
            return null
        }
    }

    /**
     * Reemplaza el documento en el id asignado por el objeto recibido
     * @param {object} objeto : objeto a guardar
     * @param {number} id : id del registro a reemplazar
     */
     async saveById(objeto, id){
        try {
            const ret = await this.collection.findOneAndUpdate(
                {id: id}, 
                {$set: objeto}, 
                { 
                    new: true, 
                    projection: { _id: 0, __v: 0 }  
                }
            )
            return ret
        } catch(error){
            this.#handleError(error)
            return null
        }
    }

    /**
     * Elimina de la coleccion el documento con el id buscado
     * @param {number} id : id del documento a eliminar
     */
    async deleteById(id){
        try {
            const ret = await this.collection.findOneAndDelete({id: id}, { projection: { _id: 0, __v: 0 } })
            return ret
        } catch(error){
            this.#handleError(error)
        }
    }

    /**
     * Elimina todos los documentos en la coleccion
     */
    async deleteAll(){
        try{
            return await this.collection.deleteMany()
        } catch(error){
            this.#handleError(error)
        }
    }
}

module.exports = Contenedor

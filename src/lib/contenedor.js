const fs = require('fs')

const CODIFICATION = 'utf-8'
const NUMERO_INICIAL = 1

class Contenedor {
    /**
     * Genera el contenedor a partir de un archivo de texto.
     * @param {string} nombreArchivo : Nombre del archivo
     */
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo
    }

    // Private

    /**
     * Funcion interna que retorna una promesa de guardar el contenedor
     * en el archivo
     * @param {object[]} contenedor : contenedor a almacenar (default = [])
     */
    #saveContenedor(contenedor = []){
        const strContenedor = JSON.stringify(contenedor, null, 2)
        return fs.promises.writeFile(this.nombreArchivo, strContenedor)
    }

    /**
     * Procedimiento interno para realizar el manejo de una excepcion.
     * @param {Error} error : Error ocurrido
     */
    #handleError(error){
        throw error
    }

    // Public

    /**
     * Devuelve un array con los objetos presentes en el archivo
     */
    async getAll(){
        let contenedor = []
        try {
            const data = await fs.promises.readFile(this.nombreArchivo, CODIFICATION)
            contenedor = JSON.parse(data)
        } catch(error) {
            await this.#saveContenedor().catch(this.#handleError)
        }
        return contenedor
    }

    /**
     * Recibe un id y devuelve el objeto con ese id, o null si no esta
     * @param {number} id : id del objeto a obtener
     */
    async getById(id){
        const contenedor = await this.getAll()
        return contenedor.find(x => x.id == id) ?? null
    }

    /**
     * Recibe un objeto, lo guarda en el archivo, devuelve el id asignado
     * @param {object} objeto : objeto a guardar     
     */
    async save(objeto){
        try {
            const contenedor = await this.getAll()
            let nuevoId = NUMERO_INICIAL
            if(contenedor.length > 0){
                nuevoId = contenedor.reduce((a,b) => a.id > b.id ? a:b).id + 1
            }
            objeto.id = nuevoId
            contenedor.push(objeto)
            await this.#saveContenedor(contenedor)
            return objeto
        } catch(error){
            this.#handleError(error)
            return null
        }
    }

    /**
     * Reemplaza el objeto en el id asignado por el objeto recibido
     * @param {object} objeto : objeto a guardar
     * @param {number} id : id del objeto a reemplazar
     */
     async saveById(objeto, id){
        try {
            const contenedor = await this.getAll()
            const indiceObjeto = contenedor.findIndex(x => x.id == id)
            if (indiceObjeto == -1) {
                return null
            }
            objeto.id = id
            contenedor[indiceObjeto] = objeto
            await this.#saveContenedor(contenedor)
            return objeto
        } catch(error){
            this.#handleError(error)
            return null
        }
    }

    /**
     * Elimina del archivo el objeto con el id buscado
     * @param {number} id : id del producto a eliminar
     */
    async deleteById(id){
        try {
            const contenedor = await this.getAll()
            const indiceObjeto = contenedor.findIndex(x => x.id == id)
            if (indiceObjeto == -1){
                return null
            }
            const productoEliminado = contenedor[indiceObjeto]
            contenedor.splice(indiceObjeto,1)
            await this.#saveContenedor(contenedor)
            return productoEliminado
        } catch(error){
            this.#handleError(error)
        }
    }

    /**
     * Elimina todos los objetos presentes en el archivo
     */
    async deleteAll(){
        try{
            await this.#saveContenedor()
        } catch(error){
            this.#handleError(error)
        }
    }
}

module.exports = Contenedor

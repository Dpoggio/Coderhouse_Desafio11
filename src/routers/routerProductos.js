const { Router } = require('express');
const Productos = require('./../model/productos.js')

const routerProductos = Router();

/**** Constantes ****/


/**** Helpers ****/
const productos = new Productos()

class IdNoNumerico extends Error {
    constructor() {
        super('id no numerico')
        this.name = this.constructor.name
        this.httpStatusCode = 400
        Error.captureStackTrace(this, this.constructor)
    }
}

class ProductoNoEncontrado extends Error {
    constructor() {
        super('producto no encontrado')
        this.name = this.constructor.name
        this.httpStatusCode = 404
        Error.captureStackTrace(this, this.constructor)
    }
}

function getRequestID(req){
    if (isNaN(req.params.id)) {
        throw new IdNoNumerico()
    }
    const id = parseInt(req.params.id)
    return id
}

/**** Rutas ****/
routerProductos.get('/', async (req, res, next) => {  
    try {
        const listaProductos = await productos.getAll()
        res.json(listaProductos)    
    } catch (error) {
        next(error)
    }
})

routerProductos.get('/:id', async (req, res, next) => {  
    try {
        const id = getRequestID(req)
        const producto = await productos.getById(id)
        if (producto == null){
            throw new ProductoNoEncontrado()
        }
        res.json(producto)    
    } catch (error) {
        return next(error)
    }
})

routerProductos.post('/', async (req, res, next) => {  
    try {
        const producto = await productos.save(req.body)
        res.status(201).json(producto)
    } catch (error) {
        next(error)
    }
})

routerProductos.put('/:id', async (req, res, next) => {  
    try {
        const id = getRequestID(req)
        const producto = await productos.saveById(req.body, id)
        if (producto == null){
            throw new ProductoNoEncontrado()
        }
        res.json(producto)
    } catch (error) {
        next(error)
    }
})


routerProductos.delete('/', async (req, res, next) => {  
    try {
        await productos.deleteAll()
        res.json({})
    } catch (error) {
        next(error)
    }
})

routerProductos.delete('/:id', async (req, res, next) => {  
    try {
        const id = getRequestID(req)
        const producto = await productos.deleteById(id)
        if (producto == null) {
            throw new ProductoNoEncontrado()
        }
        res.json({})
    } catch (error) {
        next(error)
    }
})


exports.routerProductos = routerProductos;
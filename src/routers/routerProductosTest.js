const { Router } = require('express');
const routerProductosTest = Router();

const Productos = require('./../model/productosMock.js')

const productos = new Productos()

/**** Rutas ****/
routerProductosTest.get('/', async (req, res, next) => {  
    try {
        const listaProductos = await productos.getAll()
        res.json(listaProductos)    
    } catch (error) {
        next(error)
    }
})


exports.routerProductosTest = routerProductosTest;
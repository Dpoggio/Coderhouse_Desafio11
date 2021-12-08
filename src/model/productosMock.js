const faker = require('faker')
faker.locale = "es"

const CANTIDAD_PRODUCTOS = 5
const IMAGE_WIDTH = 200
const IMAGE_HEIGHT = 200

class Productos {
    constructor(){}

    getAll(){
        const productos = []
        for (let i=1; i<=CANTIDAD_PRODUCTOS; i++){
            productos.push({
                id: i,
                title: faker.commerce.product(),
                price: faker.commerce.price(),
                thumbnail: faker.image.image(IMAGE_WIDTH,IMAGE_HEIGHT)
            })            
        }
        return productos
    }
}

module.exports = Productos
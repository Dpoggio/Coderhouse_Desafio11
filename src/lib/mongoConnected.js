const mongoose = require('mongoose')
const conn = require('./connections.js')

if (mongoose.connection.readyState == 0) {
    mongoose.connect(conn.mongoDbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    const mongoDb = mongoose.connection;
    
    mongoDb.on('error', error => console.error(`Error al conectarse a la base de datos: ${error}`))
    mongoDb.once('open', () => {
        console.log('Conectado a la base de datos');
    });
}

module.exports = mongoose
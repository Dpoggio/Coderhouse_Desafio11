const conn = require('./lib/connections.js')

async function main(){
    const mariaDB = require('knex')(conn.mariaDb)
    const sqlite = require('knex')(conn.sqlite)
    
    // Drop tabla Productos
    await mariaDB.schema.dropTableIfExists('productos')
        .catch(err => {
            console.log('Error al dropear tabla de Productos')
            console.log(err)
        })
        
    // Drop tabla Mensajes
    await sqlite.schema.dropTableIfExists('mensajes')
        .catch(err => {
            console.log('Error al dropear tabla de Mensajes')
            console.log(err)
        })

    mariaDB.destroy()
    sqlite.destroy()
}

main()
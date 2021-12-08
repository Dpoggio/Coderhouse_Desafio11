
exports.mariaDb = {
    client: 'mysql',
    connection: { 
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'test'
    }
}

exports.sqlite = {
    client: 'sqlite3',
    connection: { filename: './DB/ecommerce.db'}
}

exports.mongoDbURL = "mongodb://localhost:27017/ecommerce"
exports.mongoSessionUrl = "mongodb://localhost:27017/sessions"
const { Pool } = require('pg')
const dbConfig = {
    host: 'babar.db.elephantsql.com',
    user: 'rcazxjcx',
    password: 'Yeo39DBU2Jb9VqhQiHbfxNLbuXuZHeN9',
    database: 'rcazxjcx',
    port: 5432
}

module.exports = {
    removeUser(email) {
        return new Promise(function (resolve) {
            const pool = new Pool(dbConfig)

            pool.query('DELETE FROM users WHERE email = $1', [email], function (error, result) {
                if (error) {
                    throw error
                }
                resolve({ success: result })
            })
        })
    }
}
const sql = require('mssql')

const config = {
    user: '***',
    password: '****',
    server: 'localhost',
    database: '***',
    options: {
        enableArithAbort: true
    }
}

const SqlQuery = (_query, cb) => {
    sql.connect(config).then(() => {
        return sql.query(_query)
    }).then(result => {
        cb(result);
    }).catch(err => {
        console.log(err)
    })
}

SqlQuery("SELECT @@VERSION AS 'SQL Server Version'", (data) => {
    if(data.rowsAffected[0]) console.log("MSSQL Connected!");
})

module.exports = SqlQuery
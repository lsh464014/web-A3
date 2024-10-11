const mysql = require("mysql");
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123",
    database: "crowdfunding_db",
    multipleStatements: true
})

module.exports = db;
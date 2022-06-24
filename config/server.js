require('dotenv').config();
const mysql = require("mysql");
const fs = require("fs");

const db = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.USER_DB,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    insecureAuth : true,
    ssl:{
        rejectUnauthorized: false
    }
});

db.connect(err => {
    if (err) {
        console.log(err.message);
        return;
    }
    /* db.query("SELECT * FROM usuario", function (err, result, fields) {
        if (err) throw err;
        //bla bla
    }) */
    ;

});

module.exports = db
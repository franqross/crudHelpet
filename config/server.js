const mysql = require("mysql");
const fs = require("fs");
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.HOST,
    port: "3306",
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    ssl:{
        // cert:'../cert/us-east-1-bundle.pem',
        // ca: fs.readFileSync(__dirname + '../cert/us-east-1-bundle.pem')
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

module.exports = db;
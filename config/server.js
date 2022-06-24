require('dotenv').config();
const mysql = require("mysql");
const fs = require("fs");

const db = mysql.createConnection({
    host: process.env.HOST,
    port: +process.env.DB_PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    ssl:{
        rejectUnauthorized: false
    }
    // ssl: "Amazon RDS"
    // ssl: {
    //     ca: fs.readFileSync(__dirname + '/cert/global-bundle-2.pem')
    // }


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
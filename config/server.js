const mysql = require("mysql");
const fs = require("fs");

const db = mysql.createConnection('mysql2://admin:helpet-Adm127@database-2.cqixht8znhwm.us-east-1.rds.amazonaws.com:3306/helpet?sslca=cert/us-east-1-bundle.pem');
db.connect(err => {
    if (err) {
        console.log(err.message);
        return;
    }
    db.query("SELECT * FROM user", function (err, result, fields) {
        if (err) throw err;
        /*  console.log(result); */
    });
    /* console.log("Database connected.") */
});

module.exports = db;
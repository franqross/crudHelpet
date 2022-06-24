const mysql = require("mysql");
const fs = require("fs");
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const db = mysql.createConnection({
    host: "database-2.cqixht8znhwm.us-east-1.rds.amazonaws.com",
    port: 3000,
    user: "admin",
    password: "helpet-Adm127",
    database: "helpetdb",
    insecureAuth: true,
    ssl: {
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
        //bla blaasdasdsdaasdsasad
    }) */
    ;

});

module.exports = db
require('dotenv').config();
const mysql = require("mysql2");
const fs = require("fs");

var cors = require('cors')
const express = require('express');

const port = (+process.env.PORT || 3000);


const app = express();

//datos a agregar
app.use(cors())
app.use(express.json());
//config

app.set('port',port)

app.use('/api',require('./rutas'))


app.listen(app.get('port'),(error)=>{
    if(error){
        console.log('algo malo paso'+error);
    }
    else{
        console.log('Conectado en: '+port)
    }

})
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

module.exports = db;
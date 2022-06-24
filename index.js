require('dotenv').config();
var cors = require('cors')
require('dotenv').config();
const express = require('express');
const router = require('./rutas')
const port = (+process.env.PORT || 3000);


const app = express();

//datos a agregar
app.use(cors())
app.use(express.json());
//config

app.set('port',port)

app.use('/api', router)


app.listen(app.get('port'),(error)=>{
    if(error){
        console.log('algo malo paso'+error);
    }
    else{
        console.log('Conectado en: '+port)
    }

})
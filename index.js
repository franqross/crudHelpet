require('./config/server');
var cors = require('cors')
const express = require('express');

const port = (process.env.PORT || 3000);


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
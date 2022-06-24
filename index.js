require('dotenv').config({path:__dirname+'/./../../.env'})
var cors = require('cors');
const express = require('express');
const router = require('./rutas');
const port = (+process.env.PORT || 3000);

const app = express();

//datos a agregar
app.use(cors())
app.use(express.json());
//config
app.set('port',port)
app.use('/api', router)

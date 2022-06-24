require('dotenv').config({ override: true })
var cors = require('cors');
const express = require('express');
// require('./rutas');
const port = (3000);

const app = express();

//datos a agregar
app.use(cors())
app.use(express.json());
//config

app.use('/api', require('./rutas'))
app.listen(port, () => {
    console.log(`Servidor conectado en el puerto ${port}`);
})
var cors = require('cors');
const express = require('express');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
// require('./rutas');
const port = (process.env.PORT || 3000);

const app = express();

//datos a agregar
app.use(cors())
app.use(express.json());
//config

app.use('/api', require('./rutas'))
app.listen(port, () => {
    console.log(`Servidor conectado en el puerto ${port}`);
})
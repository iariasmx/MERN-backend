const express = require('express');
const {dbConnection} = require("./database/config");
const cors = require("cors");
require('dotenv').config();

const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Rutas
app.use(express.static('public'));

// Lectura y parseo de datos enviados por los clientes
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//Configuración del servidor de express
app.listen(process.env.PORT, ()=>{
    console.log(`Listening on port ${process.env.PORT}`);
})
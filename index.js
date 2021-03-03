const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes');

//importar la config de la bd
const db = require('./config/db');
    require('./models/Producto');
    require('./models/Cliente');
    require('./models/Usuario');
    require('./models/Proveedor');
    require('./models/Orden');
    require('./models/Categoria');

//se sincronize sequelize con la bd, sincronize los modelos del proyecto
db.sync({alter: true}).
    then(() =>{
        console.log("BD conectada");
    })
    .catch((error)=>{
        console.log(error);
    });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.use('/', routes());

//correr el servidor en el puerto 5000
app.listen(5000);

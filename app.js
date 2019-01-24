'use strict'

//Requerimos todos los paquetes que necesitaremos

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

//Usamos express un manejo mas simplificado de nodejs
var app = express();

// settings

// middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// cargar archivos rutas
var auth_routes = require('./routes/auth');
var user_routes = require('./routes/user');
var persona_routes = require('./routes/persona');
var empresa_routes = require('./routes/empresa');
var categoria_routes = require('./routes/categoria');
var ruta_routes = require('./routes/ruta');
var publication_routes = require('./routes/publication');
var like_routes = require('./routes/like');

// rutas
app.use('/api', auth_routes);
app.use('/api', user_routes);
app.use('/api', persona_routes);
app.use('/api', empresa_routes);
app.use('/api', categoria_routes);
app.use('/api', ruta_routes);
app.use('/api', publication_routes);
app.use('/api', like_routes);


// exportar
module.exports = app;

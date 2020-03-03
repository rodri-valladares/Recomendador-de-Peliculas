//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var controlador = require('./controladores/controlador'); 

var controladorInformacionPeliculas = require('./controladores/controladorInformacionPeliculas');

var controladorrecomendador = require('./controladores/controladorrecomendador');


var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/peliculas',controlador.peliculas);

app.get('/generos',controlador.generos);						 

app.get('/peliculas/recomendacion',controladorrecomendador.buscarPeliculaRecomendada); 

app.get('/peliculas/:id',controladorInformacionPeliculas.buscarInformacionPelicula);	

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});


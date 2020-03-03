var mysql= require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost', 
  port     : '3306',
  user     : 'root',
  password : 'v4114d4re5',
  database : 'pelicula_app'
});

module.exports = connection;



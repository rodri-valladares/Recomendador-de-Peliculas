create database pelicula_app;
use pelicula_app;

create table pelicula (
	id INT NOT NULL auto_increment,
	titulo VARCHAR(100),
	duracion INT(5),
	director VARCHAR(400),
	anio INT(5),
	fecha_lanzamiento DATE,
	puntuacion INT(2),
	poster VARCHAR(300),
	trama VARCHAR(700),
	genero_id INT(3), 
	PRIMARY KEY(id),
	FOREIGN KEY (`genero_id`) REFERENCES `genero` (`id`),
	);

create table genero(
	id INT NOT 	NULL auto_increment,
	nombre VARCHAR(30),
	PRIMARY KEY(id)
);

create table actor(
	id INT NOT NULL auto_increment,
	nombre VARCHAR(70),
	PRIMARY KEY(id)
);

create table actor_pelicula(
	id INT NOT NULL auto_increment,
	actor_id INT(2),
	pelicula_id INT(2),
	PRIMARY KEY(id),
	FOREIGN KEY (`actor_id`) REFERENCES `actor` (`id`),
	FOREIGN KEY (`pelicula_id`) REFERENCES `pelicula` (`id`)

);

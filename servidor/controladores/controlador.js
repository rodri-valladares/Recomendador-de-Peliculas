var con = require('../lib/conexionbd');


function peliculas(req,res){
	var genero_id= req.query.genero;
	var anio= req.query.anio;
	var titulo=req.query.titulo;
	var columna_orden=req.query.columna_orden;
	var tipo_orden=req.query.tipo_orden;
	var pagina=req.query.pagina;
	var cantidad=req.query.cantidad;
	var limite_base=20*(pagina-1); //variable que utilizo para marcar la fila desde la que empiezo a mostrar las peliculas
	
	//Para aplicar los distintos filtros de pelicula aplico validaciones 
	if (!titulo){

		if(!genero_id){
			if(!anio){
				var sql="select * from pelicula"
			}else{
				var sql="select * from pelicula where pelicula.anio="+anio
			}
		}else{
			if(!anio){
				var sql="select pelicula.* from pelicula join genero on genero.id=pelicula.genero_id where genero.id="+genero_id
			}else{
				var sql="select * from pelicula join genero on genero.id=pelicula.genero_id where genero.id="+genero_id+" and pelicula.anio="+anio
			}
		}
		
	}else{

		if(!genero_id){
			if(!anio){
				var sql="select * from pelicula where titulo like '%"+ titulo +"%'"
			}else{
				var sql="select * from pelicula where pelicula.anio="+anio+" and titulo like '%"+ titulo +"%'"
			}
		}else{
			if(!anio){
				var sql="select * from pelicula join genero on genero.id=pelicula.genero_id where genero.id="+genero_id+" and titulo like '%"+ titulo +"%'"
			}else{
				var sql="select * from pelicula join genero on genero.id=pelicula.genero_id where genero.id="+genero_id+" and pelicula.anio="+anio+" and titulo like '%"+ titulo +"%'"
			}
		}			
	}
	
	//si la pagina es la 1 entonces guardo los datos obtenidos desde el elemento cero
	//sino aplico el limite correspondiente
	if(pagina==1){
		//luego de obtener los datos le aplico el orden solicitado	
		var sql_ordenado=sql+" order by "+columna_orden+" "+tipo_orden
		
	}else{
		var sql_ordenado=sql+" order by "+columna_orden+" "+tipo_orden+" limit "+limite_base+",20"
		
	}

	con.query(sql_ordenado,function(error,resultado,fields){
		if(error){
			console.log("Hubo un error en la consulta",error.message);
			return res.status(404).send("Hubo un error en la consulta");
		}else{ 
			var total_resultados= resultado.length; /*obtengo la cantidad de resultados de la base de datos MIO*/
		
			//var total_resultados= resultado.length; 
				
		var response={
			//se crea el objeto respuesta con la pelicula encontrada  
			'peliculas':resultado, 
			'total':total_resultados
		};
		res.send(JSON.stringify(response)); 
		}	
	})
}


function generos(req,res){  
	var sql="select * from genero"
	con.query(sql,function(error,resultado,fields){
		if(error){
			console.log("Hubo un error en la consulta",error.message);
			return res.status(404).send("Hubo un error en la consulta");
		}else{
			var response={
				'generos':resultado
			};
			
			res.send(JSON.stringify(response));
		}
	}
	)
}

module.exports={
	peliculas: peliculas,
	generos:generos,
};




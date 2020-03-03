var con = require('../lib/conexionbd');

function buscarPeliculaRecomendada(req,res){
	var genero=req.query.genero;
	var anio_inicio=req.query.anio_inicio;
	var anio_fin=req.query.anio_fin;
	var puntuacion=req.query.puntuacion;

	
	if (!puntuacion){		

		if(!anio_inicio){
				//solamente se aplica el genero	
			if(!genero){
				var sql="select *,pelicula.id as peliculaId from pelicula join genero on genero.id=pelicula.genero_id"

			}else{	
				var sql="select *,pelicula.id as peliculaId from pelicula join genero on genero.id=pelicula.genero_id where genero.nombre='"+genero+"'"
			}
		}else{

			if(!genero){
				var sql="select *,pelicula.id as peliculaId from pelicula join genero on genero.id=pelicula.genero_id where pelicula.anio between "+anio_inicio+" and "+anio_fin
					
			}else{
				var sql="select *,pelicula.id as peliculaId from pelicula join genero on genero.id=pelicula.genero_id where genero.nombre='"+genero+"' and pelicula.anio between "+anio_inicio+" and "+anio_fin
			}
		}		
	}else{
		if(!genero){
					
				var sql="select *,pelicula.id as peliculaId from pelicula join genero on genero.id=pelicula.genero_id where pelicula.puntuacion= "+puntuacion
			
		}else{

				var sql="select *,pelicula.id as peliculaId from pelicula join genero on genero.id=pelicula.genero_id where genero.nombre='"+genero+"' and pelicula.puntuacion= "+puntuacion
		}		
	}

	con.query(sql,function(error,resultado,fields){
		if(error){
			console.log("Hubo un error en la consulta",error.message);
			return res.status(404).send("Hubo un error en la consulta");
		}else{ 
			
			var response={
				
				'peliculas':resultado, 
								
			};
			res.send(JSON.stringify(response)); 
		}	
	})

}
module.exports={
	buscarPeliculaRecomendada: buscarPeliculaRecomendada,		
};
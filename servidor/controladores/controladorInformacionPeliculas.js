var con = require('../lib/conexionbd');

function buscarInformacionPelicula(req,res){
	var id=req.params.id;

	
	 var sql="select *,genero.nombre as nombregenero,actor.nombre as nombreactor from genero join pelicula on genero.id=pelicula.genero_id join actor_pelicula on pelicula.id=actor_pelicula.pelicula_id join actor on actor.id=actor_pelicula.actor_id where pelicula.id="+id;

	con.query(sql,function(error,resultado,fields){
		if(error){
			console.log("Hubo un error en la consulta",error.message);
			return res.status(404).send("Hubo un error en la consulta");
		}else{ 
			//console.log(resultado[0]);
			var response={
				//se crea el objeto respuesta con la pelicula encontrada  
				'pelicula':resultado[0], 
				'actores':resultado,
				'genero':resultado[0].nombregenero,
								
			};
			res.send(JSON.stringify(response));
		}	
	})

}
module.exports={
	buscarInformacionPelicula: buscarInformacionPelicula,	
};


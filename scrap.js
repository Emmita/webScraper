var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/', function(req, res){

	//url de donde vamos a extraer la información
	url = 'https://cinemex.com/checkout/20866885/?ref=movie_side';


	//La estructura de nuestra petición
	//Donde el primer parámetro es la url
	//La función tiene 3 parámetros, el error, la respuesta y el html
	request(url, function(error, response, html){

		//Se checa si no existe error durante la petición
		if (!error) {
			
			//Con cheerio cargamos el html para que se nos faciliten las funcionalidades de jQuery
			var $ = cheerio.load(html);

			//A continuación describimos las variables que vamos a crear
			var titulo, clasificacion, version, dia, horario, cine, sala;
			var json = {titulo : "", clasificacion : "", version : "", dia : "", horario : "", cine : "", sala : ""};

			//Nuestro punto de inicio será la clase movie-details-info
			$('.movie-details-info').filter(function(){

				//En la variable data vamos a almacenar la información que estamos filtrando
				var data = $(this);

				//Navegamos a través del DOM con la ayuda de jQuery para poder recoger ele texto que exista dentro de la etiqueta
				titulo = data.children().eq(1).text()
				//Cuando se tenga el valor de  nuestra variablela almacenamos en el json object
				json.titulo = titulo;

				clasificacion = data.children().eq(3).text();
				json.clasificacion = clasificacion;

				version = data.children().eq(5).text();
				json.version = version;

				dia = data.children().eq(7).text();
				json.dia = dia;

				horario = data.children().eq(9).text();
				json.horario = horario;

				cine = data.children().eq(11).text();
				json.cine = cine;

				sala = data.children().eq(13).text();
				json.sala = sala;
			})

		}

		//Para crear el archivo json vamos a ocupar la librería fs con la función writeFile
		//esta función tiene  3 parámetros
		//nombre dle archivo que se va a generar, la información que se va a escribir y el estado de nuestra función
		fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

		 	console.log('File successfuly written! - Check your project directory for the output.josn file');

		})

		res.send('Check your console');
		
	})


})

app.listen('8081');

console.log('ola k ase');

exports = module.exports = app;

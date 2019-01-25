'use strict'

var Ruta = require('../models/ruta');

var controller = {
	
	saveRuta: function(req, res)
	{
		Ruta.find
		(
			{
				name: req.body.name
			},
			(err, ruta) =>
			{
				if (err)
				{
					return res.status(500).send({ message: err });
				}
				if(req.body.name==undefined){
					return res.status(404).send({ message: 'No se encuentra el campo name en el formulario' });	
				}
				if (ruta.length>0)
				{
					return res.status(404).send({ message: 'El nombre de la ruta ya está registrada' });
				}else
				{
					var ruta = new Ruta();
					var params = req.body;

					ruta.name = params.name.charAt(0).toUpperCase()+params.name.slice(1),
					ruta.description = params.description;

					ruta.save((err, rutaStored) => {
						if(err) return res.status(500).send({message: 'Error en el Servidor.'});

						if(!rutaStored) return res.status(404).send({message: 'No se ha podido guardar la Ruta.'});

						return res.status(200).send({
							ruta: rutaStored,
							message: "Ruta Creada Correctamente"
						});
					});
				}
			}
		);
	},

	getRuta: function(req, res){
		var rutaId = req.params.id;

		if(rutaId == null) return res.status(404).send({message: 'La Ruta no existe.'});

		Ruta.findById(rutaId, (err, ruta) => {

			if(err) return res.status(500).send({message: 'Error en el Servidor.'});

			if(!ruta) return res.status(404).send({message: 'El id de la Ruta no existe.'});

			return res.status(200).send({
				ruta
			});

		});
	},


	getRutas: function(req, res){
		
		Ruta.find()
		.populate('userID')
		.sort('-_id').exec((err, rutas) => {

			if(err) return res.status(500).send({message: 'Error en el Servidor.'});

			if(!rutas) return res.status(404).send({message: 'No hay Rutas que mostrar.'});

			return res.status(200).send({rutas});

		});


	},

	updateRuta: function(req, res){
		var rutaId = req.params.id;
		var update = req.body;
		update.name = update.name.charAt(0).toUpperCase()+update.name.slice(1);

		Ruta.findByIdAndUpdate(rutaId, update, {new:true}, (err, rutaUpdated) => {
			if(err) return res.status(500).send({message: 'Error en el Servidor'});

			if(!rutaUpdated) return res.status(404).send({message: 'El id de la Ruta no existe.'});

			return res.status(200).send({
				ruta: rutaUpdated,
				message: "Ruta Actualizada Correctamente"
			});
		});

	},

	deleteRuta: function(req, res){
		var rutaId = req.params.id;
		Ruta.findByIdAndRemove(rutaId, (err, rutaRemoved) => {
			if(err) return res.status(500).send({message: 'Error en el Servidor'});

			if(!rutaRemoved) return res.status(404).send({message: 'El id de la Ruta no existe.'});
			

			return res.status(200).send({
				ruta: rutaRemoved,
				message: "Ruta Eliminada Correctamente"
			});
		});
	},

};

module.exports = controller;
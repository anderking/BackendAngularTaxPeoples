'use strict'

var Categoria = require('../models/categoria');

var controller = {
	
	saveCategoria: function(req, res)
	{
		Categoria.find
		(
			{
				name: req.body.name
			},
			(err, categoria) =>
			{
				if (err)
				{
					return res.status(500).send({ message: err });
				}

				if (categoria.length>0)
				{
					return res.status(404).send({ message: 'El nombre de la categoria ya está registrada' });
				}else
				{
					var categoria = new Categoria();
					var params = req.body;

					categoria.name = params.name.charAt(0).toUpperCase()+params.name.slice(1);
					categoria.description = params.description;
					categoria.save((err, categoriaStored) => {
						if(err) return res.status(500).send({message: 'Error en el Servidor.'});

						if(!categoriaStored) return res.status(404).send({message: 'No se ha podido guardar la Categoria.'});

						return res.status(200).send({
							categoria: categoriaStored,
							message: "Categoria Creada Correctamente"
						});
					});
				}
			}
		);
	},

	getCategoria: function(req, res)
	{
		var categoriaId = req.params.id;

		if(categoriaId == null) return res.status(404).send({message: 'La Categoria no existe.'});

		Categoria.findById(categoriaId, (err, categoria) => {

			if(err) return res.status(500).send({message: 'Error en el Servidor.'});

			if(!categoria) return res.status(404).send({message: 'El id de la Categoria no existe.'});

			return res.status(200).send({
				categoria
			});

		});
	},


	getCategorias: function(req, res)
	{
		
		Categoria.find()
		.populate('userID')
		.sort('-_id').exec((err, categorias) => {

			if(err) return res.status(500).send({message: 'Error en el Servidor.'});

			if(!categorias) return res.status(404).send({message: 'No hay Categorias que mostrar.'});

			return res.status(200).send({categorias});

		});

	},

	updateCategoria: function(req, res)
	{
		var categoriaId = req.params.id;
		var update = req.body;
		update.name = update.name.charAt(0).toUpperCase()+update.name.slice(1);

		Categoria.findByIdAndUpdate(categoriaId, update, {new:true}, (err, categoriaUpdated) => {
			if(err) return res.status(500).send({message: 'Error en el Servidor'});

			if(!categoriaUpdated) return res.status(404).send({message: 'El id de la Categoria no existe.'});

			return res.status(200).send({
				categoria: categoriaUpdated,
				message: "Categoria Actualizada Correctamente"
			});
		});

	},

	deleteCategoria: function(req, res)
	{
		var categoriaId = req.params.id;
		Categoria.findByIdAndRemove(categoriaId, (err, categoriaRemoved) => {
			if(err) return res.status(500).send({message: 'Error en el Servidor'});

			if(!categoriaRemoved) return res.status(404).send({message: 'El id de la Categoria no existe.'});
			

			return res.status(200).send({
				categoria: categoriaRemoved,
				message: "Categoria Eliminada Correctamente"
			});
		});
	},

};

module.exports = controller;
'use strict'

var User = require('../models/user');
var fs = require('fs');
var path = require('path');

var controller = {
	
/*	saveUser: function(req, res){
		var user = new User();
		var params = req.body;

		user.name = params.name;
		user.job = params.job;
		user.web = params.web;
		user.description = params.description;

		user.save((err, userStored) => {
			if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

			if(!userStored) return res.status(404).send({message: 'No se ha podido guardar el Usuario.'});

			return res.status(200).send({
				user: userStored,
				message: "Usuario Creado"
			});
		});
	},*/

	getUser: function(req, res){
		var userId = req.params.id;

		if(userId == null) return res.status(404).send({message: 'El Usuario no existe.'});

		User.findById(userId, (err, user) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!user) return res.status(404).send({message: 'El id del Usuario no existe.'});

			return res.status(200).send({
				user
			});

		});
	},

	getUsers: function(req, res){

		User.find({}).sort('-_id').exec((err, users) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!users) return res.status(404).send({message: 'No hay Usuarios que mostrar.'});

			return res.status(200).send({users});
		});

	},

	updateUser: function(req, res){
		var userId = req.params.id;
		var update = req.body;

		User.findByIdAndUpdate(userId, update, {new:true}, (err, userUpdated) => {
			if(err) return res.status(500).send({message: 'Error al actualizar'});

			if(!userUpdated) return res.status(404).send({message: 'No existe el Usuario para actualizar'});

			return res.status(200).send({
				user: userUpdated,
				message: "Usuario Actualizado"
			});
		});

	},

	deleteUser: function(req, res){
		var userId = req.params.id;

		User.findByIdAndRemove(userId, (err, userRemoved) => {
			if(err) return res.status(500).send({message: 'No se ha podido borrar el Usuario'});

			if(!userRemoved) return res.status(404).send({message: "No se puede eliminar ese Usuario."});

			return res.status(200).send({
				user: userRemoved,
				message: "Usuario Eliminado"
			});
		});
	},

	uploadImage: function(req, res){
		var userId = req.params.id;
		var fileName = 'Imagen no subida...';

		if(req.files){
			var filePath = req.files.image.path;
			var fileSplit = filePath.split('\\');
			var fileName = fileSplit[1];
			var extSplit = fileName.split('\.');
			var fileExt = extSplit[1];

			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){

				User.findByIdAndUpdate(userId, {image: fileName}, {new: true}, (err, userUpdated) =>
				{
					if(err) return res.status(500).send({message: 'La imagen no se ha subido'});

					if(!userUpdated) return res.status(404).send({message: 'El usuario no existe y no se ha asignado la imagen'});

					return res.status(200).send({
						project: userUpdated
					});
				});

			}else{
				fs.unlink(filePath, (err) => {
					return res.status(200).send({message: 'La extensión no es válida'});
				});
			}

		}else{
			return res.status(200).send({
				message: fileName
			});
		}

	},

	getImageFile: function(req, res){
		var file = req.params.image; //Capturo el nombre del archivo con su extension
		var path_file = './img/'+file; // le agrego el prefijo en donde se guardan
		fs.exists(path_file, (exists) => {
			if(exists){
				return res.sendFile(path.resolve(path_file)); //devuelvo la ruta completa de la img desde la raiz
			}else{
				return res.status(200).send({
					message: "No existe la imagen..."
				});
			}
		});
	}


};

module.exports = controller;
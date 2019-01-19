'use strict'

var Like = require('../models/like');
var User = require('../models/user');
var Project = require('../models/project');

var controller =
{
	upLikes: function(req, res)
	{
		Like.find
		(
			{
			    userID : { $in: [req.body.userID] },
			    projectID : { $in: [req.body.projectID] }
			},
			(err, like) =>
			{
				if (err)
				{
					return res.status(500).send({ message: err });
				}
				if(req.body.userID==undefined){
					return res.status(404).send({ message: 'No se encuentra el campo userID en la solicitud' });	
				}
				if(req.body.projectID==undefined){
					return res.status(404).send({ message: 'No se encuentra el campo projectID en la solicitud' });	
				}
				if(like.length>0)
				{
					return res.status(404).send({ message: 'Ya le diste like a este proyecto' });
				}
				else
				{
					var like = new Like();
					var params = req.body;

					like.userID = params.userID;
					like.projectID = params.projectID;

					like.save((err, likeStored) =>
					{
						if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

						if(!likeStored) return res.status(404).send({message: 'No se ha podido guardar el like.'});

						return res.status(200).send({
							like: likeStored,
							message: "Like guardado"
						});
					});
				}
			}
		)
	},

	disLikes: function(req, res)
	{
		var userID = req.body.userID;
		var projectID = req.body.projectID;

		Like.remove
		(
			{
				userID : { $in: [req.body.userID] },
			    projectID : { $in: [req.body.projectID] }

			},(err, like) =>
			{
				if(err) return res.status(500).send({message: 'No se ha podido borrar el like'});

				if(like.n==0) return res.status(404).send({message: "Ya fue eliminado."});

				return res.status(200).send
				({
					message: "Like Eliminado",
					like
				});
			}
		);
	},

	getLikes: function(req, res)
	{
		Like.find
		(
			{
			    projectID : req.params.id
			},
			(err, likes) =>
			{
				if (err) return res.status(500).send({ message: err });

				if(!likes) return res.status(404).send({message: 'No hay likes de este proyecto.'});

				return res.status(200).send({
					likes
				})
				
			}
		)
	},

	isLike: function(req, res)
	{
		Like.find
		(
			{
			    userID : { $in: [req.params.idU] },
			    projectID : { $in: [req.params.idP] }
			},
			(err, like) =>
			{
				if (err) return res.status(500).send({ message: err });
				
				if(like.length<=0) return res.status(202).send(false);

				return res.status(200).send(true);
			}
		)
	},

};

module.exports = controller;
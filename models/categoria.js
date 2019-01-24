'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoriaSchema = Schema({
	name: { type: String, unique: true, lowercase: true},
	description: String,
}, {
    versionKey: false
});

module.exports = mongoose.model('Categoria', CategoriaSchema);
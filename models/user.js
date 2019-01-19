'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  description: String,
  image: String,
  tipo:String,
  signupDate: { type: Date, default: Date.now() },

}, {
    versionKey: false
});

UserSchema.pre('save', (next) => {
  let user = this

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err)

      user.password = hash;
      next();
    })
  })
});

UserSchema.pre('remove', function(next) { 
    Sweepstakes.remove({user_id: this._id}).exec(); 
    Submission.remove({user_id: this._id}).exec(); 
    next(); 
});

module.exports = mongoose.model('User', UserSchema);

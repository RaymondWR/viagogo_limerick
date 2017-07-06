'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ContactSchema = new Schema({
  name: {type: String,required: true},
  address: {type: String},
  phone_number: {type: String, required: true},
  owner: {type: String, required: true},
});

module.exports = mongoose.model('Contact', ContactSchema);
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var PositionSchema = new Schema({

  x:         {type: Number, required:true},
  y:         {type: Number, required:true},
  eventId:   {type: String}

});

module.exports = mongoose.model('Position', PositionSchema);
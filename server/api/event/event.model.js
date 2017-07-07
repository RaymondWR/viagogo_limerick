'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var EventSchema = new Schema({
  identifer: {type: Number,required: true},
  // ticketAmount: {type: Number, required:true},
  // ticketPrice:  {type: Number, required:true}
  ticket: {
  	amount: {type: Number, required:true},
  	price:  {type: Number, required:true}
  }
});

module.exports = mongoose.model('Event', EventSchema);
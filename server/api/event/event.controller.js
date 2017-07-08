'use strict';

var _        = require('lodash');
var Event    = require('../event/event.model');

function handleError(res, err) {
  return res.send(500, err);
}


// Get list of positions
exports.index = function(req, res) {
    Event.find(function (err, event) {
		if(err) { return handleError(res, err); }
    	return res.json(200, event);
  	});
}

// Get list of positions
exports.showOne = function(req, res) {

	var userId = req.params.id;

  Event.findById(userId, function (err, event) {
    if (err) return res.json({'message':'no event in db'});
    if (!event) return res.send(401);
    res.json(event);
  });
}

// Creates a new event
exports.create = function(req, res) {

	var t_price = Math.floor(2*((Math.random() * 10) + 1));
	var t_amount = Math.floor((Math.random() * 100));
	//var eId    = req.body.eventId;

	Event.find().exec(function (err, results) {
		if(err) {var count = 1;}
		else{
  	var count = results.length;
  	console.log(count);
  	}

  	var eventObject = {

			identifer   : count+1,
			ticket:{
				amount: t_amount,
				price:  t_price
			}
		
		};

		Event.create(eventObject, function(err, event) {
  		if(err) { return handleError(res, err); }
  		return res.json(201, event);
		});

	});

}

//delete all events from collection in Mongodb
exports.destroy = function (req, res) {
	Event.remove({}, function(error){
		res.json(200, {'message' : 'success'});
	});
}

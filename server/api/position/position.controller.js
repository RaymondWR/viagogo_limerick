'use strict';

var _        = require('lodash');
var Position = require('./position.model');
var Event    = require('../event/event.model');

function handleError(res, err) {
  return res.send(500, err);
}


// Get list of positions
exports.index = function(req, res) {
    Position.find(function (err, position) {
		if(err) { return handleError(res, err); }
    	return res.json(200, position);
  	});
};

// Creates a new position
exports.create = function(req, res) {

	var xValue = Math.floor(2*((Math.random() * 10) + 1)-10);
	var yValue = Math.floor(2*((Math.random() * 10) + 1)-10);
	var eId    = req.body.eventId;

	if (undefined === eId) {eId = null;}

	var positionObj = {
						x:           xValue,
						y:           yValue,
						eventId :    eId
	};

	Position.create(positionObj, function(err, position) {
  	if(err) { return handleError(res, err); }
  	return res.json(201, position);
	});

}



var getEventID = function(req, res) {

	var eventObject = {

		identifer   : 10,
		ticket:{
			amount: 200,
			price:  30
		}
		
	};

	Event.create(eventObject, function(err, event) {
    	if(err) { 
    		return handleError(res, err);
    	}else{
    		console.log('event object create successfully!');
    		return res.json(201, event);
    	}
  });



}


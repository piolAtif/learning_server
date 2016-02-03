var http = require('http');
var fs = require('fs');
var routes = require('./routes.js');
var EventEmitter = require('events').EventEmitter;

var rEmitter = new EventEmitter();
var get_handlers = routes.get_handlers;
var post_handlers = routes.post_handlers;

var matchHandler = function(url){
	return function(ph){
		return url.match(new RegExp(ph.path));
	};
};

rEmitter.on('next',function(handler, req, res, next){
	if(handler.length == 0) return;
	var ph = handler.shift();
	ph.handler(req, res, next);
})
var handle_all_get = function(req, res){
	console.log(req.url);
	var handlers = get_handlers.filter(matchHandler(req.url));

	var next = function(){
		rEmitter.emit('next',handlers, req, res, next);
	};
	next();
}

var handle_all_post = function(req, res){
	var handlers = post_handlers.filter(matchHandler(req.url));
	var next = function(){
		rEmitter.emit('next', req, res, next);
	}
	next();
}


var requestHandler = function(req, res){
	if(req.method == 'GET')
		handle_all_get(req, res);
	else if(req.method == 'POST')
		handle_all_post(req, res);
	else
		method_not_allowed(req,res);

};

var server = http.createServer(requestHandler);
server.listen(8000);

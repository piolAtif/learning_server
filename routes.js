var fs = require('fs');

var method_not_allowed = function(req, res){
	res.statusCode = 405;
	res.end("Method not allowed");
}

var serverIndex = function(req, res, next){
	req.url = '/index.html';
	next();
}

var postGuestComment = function(req, res){
	var data = '';
	req.on('')
} 

var fileNotFound = function(req,res){
	res.statusCode = 404;
	res.end('File not found');
}

var serveStaticFile = function(req, res, next){
	var filePath = './public'+req.url;
	console.log("filepath",filePath);
	fs.readFile(filePath, function(err, data){
		if(data){
			res.statusCode = 200;
			res.end(data);
		}
		else{
			next();
		}
	})
}

exports.post_handlers = [
	{path:'^/guestBook$', handler:postGuestComment},
	{path:'',handler:method_not_allowed}
]

exports.get_handlers = [
	{path:'^/$',handler:serverIndex},
	{path:'',handler:serveStaticFile},
	{path:'',handler:fileNotFound}
]


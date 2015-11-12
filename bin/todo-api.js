// Setup
// TODO: mongo listen events for restart and error handling
var express		= require('express');
var app			= express();

var bodyParser = require('body-parser');
var multer		= require('multer');

var mongoose	= require('mongoose');
mongoose.connect('mongodb://localhost/local', function(err) {
    if (err) throw err;
});

var todoRoutes	= require('../app/routes/todo-routes.js');
			
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, content-type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, HEAD, PUT, DELETE");
	next();
});
app.use(todoRoutes);

module.exports = app;
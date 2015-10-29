var express = require('express');
var router = express.Router();

var todo_handler = require('../stores/todo-store');
var todos = new todo_handler();

var upload	= require('multer')({
	dest: './static/uploads/',
	rename: function (fieldname, filename) {
		return filename.replace(/\W+/g, '-').toLowerCase();
	}
});

var root = "/api/todo";

router.get(root, function(req, res) {
	todos.getAllTodosByOwner(req.query.user_id, function (err, result) {
		if (err) {
			console.log (err);
			return res.status(500).send(err);
		}
		return res.status(200).send(result);
	});
});

router.get(root + "/:todo_id", function(req, res) {
	todos.getTodoById(req.params.todo_id, function (err, result) {
		if (err) {
			console.log (err);
			return res.status(500).send(err);
		}
		return res.status(200).send(result);
	});
});

router.post(root, function(req, res) {
	todos.createTodo({
			owner_id:	req.query.user_id,
			text:		req.body.text
		},
		function (err, result) {
			if (err) {
				console.log (err);
				return res.status(500).send(err);
			}
			return res.status(200).send(result);
		}
	);
});

router.put(root + "/:todo_id", function(req, res) {
	todos.updateTodo(req.params.todo_id, req.body, function(err, result) {
		if (err) {
			console.log (err);
			return res.status(500).send(err);
		}
		return res.status(200).send(result);
	});
});

router.delete(root + "/:todo_id", function(req, res) {
	todos.deleteTodo(req.params.todo_id, function(err, result) {
		if (err) {
			console.log (err);
			return res.status(500).send(err);
		}
		return res.status(200).send(result)
	});
});

module.exports	= router;
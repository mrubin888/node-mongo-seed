var Todo	= require('../models/todo');

function Todos(){};

Todos.prototype.createTodo			= function (data, callback) {
	var todo_item	= new Todo({
		owner_id: data.owner_id,
		text: data.text
	});
	todo_item.save(function(err, data) {
		if (err) {
			console.log (err);
			return callback (err);
		}
		return callback (null, data);
	});
	
};

Todos.prototype.getAllTodosByOwner	= function (user_id, callback) {
	Todo.find({owner_id: user_id}, function (err, items) {
		if (err) {
			console.log (err);
			return callback (err);
		}
		return callback (null, items);
	});
};

Todos.prototype.getTodoById			= function (todo_id, callback) {
	Todo.findById(todo_id, function (err, item) {
		if (err) {
			console.log (err);
			return callback (err);
		}
		return callback (null, item);
	});
};

Todos.prototype.updateTodo			= function (todo_id, params, callback) {
	Todo.update(
		{ _id: todo_id },
		{ $set: params },
		function (err, result) {
			if (err) {
				console.log (err);
				return callback (err);
			}
			return callback ();
		}
	);
};

Todos.prototype.deleteTodo			= function (todo_id, callback) {
	Todo.findById(todo_id, function (err, item) {
		if (err) {
			console.log (err);
			return callback (err);
		}
		item.remove(function (err) {
			if (err) {
				console.log (err);
				return callback (err);
			}
			return callback ();
		});
	});
};

module.exports = Todos;
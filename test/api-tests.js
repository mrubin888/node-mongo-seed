var Joi = require('joi')
var flareGun = require('flare-gun')
var app = require('../bin/todo-api.js');
var mongoose = require('mongoose');
var flare = flareGun.express(app);
 
var root = "/api/todo";

var todo_schema = {
	_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
	owner_id: Joi.number().required(),
	text: Joi.string().required(),
	__v: Joi.number()
};
 
var test_user_id	= 1;
 
describe('TodoApp', function () {

	it('create todolist item', function () {
		return flare
			.post(root + "?user_id=" + test_user_id, {
				text: "Test item"
			})
			.expect(200, todo_schema);
	});

	it('gets todolist items by user id', function () {
		return flare
			.post(root + "?user_id=" + test_user_id, {
				text: "Test item"
			})
			.expect(200, todo_schema)
			.get(root + "?user_id=" + test_user_id)
			.expect(200, Joi.array().items(todo_schema));
	});
	
	it('gets todolist item', function () {		
		return flare
			.post(root + "?user_id=" + test_user_id, {
				text: "Test item"
			})
			.expect(200, todo_schema)
			.stash('todo')
			.get(root + "/:todo._id")
			.expect(200, todo_schema);
		
	});
	
	it('update todolist item', function () {
		return flare
			.post(root + "?user_id=" + test_user_id, {
				text: "Test item"
			})
			.expect(200, todo_schema)
			.stash('todo')
			.put(root + "/:todo._id?user_id=" + test_user_id, {
				text: "Updated test text"
			})
			.expect(200);
	});
	
	it('delete todolist item', function () {		
		return flare
			.post(root + "?user_id=" + test_user_id, {
				text: "Test item"
			})
			.expect(200, todo_schema)
			.stash('todo')
			.del(root + "/:todo._id")
			.expect(200);
	});
	
})
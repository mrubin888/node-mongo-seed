var mongoose	= require('mongoose');

var Todo = mongoose.model('Todo',
	{
		owner_id: Number,
		text: String
	}
);

module.exports	= Todo;
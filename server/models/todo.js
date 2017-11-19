let mongoose = require('mongoose');

let Todo = mongoose.model('Todo', {
	text: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Number,
		default: null
	},
	_creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	}
});

// _creator sets a unique todo based on the id

// Type casting does exist in mongoose

module.exports = {Todo};
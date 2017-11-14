const {ObjectID} = require('mongodb');

const{mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// let id = '5a0b10d591f0a544c900d6cb11';

// if (!ObjectID.isValid(id)) {
// 	console.log('ID not valid');
// }

  // Todo.find({
  //   _id: id
  // }).then((todos) => {
  // 	console.log('Todos', todos);
  // });

  // Mongoose doesn't require that you pass in Object IDs, it does the object id conversion for you

  // Todo.findOne({
  //   _id: id
  // }).then((todo) => {
  //   console.log("Todo", todo);
  // });

  // findOne is the best function to use if you are looking for the first one

//   Todo.findById(id)
//     .then(todo => {
//       if (!todo) {
//         return console.log("Id not found");
//       }
//       console.log("Todo By Id", todo);
//     })
//     .catch(e => console.log(e));

// A way to validate the ID is to add an if statement to see if it matches

// User.findById

let userID = '5a0a5eeb75cfb838ad47458d';

User.findById(userID)
	.then(user => {
		if(!user) {
			return console.log('Unable to find user');
		}
		console.log('User by ID', user);
	}).catch(e => console.log(e));
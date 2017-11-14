const {ObjectID} = require('mongodb');

const{mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

// Todo.findOneAndRemove({_id: "5a0b50fb4827a382188af8ab"}).then((todo) => {

// });

Todo.findByIdAndRemove("5a0b50fb4827a382188af8ab").then((todo) => {
  console.log(todo);
});

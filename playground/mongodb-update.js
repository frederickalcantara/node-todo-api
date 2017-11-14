// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    return console.log("Unable to connect to MongoDB server");
  }
  console.log("Connected to MongoDB server");

//   db.collection('Todos').findOneAndUpdate({
// 	  _id: new ObjectID("5a0a4752020bb8a9ed6d7464")
//   }, {
// 	  $set: {
// 		  completed: true
// 	  }
//   }, {
// 	  returnNewDocument: true
//   }).then((result) => {
// 	  console.log(result);
//   });

  db.collection('Users').findOneAndUpdate({
	  _id: new ObjectID('59fb609fd9e63d16c62acffa')
  }, {
	  $set: {
		  name: 'Adrian'
	  },
	  $inc: {
		  "age": 1
	  }
  }, {
	  returnNewDocument: true
  }).then((result) => {
	  console.log(result);
  });

  // db.close();
});

// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    return console.log("Unable to connect to MongoDB server");
  }
  console.log("Connected to MongoDB server");

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) => {
  //   console.log(result);
  // });

  // Deletes any data points(documents) within a collection with a specific property and value

  // deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) => {
  //   console.log(result);
  // });

  // Deletes the first document that matches its needs.

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // })

  // Returns a deleted document after having deleted it (gives info about the document).

  db.collection('Users').deleteMany({name: 'Freddyal'}).then((result) => {
    console.log(result);
  });

  db.collection('Users').findOneAndDelete({_id: 123}).then((result) => {
    console.log(result);
  });

  db
    .collection("Users")
    .findOneAndDelete({ _id: new ObjectID("59fb5f16f4089a16a63d1988")})
    .then((result) => {
      console.log(JSON.stringify(results, undefined, 2));
    });

  // db.close();
});

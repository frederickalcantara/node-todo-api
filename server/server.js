const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req,res) => {
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({
      todos
    });
    // Using an object for res.send allows for more flexibilty if you want to add on more properties instead of using an array
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET /todos/1231333
app.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  // Validate id using isValid
    // 404 - send back empty send
  if(!ObjectID.isValid(id)) {
    return res.status(404).send('ID is not found');
  }

  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send("ID is not found");
      }

      res.send({todo});
      console.log("Todo By Id", todo);
    })
    .catch((e) => {
      res.status(400).send();
    });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {
  app
};
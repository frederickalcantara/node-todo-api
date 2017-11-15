require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = process.env.PORT;

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


app.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('ID is not found');
  }

  Todo.findById(id)
    .then((todo) => {
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

app.delete('/todos/:id', (req, res) => {

  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send("ID isn't found");
  }

  Todo.findByIdAndRemove(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send("ID is not found");
      }

      res.send({todo});
      console.log('Todo by Id');
    })
    .catch((e) => {
      res.status(400).send();
    });
});

app.patch('/todos/:id', (req,res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed']);
  // Subset things user has put in, we don't want the user to update anything they choose.
  // Using the pick function allows us to choose which properties can a user update

  if (!ObjectID.isValid(id)) {
    return res.status(404).send("ID isn't found");
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  // Update the completedAt property with the completed property

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    // Updates the properties
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {
  app
};
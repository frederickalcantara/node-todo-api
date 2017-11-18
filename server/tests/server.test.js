const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
	it('Should create a new todo', (done) => {
		let text = 'Test todo text';

		request(app)
			.post('/todos')
			.send({
				text
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(text);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Todo.find({
					text
				}).then((todos) => {
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done();
				}).catch((e) => done(e));
			});
	});

	it('Should not create todo with invalid body data', (done) => {
		request(app)
			.post("/todos")
			.send({})
			.expect(400)
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Todo.find()
					.then(todos => {
						expect(todos.length).toBe(2);
						done();
					})
					.catch(e => done(e));
			});
	});
});

describe('GET /todos', () => {
	it('Should get all todos', (done) => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length).toBe(2);
			})
			.end(done);
	});
});

describe('GET /todos/:id', () => {
	it('Should return todo doc', (done) => {
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done);
	});

	it('Should return a 404 if todo not found', (done) => {
		let hexId = new ObjectID().toHexString();

		request(app)
			.get(`/todos/${hexId}`)
			.expect(404)
			.end(done);
	});

	it('Should return 404 for non-object ids', (done) => {
		request(app)
			.get('/todos/123abc')
			.expect(404)
			.end(done);
	});
});

describe('DELETE /todos/:id', () => {
	it('Should remove a todo', (done) => {
		let hexId = todos[1]._id.toHexString();
		request(app)
			.delete(`/todos/${hexId}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo._id).toBe(hexId);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Todo.findById(hexId)
					.then((todo) => {
						expect(todo).toBeFalsy();
						done();
					}).catch((e) => done(e));
			});
	});

	it('Should return a 404 if todo not found', (done) => {
		let hexId = new ObjectID().toHexString();

		request(app)
			.delete(`/todos/${hexId}`)
			.expect(404)
			.end(done);
	});

	it('Should return 404 for object id is invalid', (done) => {
		request(app)
			.delete("/todos/123abc")
			.expect(404)
			.end(done);
	});
});

describe('PATCH /todos/:id', () => {
	it('Should update the todo', (done) => {
		// grab id of first item
		let hexId = todos[0]._id.toHexString();
		let text = 'Updated text';

		request(app)
			.patch(`/todos/${hexId}`)
			.send({
				completed: true,
				text
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(text);
				expect(res.body.todo.completed).toBe(true);
				expect(res.body.todo.completedAt).toBeA('number');
			})
			.end(done);

		// update text, set completed to true
		// expect 200
		// expect res.body has text property equal to text, completed is true, completed at is a number .toBeA
	});

	it('Should clear completedAt when todo is not completed', (done) => {
		// grab id of second todo item
		let hexId = todos[1]._id.toHexString();
    	let text = "This is also updated text";

    	request(app)
      		.patch(`/todos/${hexId}`)
      		.send({
				completed: false,
				text
			})
      		.expect(200)
   		   	.expect((res) => {
       			expect(res.body.todo.text).toBe(text);
        		expect(res.body.todo.completed).toBe(false);
        		expect(res.body.todo.completedAt).toBeFalsy();
     		})
      		.end(done);
	});
});

describe('GET /users/me', () => {
	it('Should return user if authenticated', (done) => {
		request(app)
			.get('/users/me')
			.set('x-auth', users[0].tokens[0].token)
			.expect(200)
			.expect((res) => {
				expect(res.body._id).toBe(users[0]._id.toHexString());
				expect(res.body.email).toBe(users[0].email);
			})
			.end(done);
	});

	it('Should return 401 if not authenticated', (done) => {
		request(app)
			.get('/users/me')
			.expect(401)
			.expect((res) => {
				expect(res.body).toEqual({});
			})
			.end(done);
	});
})

describe('POST /users', () => {
	it('Should create a user', (done) => {
		let email = 'example@gmail.com';
		let password= 'password';

		request(app)
			.post('/users')
			.send({email, password})
			.expect(200)
			.expect((res) => {
				expect(res.headers['x-auth']).toExist();
				expect(res.body._id).toExist();
				expect(res.body.email).toBe(email);
			})
			.end((err) => {
				if (err) {
					return done(err);
				}

				User.findOne({email}).then((user) => {
					expect(user).toExist();
					expect(user.password).toNotBe(password);
					done();
				}).catch((e) => done(e));
			});
	});

	it('Should return validation errors if request invalid', (done) => {
		let invalidEmail = "fred.com";
		let invalidPassword = "po";

		request(app)
			.post('/users')
			.send({invalidEmail, invalidPassword})
			.expect(400)
			.end(done);
	});

	it('Should not create user if email is in use', (done) => {
		request(app)
			.post('/users')
			.send({
				email: users[0].email,
				password: 'password'
			})
			.expect(400)
			.end(done);
	});
});

describe('POST /users/login', () => {
	it('Should login user and return auth token', (done) => {
		request(app)
			.post('/users/login')
			.send({
				email: users[1].email,
				password: users[1].password
			})
			.expect(200)
			.expect((res) => {
				expect(res.headers['x-auth']).toExist();
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}

			User.findById(users[1]._id).then(user => {
            	expect(user.tokens[0]).toInclude({
              		access: "auth",
              		token: res.headers["x-auth"]
            	});
            	done();
            }).catch((e) => done(e));
		});
	});

	it('Should reject invalid login', (done) => {
		request(app)
			.post('/users/login')
			.send({
				email: users[1].email,
				password: users[1].password + '1'
			})
			.expect(400)
			.expect((res) => {
				expect(res.headers['x-auth']).toNotExist();
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}

			User.findById(users[1]._id).then(user => {
            	expect(user.tokens.length).toEqual(0);
            	done();
            }).catch((e) => done(e));
		});
	});
});
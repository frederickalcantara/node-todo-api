const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abc!';
// bcrypt.genSalt(10, (err, salt) => {
// 	bcrypt.hash(password, salt, (err, hash) => {
// 		console.log(hash);
// 	});
// });

let hashedPassword = "$2a$10$yJ0LxxeyjtMi5Na/KyAXJemQJFI7cXUgDJlDkS5GUcndoK5bQBLpq";

bcrypt.compare('123', hashedPassword, (err, res) => {
	console.log(res);
});

/*
var data = {
	id: 10
};

let token = jwt.sign(data, '123abc');
console.log(token);

let decoded = jwt.verify(token, '123abc');
console.log('Decoded', decoded);
*/

// The secret from the token and the verify have to be the same

// jwt.sign takes an object and 'signs' it returning the token value
// and hashes it.

// jwt.verify does the opposite, it takes that token and the secret
// and it makes sure that the data was not manipulated.


/*
let message = 'I am user number 1';
let hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);
*/

// Hashing is a one-way algorithm. It obfuscates a string password
// It's used for storing passwords in a database.
// It's bad to store plain text password in a database.

/*
let data = {
	id: 4
};
*/

/*
let token = {
	data,
	hash: SHA256(JSON.stringify(data) + 'secret').toString()
}
*/

// salting the hash means you add something on to the hash
// that is unique that changes the value

/*
token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();

let resultHash = SHA256(JSON.stringify(token.data) + 'secret').toString();

if (resultHash === token.hash) {
	console.log('Data was not changed');
	console.log(resultHash);
	console.log(token.hash);
} else {
	console.log('Data was changed. Don"t trust');
	console.log(resultHash);
  	console.log(token.hash);
}
*/

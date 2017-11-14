let mongoose = require('mongoose');

// User
// email - require it - trim it - set type - set minlength of 1

let User = mongoose.model("User", {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

// let newUser = new User({
//   email: "frederickaalcantara@gmail.com"
// });

// newUser.save().then(
//   doc => {
//     console.log(JSON.stringify(doc, undefined, 2));
//   },
//   e => {
//     console.log("Unable to save todo", e);
//   }
// );

module.exports = {User};
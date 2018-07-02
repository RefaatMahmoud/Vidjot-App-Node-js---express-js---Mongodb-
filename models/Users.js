const mongoess = require("mongoose");
const Schema = mongoess.Schema;

//Create Schema
const UsersSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

mongoess.model('Users', UsersSchema);
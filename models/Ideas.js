const mongoess = require("mongoose");
const Schema = mongoess.Schema;

//Create Schema
const IdeasSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  detals: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoess.model('Ideas', IdeasSchema);
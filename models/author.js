const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authorSchema = new Schema({
  // don't need to define id, 
  // since MongoDB will automatically create new id for each file we add to database
  name: String,
  age: Number,
});

module.exports = mongoose.model('Author', authorSchema);
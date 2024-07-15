const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  // don't need to define id, 
  // since MongoDB will automatically create new id for each file we add to database
  name: String,
  genre: String,
  authorId: String
});

module.exports = mongoose.model('Book', bookSchema);
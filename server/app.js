const express = require('express');

// 'express-graphql' helps express understand graphl, 
// since express doesn’t understand graphql out of the box
const graphqlHTTP = require('express-graphql');

const mongoose = require('mongoose'); // ORM for MongoDB

const schema = require('./schema/schema');

const app = express();

mongoose.connect('mongodb+srv://gooogyeong:RwHsSkuLFxXV9G11@react-express-graphql-p.atbdfyo.mongodb.net/');

mongoose.connection.once('open', () => {
  // once the connection is open, this callback function is fired
  console.log('connected to database')
})

app.use('/graphql', graphqlHTTP({
  schema, // schema/object type of graph
  // mongoose schema/object type of data to be stored in MongoDB; so that MongoDB understands the data and knows what to expect
  graphiql: true, // we want to use graphiql when we go to /graphql
}));

app.listen(4000, () => {
  console.log('now listening for requests on port 4000')
})
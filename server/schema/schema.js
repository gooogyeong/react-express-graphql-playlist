const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const _ = require('lodash');

const books = [
  { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
  { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2'},
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
  { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorld: '2' }, 
  { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorld: '3' }, 
  { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorld: '3' } 
]

const authors = [
  { name: 'Patrick Rothfuss', age: 44, id: '1' },
  { name: 'Brandon Sanderson', age: 42, id: '2' },
  { name: 'Terry Pratchett', age: 66, id: '3' },
]

/**
 * Book { 
 *  title
 *  genre
 * }
 */
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    // fields should be a function that returns object, not a plain object
    // so that by the time the function is called, all depdencies, e.g. AuthorType, BookType is defined
    // and there is no reference issue
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: { 
      type: AuthorType,
      resolve (parent, args) {
        // parent contains the parent data, which is book that is queried,
        // console.log('parent', parent) // { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
        // return authors.find(author => author.id === parent.authorId);
        return _.find(authors, { id })
      }
    }
  })
})

/** 
 * Author {
 * name
 * age
 * }
*/
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: { 
      type: new GraphQLList(BookType),
      resolve (parent, args) {
        const { id } = args;

        return _.filter(books, book => book.authorId === id);
      }
    }
  })
})
 
// root query = how/where frontend frontend initially get into the graph?
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType, // type of data that we're querying
      args: { id: { type: GraphQLID }}, // with id of type GraphQLID, both book (id: "3") {} and books (id: 3) {} works
      resolve (parent, args) {
        // this functions gets fired when we receive 'book' query
        // function that gets data we need e.g. from database, other data source
        // parent: comes into play when we look into relationship between data
        // args: access arguments that user send along with query
        const { id } = args;
        // console.log(typeof id) // string
        // even when you pass integer (books (id: 3) {}),
        // typeof id logs 'string'
        return _.find(books, { id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID }},
      resolve (parent, args) {
        const { id } = args;

        return _.find(authors, { id });
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve () {
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve () {
        return authors;
        // nested query like
        // {
        //   authors {
        //     id
        //     name
        //     books {
        //       name
        //     }
        //   }
        // }
        // works out of the box
      }
    },
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
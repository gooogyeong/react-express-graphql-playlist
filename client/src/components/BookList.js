import { gql } from 'apollo-boost';

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`

const BookList = () => {
  return (
    <div>
      <ul id="book-list">
        <li>Book name</li>
      </ul>
    </div>
  )
}

export default BookList
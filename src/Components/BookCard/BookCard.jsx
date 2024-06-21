import React from 'react'
import './BookCard.css'

const BookCard = ({book}) => {
  return (
    <div className='book-card'>
      <img src={book.cover_url} alt={book.title} className="book-cover" />
      <h4>{book.title}</h4>
      <p className='author'><strong>Author:</strong>{book.author}</p>
      <p className={`availability ${book.available ? '' : 'unavailable'}`}>
      {book.available ? 'Available' : 'Unavailable'}</p>
      
    </div>
  )
}

export default BookCard



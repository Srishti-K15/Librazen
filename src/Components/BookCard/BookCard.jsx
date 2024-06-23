import React from 'react'
import './BookCard.css'

const BookCard = ({book, onBorrow }) => {
  return (
    <div className='book-card'>
      <img src={book.cover_url} alt={book.title} className="book-cover" />
      <h4>{book.title}</h4>
      <p className='author'><strong>Author:</strong>{book.author}</p>
      <button
        className={`borrow-btn ${book.available ? '' : 'disabled'}`}
        onClick={() => onBorrow(book.id)}
        disabled={!book.available}
      >
        {book.available ? 'Borrow' : 'Unavailable'}
      </button>
      
    </div>
  )
}

export default BookCard



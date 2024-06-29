import React from 'react'
import supabase from '../../config/supabaseClient';
import './BookCard.css'

const BookCard = ({book, onBorrow }) => {
  const getCoverImageUrl = (path) => {
    const { data } = supabase.storage.from('cover_page').getPublicUrl(path);
    return data.publicUrl;
  };

  return (
    <div className='book-card'>
      <div className='cover-container'>
        <img src={getCoverImageUrl(book.cover_image)} alt={book.title} className="book-cover" />
      </div>
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



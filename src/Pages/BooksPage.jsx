import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import BookCard from '../Components/BookCard/BookCard';
import './BooksPage.css';
import Layout from '../Components/Layout/layout';

const BookPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try{
    const { data, error } = await supabase
    .from('books')
    .select();
    if (error) console.error('Error fetching books:', error);
    else {
        console.log('Fetched books:', data);
        setBooks(data);
      }
    }catch (error) {
        console.error('Error fetching books:', error.message);
      }
  };

  return (
    <Layout>
    <div className="book-page">
      
      <div className="book-list">
        {books.map(book => (
          <BookCard key={books.id} book={book} />
        ))}
      </div>
    </div>
    </Layout>
  );
};

export default BookPage;

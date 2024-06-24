import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import BookCard from '../Components/BookCard/BookCard';
import './BooksPage.css';
import Layout from '../Components/Layout/layout';

const BookPage = () => {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
    fetchBooks(); // Initially fetch books when component mounts
  }, []);

  const fetchUser = async () => {
    try {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.log("Error fetching user", userError);
        return;
      }
      setUser(user);
      console.log("Fetched user ID:", user.id);
    } catch (error) {
      console.error('Error fetching user:', error.message);
    }
  };

  const fetchBooks = async () => {
    try {
      const { data, error } = await supabase
        .from('books')
        .select();
      if (error) {
        console.error('Error fetching books:', error);
      } else {
        console.log('Fetched books:', data);
        setBooks(data);
      }
    } catch (error) {
      console.error('Error fetching books:', error.message);
    }
  };

  const borrowBook = async (bookId) => {
    try {
      if (!user) {
        alert('You must be logged in to borrow a book.');
        return;
      }

      const { data, error } = await supabase
        .from('borrow')
        .insert([{ user_id: user.id, book_id: bookId, borrow_date: new Date(), return_date: null }]);

      if (error) {
        console.error('Error borrowing book:', error);
        alert('Error borrowing book.');
      } else {
        await supabase
          .from('books')
          .update({ available: false })
          .eq('id', bookId);
        fetchBooks(); // Refresh book list after borrowing
        alert('Book borrowed successfully.');
      }
    } catch (error) {
      console.error('Error borrowing book:', error.message);
    }
  };

  return (
    <Layout>
      <div className="book-page">
        <div className="book-list">
          {books.map(book => (
            <BookCard key={book.id} book={book} onBorrow={() => borrowBook(book.id)} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default BookPage;

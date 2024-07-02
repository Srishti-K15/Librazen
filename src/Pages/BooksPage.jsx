import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import BookCard from '../Components/BookCard/BookCard';
import './BooksPage.css';
import Layout from '../Components/Layout/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


const BookPage = () => {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('catalogue'); // Default search option

  useEffect(() => {
    fetchUser();
    fetchBooks();
  }, []);

  const fetchUser = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
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
      let query = supabase.from('books').select();

      if (searchTerm) {
        if (searchOption === 'title') {
          query = query.ilike('title', `%${searchTerm}%`);
        } else if (searchOption === 'author') {
          query = query.ilike('author', `%${searchTerm}%`);
        } else {
          query = query.or(`title.ilike.%${searchTerm}%,author.ilike.%${searchTerm}%`);
        }
      }      

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching books:', error);
      } else {
        setBooks(data);
      }
    } catch (error) {
      console.error('Error fetching books:', error.message);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  const handleSearch = () => {
    fetchBooks();
  };

  const borrowBook = async (bookId) => {
    try {
      if (!user) {
        alert('You must be logged in to borrow a book.');
        return;
      }

      const borrowDate = new Date();
      const dueDate = new Date();
      dueDate.setDate(borrowDate.getDate() + 14);

      const { data, error } = await supabase
        .from('borrow')
        .insert([{ user_id: user.id, book_id: bookId, borrow_date: borrowDate, due_date: dueDate, return_date: null }]);

      if (error) {
        console.error('Error borrowing book:', error);
        alert('Error borrowing book.');
      } else {
        await supabase
          .from('books')
          .update({ available: false })
          .eq('id', bookId);
        fetchBooks();
        alert('Book borrowed successfully.');
      }
    } catch (error) {
      console.error('Error borrowing book:', error.message);
    }
  };

  return (
    <Layout>
      <div className="book-page">
        <div className="filter">
          <select name="searchOption" value={searchOption} onChange={handleSearchOptionChange}>
            <option value="catalogue">Library Catalogue</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
          </select>
          <div className='search-container'>
          <input
            type="text"
            name="searchTerm"
            placeholder={`Search by ${searchOption}`}
            onChange={handleInputChange}
          />
          <button onClick={handleSearch} className='search-btn'><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
          </div>
          </div>
        <div className="book-list">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onBorrow={() => borrowBook(book.id)} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default BookPage;

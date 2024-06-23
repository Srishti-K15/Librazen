import React, { useEffect, useState } from 'react';
import supabase from '../config/supabaseClient';
import Layout from '../Components/Layout/Layout';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const fetchUser = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.log("Error fetching user", userError);
      return;
    }
    setUser(user);
    
    if (user) {
      console.log("Fetched user ID:", user.id); 
      let { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.log("Error fetching profile", profileError);
      } else {
        setProfile(profile);
      }

      let { data: borrowedBooks, error: booksError } = await supabase
        .from('borrow')
        .select(`
          id,
          borrow_date,
          due_date,
          return_date,
          books ( id, title, available )
        `)
        .eq('user_id', user.id);
        
      if (booksError) {
        console.log("Error fetching borrowed books", booksError);
      } else {
        setBorrowedBooks(borrowedBooks);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const returnBook = async (borrowId, bookId) => {
    const { error } = await supabase
      .from('borrow')
      .update({ return_date: new Date() })
      .eq('id', borrowId);
      
    if (error) {
      console.log('Error returning book:', error);
    } else {
      await supabase
        .from('books')
        .update({ available: true })
        .eq('id', bookId);
      fetchUser();  
    }
  };

  const borrowBook = async (bookId) => {
    const { data, error } = await supabase
      .from('borrow')
      .insert([{ user_id: user.id, book_id: bookId, borrow_date: new Date(), return_date: null }]);
      
    if (error) {
      console.log('Error borrowing book:', error);
    } else {
      await supabase
        .from('books')
        .update({ available: false })
        .eq('id', bookId);
      fetchUser();  
    }
  };

  if (!user || !profile) return <div>Loading...</div>;

  return (
    <Layout>
      <div className='profile'>
        <h1>Profile</h1>
        <div className='details'>
          <p>Name: {profile.full_name}</p>
          <p>Email: {user.email}</p>
          <p>ID: {user.id}</p>
          <p>Dues: {profile.dues}</p>
        </div>
        <h2>Borrowed Books</h2>
        <table className='borrowed-books-table'>
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Borrow Date</th>
              <th>Due Date</th>
              <th>Return Date</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.map(book => (
              <tr key={book.id}>
                <td>{book.books.title}</td>
                <td>{new Date(book.borrow_date).toLocaleDateString("en-IN")}</td>
                <td>{new Date(book.due_date).toLocaleDateString("en-IN")}</td>
                <td>{book.return_date ? new Date(book.return_date).toLocaleDateString() : 
                  <button className='return-btn' onClick={() => returnBook(book.id, book.books.id)}>Return</button>
                  }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Profile;

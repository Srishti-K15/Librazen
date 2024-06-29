import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../config/supabaseClient';
import Layout from '../Components/Layout/layout';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';


const Profile = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const navigate = useNavigate();

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
        setEditedName(profile.full_name);
        setEditedEmail(user.email);
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

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log('Error logging out:', error);
    } else {
      navigate('/login');
    }
  };

  const goToAdminPortal = () => {
    navigate('/admin');
  };

  const handleSaveName = async () => {
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: editedName })
      .eq('id', user.id);

    if (error) {
      console.log('Error updating profile:', error);
    } else {
      setIsEditingName(false);
      fetchUser();
    }
  };

  const handleSaveEmail = async () => {
    const { error } = await supabase.auth.updateUser({
      email: editedEmail,
    });

    if (error) {
      console.log('Error updating email:', error);
    } else {
      setIsEditingEmail(false);
      fetchUser();
    }
  };

  if (!user || !profile) return <div >Loading...</div>;

  const getStatus = (dueDate, returnDate) => {
    if (returnDate) return 'Returned';
    const today = new Date();
    if (new Date(dueDate) < today) return 'Overdue';
    return 'Borrowed';
  };

  return (
    <Layout>
      <div className='profile'>
        <div className='profile-box'>
          <h2>Profile</h2>
          <table className='details'>
            <tbody>
              <tr>
                <td>Name:</td>
                <td>
                  {isEditingName ? (
                    <input
                      type='text'
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                  ) : (
                    profile.full_name
                  )}
                
                  {isEditingName ? (
                    <>
                      <button className='save-btn' onClick={handleSaveName}>Save</button>
                      <button className='cancel-btn' onClick={() => setIsEditingName(false)}>Cancel</button>
                    </>
                  ) : (
                    <button className='edit-icon' onClick={() => setIsEditingName(true)}><FontAwesomeIcon icon={faPenToSquare} alt="Edit" /></button>
                  )}
                </td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>
                  {isEditingEmail ? (
                    <input
                      type='email'
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                    />
                  ) : (
                    user.email
                  )}
                  {isEditingEmail ? (
                    <>
                      <button className='save-btn' onClick={handleSaveEmail}>Save</button>
                      <button className='cancel-btn' onClick={() => setIsEditingEmail(false)}>Cancel</button>
                    </>
                  ) : (
                    <button className='edit-icon' onClick={() => setIsEditingEmail(true)}><FontAwesomeIcon icon={faPenToSquare} alt="edit" /></button>
                  )}
                </td>
              </tr>
              <tr>
                <td>ID:</td>
                <td>{user.id}</td>
                <td></td>
              </tr>
              <tr>
                <td>Role:</td>
                <td>{user.role}</td>
                <td></td>
              </tr>
              <tr>
                <td>Dues:</td>
                <td>{profile.dues}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div className='buttons'>
            {user.role === 'service_role' && (
              <button className='admin-portal-btn' onClick={goToAdminPortal}>
                Admin Portal
              </button>
            )}
            <button className='logout-btn' onClick={handleLogout}>Log Out</button>
          </div>
        </div>
        <div className='borrowed-box'>
          <h2>Borrowed Books</h2>
          <table className='borrowed-books-table'>
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Borrow Date</th>
                <th>Due Date</th>
                <th>Return Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {borrowedBooks.map(book => {
                const status = getStatus(book.due_date, book.return_date);
                return (
                  <tr key={book.id}>
                    <td>{book.books.title}</td>
                    <td>{new Date(book.borrow_date).toLocaleDateString("en-IN")}</td>
                    <td>{new Date(book.due_date).toLocaleDateString("en-IN")}</td>
                    <td>{book.return_date ? new Date(book.return_date).toLocaleDateString("en-IN") :
                      <button className='return-btn' onClick={() => returnBook(book.id, book.books.id)}>Return</button>
                    }</td>
                    <td className={`status-${status.toLowerCase()}`}>{status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

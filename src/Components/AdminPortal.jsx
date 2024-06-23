import React from 'react'
import { useState, useEffect } from 'react'
import supabase from '../config/supabaseClient'
import './AdminPortal.css'
import Layout from './Layout/Layout'

const AdminPortal = () => {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [available, setAvailable] = useState(true); 
    const [editingBookId, setEditingBookId] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const { data, error } = await supabase
            .from('books')
            .select('*');
        if (error) {
            console.log('Error fetching books:', error);
        } else {
            setBooks(data);
        }
    }

    const addBook = async () => {
        const { data, error } = await supabase
            .from('books')
            .insert([{ title, author, available }]);
        if (error) {
            console.log('Error adding book:', error);
        } else {
            setBooks([...books, data[0]]);
            resetForm();
        }
    };

    const deleteBook = async (id) => {
        const { error } = await supabase
            .from('books')
            .delete()
            .eq('id', id);
        if (error)
            console.log('Error deleting book:', error);
        else {
            setBooks(books.filter(book => book.id !== id));
        }
    };

    const updateBook = async () => {
        const { error } = await supabase
            .from('books')
            .update({ title, author, available })
            .eq('id', editingBookId);
        if (error)
            console.log('Error updating book:', error);
        else {
            setBooks(books.map(book => book.id === editingBookId ? { ...book, title, author, available } : book));
            resetForm();
        }
    };

    const resetForm = () => {
        setTitle('');
        setAuthor('');
        setAvailable(true);
        setEditingBookId(null);
    };

    return (
      <div>
      <Layout>
      <div className='AdminPage'>
          <h1>Admin Portal</h1>
          <table>
              <thead>
                  <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Available</th>
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {books.map(book => (
                      <tr key={book.id}>
                          <td>{book.title}</td>
                          <td>{book.author}</td>
                          <td>{book.available ? 'Yes' : 'No'}</td>
                          <td>
                              <button className='edit' onClick={() => {
                                  setEditingBookId(book.id);
                                  setTitle(book.title);
                                  setAuthor(book.author);
                                  setAvailable(book.available);
                              }}>Edit</button>
                              <button className='delete' onClick={() => deleteBook(book.id)}>Delete</button>
                          </td>
                      </tr>
                  ))}
                  <tr >
                      <td className='update'>
                          <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                      </td>
                      <td className='update'>
                          <input type='text' placeholder='Author' value={author} onChange={(e) => setAuthor(e.target.value)} />
                      </td>
                      <td>
                      <label>
                                <input type='radio' value={true} checked={available === true} onChange={() => setAvailable(true)} /> Yes
                            </label>
                            <label>
                                <input type='radio' value={false} checked={available === false} onChange={() => setAvailable(false)} /> No
                            </label>
                      </td>
                      <td>
                          {editingBookId ? <button className='add' onClick={updateBook}>Update Book</button> : <button className='add' onClick={addBook}>Add Book</button>}
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
    </Layout>
    </div>
  )
}


export default AdminPortal

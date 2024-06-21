import React from 'react'
import { useState, useEffect } from 'react'
import supabase from '../config/supabaseClient'

const AdminPortal = () => {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [genre, setGenre] = useState('');
    const [available, setAvailable] = useState('');
    const [editingBookId, setEditingBookId] = useState(null);

    useEffect( () =>{
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const { data, error} = await supabase
        .from('books')
        .select('*');
        if(error){
            console.log('Error fetching books:', error);
        }
        else{
            setBooks(data);
        }
    }

    const addBook = async() => {
        const {data, error} = await supabase
        .from('books')
        .insert([{title, author, isbn, genre, available}]);
        if(error){
            console.log('Error adding book:', error);
        }
        else{
            setBooks([...books, data[0]]);
            resetForm();
        }
    };

    const deleteBook = async(id) => {
        const{error} = await supabase
        .from('books')
        .delete()
        .eq('id', id);
        if(error)
            console.log('Error deleting book:', error);
        else{
            setBooks(books.map(book => book.id === editingBookId ? { ...book, title, author, isbn, genre, available } : book));
            resetForm();
        }
    };

    const updateBook = async () => {
        const { error } = await supabase
        .from('books')
        .update({ title, author, isbn, genre, available })
        .eq('id', editingBookId);
        if (error) 
            console.log('Error updating book:', error);
        else {
          setBooks(books.map(book => book.id === editingBookId ? { ...book, title, author, isbn, genre, available } : book));
          resetForm();
        }
      };

    const resetForm = () => {
        setTitle('');
        setAuthor('');
        setIsbn('');
        setGenre('');
        setAvailable(true);
        setEditingBookId(null);
      };

  return (
    <div>
        <h2>Admin Portal</h2>
        <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input type='text' placeholder='Author' value={author} onChange={(e) => setAuthor(e.target.value)}/>
        <input type='text' placeholder='ISBN' value={isbn} onChange={(e) => setIsbn(e.target.value)}/>
        {editingBookId ? <button onClick={updateBook}>Update Book</button> : <button onClick={addBook}>Add Book</button>}
      <ul>
      {books.map(book => (
          <li key={book.id}>
            {book.title} by {book.author} (ISBN: {book.isbn})
            <button onClick={() => {
              setEditingBookId(book.id);
              setTitle(book.title);
              setAuthor(book.author);
              setIsbn(book.isbn);
            }}>Edit</button>
            <button onClick={() => deleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminPortal
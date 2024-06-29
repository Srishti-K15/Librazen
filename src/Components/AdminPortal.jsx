import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import './AdminPortal.css';
import Layout from './Layout/layout';

const AdminPortal = () => {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [available, setAvailable] = useState(true);
    const [editingBookId, setEditingBookId] = useState(null);
    const [coverImage, setCoverImage] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const { data, error } = await supabase
                .from('books')
                .select('*');
            if (error) {
                console.error('Error fetching books:', error);
            } else {
                setBooks(data);
            }
        } catch (error) {
            console.error('Error fetching books:', error.message);
        }
    };

    const uploadImage = async (file) => {
        try {
            const { data, error } = await supabase.storage
                .from('cover_page')
                .upload(`public/${file.name}`, file);

            if (error) {
                console.error('Error uploading image:', error);
                return null;
            }

            console.log('Image uploaded successfully:', data);
            return data.path;
        } catch (error) {
            console.error('Error uploading image:', error.message);
            return null;
        }
    };

    const addBook = async () => {
        try {
            let imagePath = null;
            if (coverImage) {
                imagePath = await uploadImage(coverImage);
            }

            const { data, error } = await supabase
                .from('books')
                .insert([{ title, author, available, cover_image: imagePath }]);

            if (error) {
                console.error('Error adding book:', error);
                return;
            }

            setBooks([...books, data[0]]);
            resetForm();
        } catch (error) {
            console.error('Error adding book:', error.message);
        }
    };

    const updateBook = async () => {
        try {
            let imagePath = null;
            if (coverImage) {
                imagePath = await uploadImage(coverImage);
            }

            const { error } = await supabase
                .from('books')
                .update({ title, author, available, cover_image: imagePath })
                .eq('id', editingBookId);

            if (error) {
                console.error('Error updating book:', error);
                return;
            }

            setBooks(books.map(book =>
                book.id === editingBookId ? { ...book, title, author, available, cover_image: imagePath || book.cover_image } : book
            ));
            resetForm();
        } catch (error) {
            console.error('Error updating book:', error.message);
        }
    };

    const deleteBook = async (id) => {
        try {
            const { error } = await supabase
                .from('books')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error deleting book:', error);
                return;
            }

            setBooks(books.filter(book => book.id !== id));
        } catch (error) {
            console.error('Error deleting book:', error.message);
        }
    };

    const resetForm = () => {
        setTitle('');
        setAuthor('');
        setAvailable(true);
        setEditingBookId(null);
        setCoverImage(null);
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setCoverImage(e.target.files[0]);
        }
    };

    const getCoverImageUrl = (path) => {
        const { data } = supabase.storage.from('cover_page').getPublicUrl(path);
        return data.publicUrl;
    };

    return (
        <Layout>
            <div className='AdminPage'>
                <h1>Admin Portal</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Available</th>
                            <th>Cover Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
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
                                <input type='file' onChange={handleFileChange} />
                            </td>
                            <td>
                                {editingBookId ?
                                    <button className='add' onClick={updateBook}>Update Book</button> :
                                    <button className='add' onClick={addBook}>Add Book</button>
                                }
                            </td>
                        </tr>
                        {books.map(book => (
                            <tr key={book.id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.available ? 'Yes' : 'No'}</td>
                                <td>
                                    {book.cover_image && <img src={getCoverImageUrl(book.cover_image)} alt={book.title} style={{ width: '50px' }} />}
                                </td>
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
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default AdminPortal;

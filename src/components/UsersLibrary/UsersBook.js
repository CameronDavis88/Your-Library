import React, { useState } from 'react';
import axios from 'axios';
import { Typography, Button, Grid } from '@material-ui/core';
import EditBook from './EditBook';
import './UsersBook.css';

const UsersBook = (props) => {
    const { id, title, author, gutUrl, imageUrl, getBooks, displayTitle } = props;
    const [editMode, setEditMode] = useState(false);

    const deleteBook = () => {
        axios.delete(`/api/book/${id}`)
            .then(({ data }) => {
                getBooks(data);
            })
            .catch(err => console.log(err));
    };

    const BookDisplay = () => {
        return (
            <Grid className='book-box' >
                <h3 >Title: {displayTitle}</h3>
                <h3 >Author: {author}</h3>
                <div className='image-box' >
                <img alt='cover' src={imageUrl} className='cover-image'/>
                </div>
                <br />
                <button className='book-btn' onClick={() => setEditMode(true)} >Customize or Edit Book</button>
                <button className='book-btn' onClick={() => deleteBook()} >Delete Book</button>
                <br />
                <nav>
                    <a className='nav-a' href={gutUrl} >Access book for free at Project Gutenberg</a>
                </nav>
            </Grid>
        );
    };

    return (
        <Grid key={id}>
            {editMode === false ? <BookDisplay /> : <EditBook
                getBooks={() => getBooks()} title={title} author={author} imageUrl={imageUrl} id={id}
                editMode={editMode} setEditMode={setEditMode} deleteBook={deleteBook} />
            }
        </Grid>
    );
};

export default UsersBook;



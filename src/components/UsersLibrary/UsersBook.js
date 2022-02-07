import React, { useState } from 'react';
import axios from 'axios';
import { Typography, Button, Grid } from '@material-ui/core';
import EditBook from './EditBook';

const UsersBook = (props) => {
    const { id, title, author, gutUrl, imageUrl, getBooks } = props;
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
            <div>
                <h3 >Title: {title}</h3>
                <h3 >Author: {author}</h3>
                <img alt='cover' src={imageUrl} className='cover-image'/>
                <br />
                <button onClick={() => setEditMode(true)} >Customize or Edit Book</button>
                <button onClick={() => deleteBook()} >Delete Book</button>
                <br />
                <nav>
                    <a href={gutUrl} >Access book for free at Project Gutenberg</a>
                </nav>
            </div>
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



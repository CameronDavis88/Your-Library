import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

const EditBook = ({ id, title, author, imageUrl, deleteBook, setEditMode, getBooks }) => {
    const [newTitle, setNewTitle] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
    const [newImageUrl, setNewImageUrl] = useState('');

    const editBook = async () => {
        const updatedBook = {
            //If the input is empty the value of the key is the original value
            title: newTitle === '' ? title : newTitle,
            author: newAuthor === '' ? author : newAuthor,
            imageUrl: newImageUrl === '' ? imageUrl : newImageUrl,
        };
        await axios.put(`/api/book/${id}`, updatedBook)
            .then(({ data }) => {
                getBooks(data);
                setEditMode(false);
            })
            .catch(err => console.log(err));
    };

    return (
        <Grid  >
            <h3>Go ahead and customize how your book will appear in your library</h3>
            <div>
                <h4> Current Title: {title}</h4>
                <input onChange={(e) => setNewTitle(e.target.value)} placeholder='New Title' value={newTitle} />
            </div>
            <div>
                <h4>Current Author's name: {author}</h4>
                <input onChange={(e) => setNewAuthor(e.target.value)} placeholder='Edit Author(s)' value={newAuthor} />
            </div>
            <br />
            <div>
                <img alt='cover sample' src={imageUrl} className='cover-image' />
                <h4>Current Image Url: {imageUrl}</h4>
                <input onChange={(e) => setNewImageUrl(e.target.value)} placeholder='New Cover Image Url' value={newImageUrl} />
            </div>
            <br />
            <button onClick={editBook}>Submit Update</button>
            <br />
            <button onClick={() => deleteBook()} >Delete Book</button>
            <button onClick={() => setEditMode(false)}>Cancel/Go back</button>
        </Grid>
    );
};

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps)(EditBook);
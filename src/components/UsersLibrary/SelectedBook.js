import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import EditBook from './EditBook';


const SelectedBook = ({ selectedBook }, props) => {
    const [editMode, setEditMode] = useState(false);
    const { users_book_id, title, author, image_url, gut_url } = selectedBook;

    const deleteBook = () => {
        axios.delete(`/api/book/${users_book_id}`)
            .then(() => {
                props.history.push('/users_library');
            })
            .catch(err => console.log(err));
    };

    const BookDisplay = () => {
        return (
            <Grid className='book-page' >
                <h3 >Title: {title}</h3>
                <h3 >Author: {author}</h3>
                <div className='image-box' >
                    <img alt='cover' src={image_url} className='cover-image' />
                </div>
                <br />
                <button className='book-btn' onClick={() => setEditMode(true)} >Customize or Edit Book</button>
                <button className='book-btn' onClick={() => deleteBook()} >Delete Book</button>
                <button className='book-btn' onClick={() => props.history.push('/users_library')} >Back to Your Library</button>
                <br />
                <nav>
                    <a className='nav-a' href={gut_url} >Access book for free at Project Gutenberg</a>
                </nav>
            </Grid>
        );
    };

    return (
        <Grid key={users_book_id}>
            {editMode === false ? <BookDisplay /> : <EditBook
                title={title} author={author} imageUrl={image_url} id={users_book_id}
                editMode={editMode} setEditMode={setEditMode} deleteBook={deleteBook} />
            }
        </Grid>
    );
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(SelectedBook);
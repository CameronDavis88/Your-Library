import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getSelectedBook } from '../../redux/reducer';
import { Grid, Typography } from '@material-ui/core';
import './UsersBook.css';

const UsersBook = (props) => {
    const { id, author, gutUrl, imageUrl, getBooks, displayTitle, book, routeToSelectedBook } = props;

    const deleteBook = () => {
        axios.delete(`/api/book/${id}`)
            .then(({ data }) => {
                getBooks(data);
            })
            .catch(err => console.log(err));
    };

    const goToSelectedBook = () => {
        props.getSelectedBook(book);
        routeToSelectedBook();
    };

    return (
        <Grid className='book-box'  >
            <div className='book' onClick={goToSelectedBook} >
            <Typography variant='h6' >{displayTitle}</Typography>
                <Typography >By: {author}</Typography>
            <div className='image-box' >
                <img alt='cover' src={imageUrl} className='cover-image-small' />
            </div>
            </div>
            <br/>
            <nav>
                <a className='nav-a' href={gutUrl} >Read Book Here</a>
            </nav>
            <button className='book-btn' onClick={() => deleteBook()} >Delete Book</button>
        </Grid>
    );
};

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getSelectedBook })(UsersBook);



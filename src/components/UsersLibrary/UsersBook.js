import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser, clearUser, getSelectedBook } from '../../redux/reducer';
import { Grid } from '@material-ui/core';
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
            <h3 >Title: {displayTitle}</h3>
            <h3 >Author: {author}</h3>
            <div className='image-box' >
                <img alt='cover' src={imageUrl} className='cover-image-small' />
            </div>
            </div>
            <br/>
            <button className='book-btn' onClick={() => deleteBook()} >Delete Book</button>
            <br/>
            <nav>
                <a className='nav-a' href={gutUrl} >Read Book Here</a>
            </nav>
        </Grid>
    );
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getUser, clearUser, getSelectedBook })(UsersBook);



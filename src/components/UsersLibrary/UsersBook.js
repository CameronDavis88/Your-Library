import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getSelectedBook } from '../../redux/reducer';
import { Grid, Typography } from '@material-ui/core';
import '../../styles/UsersBook.css';

const UsersBook = (props) => {
    //React hook which determines the conditional rendering of the view when confirming a the deletion of a book
    const [deletingView, setDeletingView] = useState(false);
    const { id, author, gutUrl, imageUrl, getBooks, displayTitle, book, routeToSelectedBook } = props;

    //Deletes book from users books in database and repopulates page with updated library
    const deleteBook = () => {
        axios.delete(`/api/book/${id}`)
            .then(({ data }) => {
                setDeletingView(false)
                getBooks(data);
            })
            .catch(err => console.log(err));
    };

     //Sends user to the view of the page of a selected book from user's library 
    //and sends that book's data to redux state to be used SelectedBook component
    const goToSelectedBook = () => {
        props.getSelectedBook(book);
        routeToSelectedBook();
    };

    return (
        <Grid className='book-box'  >
            <div className='book' onClick={goToSelectedBook} >
                <Typography variant='h6' align="center" >{displayTitle}</Typography>
                <Typography align="center" >By: {author}</Typography>
                <div className='image-box' >
                    <img alt='cover' src={imageUrl} className='cover-image-small' />
                </div>
            </div>
            <br />
             {/* This link take the user to the page of Project Gutenberg where thy can read the full text for free */}
            <nav>
                <a className='nav-a' href={gutUrl} >Read Book Here</a>
            </nav>
            {/* Conditional rendering of confirmation of deleting book */}
            {deletingView
                ?
                <>
                    <button className='book-btn' onClick={() => deleteBook()}>Confirm Delete</button>
                    <button className='book-btn' onClick={() => setDeletingView(false)}>Cancel Delete</button>
                </>
                :
                <button className='book-btn' onClick={() => setDeletingView(true)} >Delete Book</button>
            }
        </Grid>
    );
};

//Exporting component and accessing redux material
const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getSelectedBook })(UsersBook);



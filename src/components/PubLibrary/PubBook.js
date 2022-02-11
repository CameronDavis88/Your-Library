import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Typography, Grid } from '@material-ui/core';
import { getSelectedBook } from '../../redux/reducer';
import './PubBook.css';

const PubBook = (props) => {
    //React hook for conditionally rendering a notice that a book has been added to the user's library
    const [added, setAdded] = useState(false);
    //Destructuring properties from props sent from parent PubLibrary component
    const { id, author, gutUrl, imageUrl, user, displayTitle, fullTitle, toSelectedPubBook } = props;
    //User's id number from redux
    const userId = user.user_id;
    //Creates a book object from the data of this book to be used as body in post request to server
    const newBook = {
        gutBookId: id,
        title: fullTitle,
        author: author,
        imageUrl: imageUrl,
        gutUrl: gutUrl,
    };

    //Sends newBook object above to backend which is added to the user's books in database
    const addBook = () => {
        axios.post(`/api/book/${userId}`, newBook)
            .then(() => {
                //Temporarily renders a message that the book was added to the user's library
                setAdded(true);
                setTimeout(() => {
                    setAdded(false);
                }, 2000);
            })
            .catch(err => console.log(err));
    };

    //Sends user to the view of the page of a selected book from the public library 
    //and sends that book's data to redux state to be used SelectedPubBook component
    const goToSelectedBook = () => {
        props.getSelectedBook(newBook);
        toSelectedPubBook();
    };

    return (
        <Grid key={id} className='book-box'  >
            <div className='book' onClick={goToSelectedBook} >
                <Typography className='title' align="center" variant='h6' >{displayTitle}</Typography>
                <Typography align="center" >By: {author}</Typography>
                <div className='image-box' >
                    <img alt='cover' src={imageUrl} className='cover-image-small' />
                </div>
            </div>
            <br />
            <nav>
                <a href={gutUrl} className='nav-a' ><Typography className='nav-text' variant='h6'>Read Book Here</Typography></a>
            </nav>
            {/* Renders the add book option if user is logged in and has a library to add it to */}
            {userId
                ?
                <div>
                    {added === true ?
                    // Renders brief notice that book was added in place of add book button
                        <Typography variant='h6' color='secondary' className='added'>* Book Added *</Typography>
                        :
                        <button className='book-btn' onClick={() => addBook()} >Add Book to Your Library</button>}
                </div>
                :
                <></>}
        </Grid>
    );
};

//Exporting component and accessing redux material
const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getSelectedBook })(PubBook);
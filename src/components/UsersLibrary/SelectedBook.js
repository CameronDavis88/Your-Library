//codingMuse();
import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { clearUser } from '../../redux/reducer';
import { Grid, Typography } from '@material-ui/core';
import EditBook from './EditBook';
import Navbar from '../Navbar/Navbar';

const SelectedBook = (props) => {
    //React hook that determines the conditional rendering of the view for when the user is going to edit the book's info 
    // which will be sent down through props to EditBook component
    const [editMode, setEditMode] = useState(false);
    //Destructuring properties from data for specific book from redux state
    const { users_book_id, title, author, image_url, gut_url } = props.selectedBook;

    //Deletes books from user's book in the database and sends the user back to their updated library
    const deleteBook = () => {
        axios.delete(`/api/book/${users_book_id}`)
            .then(() => {
                props.history.push('/users_library');
            })
            .catch(err => console.log(err));
    };

    //Sub-component that displays the book's information which will be conditionally rendered below
    const BookDisplay = () => {
        return (
            <main className='selected-book' >
                <Navbar props={props} className='navbar' />
                <Grid className='selected-book-page' >
                    <div className='bottom' >
                        <Typography variant='h4' align="center" >{title}</Typography>
                        <br />
                        <Typography variant='h5' align="center" >By: {author}</Typography>
                        <br />
                        <div className='image-box' >
                            <img alt='cover' src={image_url} />
                        </div>
                         {/* This link take the user to the page of Project Gutenberg where thy can read the full text for free */}
                        <nav>
                            <a className='selected-nav-a' href={gut_url} >Access book for free at Project Gutenberg</a>
                        </nav>
                    </div>
                </Grid>
            </main>
        );
    };

    return (
        <Grid key={users_book_id}>
        {/* Conditionally renders view for viewing or editing the book's information */}
            {editMode === false ? <BookDisplay /> : <EditBook
                title={title} author={author} imageUrl={image_url} id={users_book_id}
                editMode={editMode} setEditMode={setEditMode} deleteBook={deleteBook} />
            }
        </Grid>
    );
};

//Exporting component and accessing redux material
const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { clearUser })(SelectedBook);
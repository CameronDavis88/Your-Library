//codingMuse();
import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { clearUser } from '../../redux/reducer';
import { Grid, Typography } from '@material-ui/core';
import EditBook from './EditBook';
import Navbar from '../Navbar/Navbar';

const SelectedBook = (props) => {
    const [editMode, setEditMode] = useState(false);
    const { users_book_id, title, author, image_url, gut_url } = props.selectedBook;

    const deleteBook = () => {
        axios.delete(`/api/book/${users_book_id}`)
            .then(() => {
                props.history.push('/users_library');
            })
            .catch(err => console.log(err));
    };

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
            {editMode === false ? <BookDisplay /> : <EditBook
                title={title} author={author} imageUrl={image_url} id={users_book_id}
                editMode={editMode} setEditMode={setEditMode} deleteBook={deleteBook} />
            }
        </Grid>
    );
};

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { clearUser })(SelectedBook);
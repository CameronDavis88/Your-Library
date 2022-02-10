//codingMuse();
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import Navbar from '../Navbar/Navbar';
import './SelectedPubBook.css';

const SelectedPubBook = (props) => {
    const { title, author, gutUrl, imageUrl } = props.selectedBook;

    return (
        <main className='selected-book' >
             <Navbar props={props} className='navbar' />
            <Grid className='selected-book-page' >
                <div className='bottom' >
                <Typography variant='h4' >{title}</Typography>
                <br/>
                <Typography variant='h5' >By: {author}</Typography>
                <br/>
                <div className='image-box' >
                    <img alt='cover' src={imageUrl}/>
                </div>
                <nav>
                    <a className='selected-nav-a' href={gutUrl} >Access book for free at Project Gutenberg</a>
                </nav>
                </div>
            </Grid>
        </main>
    );
};

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps)(SelectedPubBook);
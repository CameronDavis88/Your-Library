import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import Navbar from '../Navbar/Navbar';



const SelectedPubBook = (props) => {
    const { title, author, gutUrl, imageUrl } = props.selectedBook;

    return (
        <main className='selected-book' >
             <Navbar props={props} className='navbar' />
            <Grid className='book-page' >
                <h3 >Title: {title}</h3>
                <h3 >Author: {author}</h3>
                <div className='image-box' >
                    <img alt='cover' src={imageUrl} className='cover-image' />
                </div>
                <br />
                <button className='book-btn' onClick={() => props.history.push('/')} >Back to Public Library</button>
                <br />
                <nav>
                    <a className='nav-a' href={gutUrl} >Access book for free at Project Gutenberg</a>
                </nav>
            </Grid>
        </main>

    );
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(SelectedPubBook);
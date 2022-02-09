import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getUser, clearUser, getSelectedBook } from '../../redux/reducer';
import { Grid } from '@material-ui/core';



const SelectedPubBook = (props) => {
    const { title, author, gutUrl, imageUrl } = props.selectedBook;

    return (
        <Grid className='book-page' >
        <h3 >Title: {title}</h3>
        <h3 >Author: {author}</h3>
        <div className='image-box' >
        <img alt='cover' src={imageUrl} className='cover-image'/>
        </div>
        <br />
        <button className='book-btn' onClick={() => props.history.push('/users_library')} >Back to Your Library</button>
        <br />
        <nav>
            <a className='nav-a' href={gutUrl} >Access book for free at Project Gutenberg</a>
        </nav>
    </Grid>
    );
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getUser, clearUser, getSelectedBook })(SelectedPubBook);
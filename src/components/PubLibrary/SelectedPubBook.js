//codingMuse();
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import Navbar from '../Navbar/Navbar';
import '../../styles/SelectedPubBook.css';

const SelectedPubBook = (props) => {
    //Destructuring properties from data for specific book from redux state
    const { title, author, gutUrl, imageUrl } = props.selectedBook;

    //Renders the information from the book's data
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
                        <img alt='cover' src={imageUrl} />
                    </div>
                    {/* This link take the user to the page of Project Gutenberg where thy can read the full text for free */}
                    <nav>
                        <a className='selected-nav-a' href={gutUrl} >Access book for free at Project Gutenberg</a>
                    </nav>
                </div>
            </Grid>
        </main>
    );
};

//Exporting component and accessing redux material
const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps)(SelectedPubBook);
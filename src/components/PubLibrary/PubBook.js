import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Typography, Button, Grid } from '@material-ui/core';



const PubBook = (props) => {
    const { id, title, author, gutUrl, imageUrl, user } = props;
    const userId = user.user_id;

    const [added, setAdded] = useState(false);

    const addBook = () => {
        const newBook = {
            gutBookId: id,
            title: title,
            author: author,
            imageUrl: imageUrl,
            gutUrl: gutUrl,
        };

        axios.post(`/api/book/${userId}`, newBook)
            .then(() => {
                // alert(`${title} has been added to you library!`)
                setAdded(true);
                setTimeout(() => {
                    setAdded(false);
                }, 2000)
            })
            .catch(err => console.log(err));
    };

    return (
        <Grid key={id} heigh='sm' >
            <div>
                <h3 >Title: {title}</h3>
                <h3 >Author: {author}</h3>
                <img alt='cover' src={imageUrl} className='cover-image' />
            </div>
            {userId
                ?
                <>
                    {added === true ? 
                    <Typography variant='h6' color='secondary' className='added'>* Book Added *</Typography> 
                    : 
                    <Button onClick={() => addBook()} >Add Book to Your Library</Button>}
                </>
                :
                <></>}
            <nav>
                <a href={gutUrl} >Read this for free at Project Gutenberg</a>
            </nav>
        </Grid>
    );
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(PubBook);
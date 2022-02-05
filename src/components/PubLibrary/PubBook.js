import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';


const PubBook = (props) => {
    const { id, title, author, gutUrl, imageUrl, user } = props;
    const userId = user.user_id;

    const addBook = () => {
        const newBook = {
            gutBookId: id,
            title: title,
            author: author,
            imageUrl: imageUrl,
            gutUrl: gutUrl,
        };

        axios.post(`/api/book/${userId}`, newBook)
            .then(() => alert(`${title} has been added to you library!`))
            .catch(err => console.log(err));
    };

    return (
        <section key={id}>
            <div>
                <h3 >Title: {title}</h3>
                <h3 >Author: {author}</h3>
                <img alt='cover' src={imageUrl} />
            </div>
            {userId ? <button onClick={() => addBook()} >Add Book to Your Library</button> : <></>}
            <nav>
                <a href={gutUrl} >Read this for free at Project Gutenberg</a>
            </nav>
        </section>
    );
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(PubBook);
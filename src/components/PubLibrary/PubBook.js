import React from 'react';
import axios from 'axios';
import { getUsersBooks } from '../../../server/controllers/controllers';

const PubBook = (props) => {
    const { id, title, author, gutUrl, hideAddMode, imageUrl } = props

    const addBook = () => {
        const newBook = {
            gutBookId: id,
            title: title,
            author: author,
            imageUrl: imageUrl,
            gutUrl: gutUrl,

        };

        JSON.stringify(newBook);
                // --userId here is coming from redux!
        axios.post(`/api/book/${userId}`, newBook)
            .then(({ data }) => {
                //probably dont need to do this because the book added goes to another view,
                // the usersLibrary and when that component is updated it will have that added book
                // getBooks();
                console.log(`Data from added book: ${data}`)
            })
            .catch(err => console.log(err))
    };


    return (
        <section key={id}>
            <div>
                <h3 >Title: {title}</h3>
                <h3 >Author: {author}</h3>
                <img alt='cover' src={imageUrl} />
            </div>

            {/* <button onClick={() => this.deleteBook(id)} >Delete Book</button> ----- which is not for here but in UsersBook! */}
            <button onClick={() => addBook(id)} >Add Book to Your Library</button>
            <nav>
                <a href={gutUrl} >Access book for free at Project Gutenberg</a>
            </nav>
        </section>
    )
};

export default PubBook;

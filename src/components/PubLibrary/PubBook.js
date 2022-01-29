import React from 'react';
import axios from 'axios';

const PubBook = (props) => {
    const { id, title, authors, formats, url } = props

    const addBook = () => {
        // const { hideAddMode } = this.props;

        const body = {
            id: id,
            title: title,
            authors: authors,
            formats: formats,
        };

        JSON.stringify(body);

        axios.post(`/api/book`, body)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    };


    return (
        <section key={id}>
            <div>
                <h3 >Title: {title}</h3>
                <h3 >Author: {authors[0].name}</h3>
                <img alt='cover' src={formats["image/jpeg"]} />
            </div>

            {/* <button onClick={() => this.deleteBook(id)} >Delete Book</button> ----- which is not for here but in UsersBook! */}
            <button onClick={() => addBook(id)} >Add Book to Your Library</button>
            <nav>
                <a href={url} >Access book for free at Project Gutenberg</a>
            </nav>
        </section>
    )
};

export default PubBook;

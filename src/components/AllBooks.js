import React, { useEffect, useState} from 'react';
import axios from 'axios';
import EditBook from './EditBook';

//This is when you will need to do the actual conditional rendering for if you have the add button or not

const AllBooks = ({ books }) => {

    const deleteBook = (id) => {
        axios.delete(`/api/book/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    };

    return (
        <div>
            {books.map(book => {
                const { id, title, authors, } = book;
                const url = book.formats["text/html"]
                return (
                    <section key={id} >
                        <div>
                            <h3 >Title: {title}</h3>
                            <h3 >Author: {authors[0].name}</h3>
                            <img alt='cover' src={book.formats["image/jpeg"]} />
                        </div>
                        <button onClick={() => this.deleteBook(id)} >Delete Book</button>
                        <EditBook
                            id={id}
                        />
                        {/* Set up a conditional rendering that only links to gutenberg if it came from them and not if user created it 
                    --maybe let them search the gutenberg library to see if the book they created is already in gutenberg */}
                        <nav>
                            <a href={url} >Access book for free at Project Gutenberg</a>
                        </nav>
                    </section>
                )
            })}
        </div>
    )

};

export default AllBooks;

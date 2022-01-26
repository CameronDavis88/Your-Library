import React from 'react';
import axios from 'axios';
import EditBook from './EditBook';

export default class AllBooks extends React.Component {
  
    deleteBook = (id) => {
        axios.delete(`/api/book/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    render() {
        const { books } = this.props;
        const mappedBooks = books.map(book => {
            const { id, title, authors, } = book;
            const url = book.formats["text/html"]
            return (
                <section key={id} >
                    <div>
                        <h3 >Title: {title}</h3>
                        <h3 >Author: {authors[0].name}</h3>
                        <img  alt='cover' src={book.formats["image/jpeg"]} />
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
        })
        return (
            <div>
                {mappedBooks}
            </div>
        )
    }
}
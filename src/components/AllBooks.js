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
            const { isbn, title, author, pages } = book;
            return (
                <section key={isbn} >
                    <div>
                    <h3 >Title: {title}</h3>
                    <h3 >Author: {author}</h3>
                    <h3 >Number of pages: {pages}</h3>
                    </div>
                    <button onClick={() => this.deleteBook(isbn)} >Delete Book</button>   
                    <EditBook 
                    isbn={isbn} 
                    />
        
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
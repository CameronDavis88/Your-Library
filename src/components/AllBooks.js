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
            return (
                <section key={id} >
                    <div>
                        <h3 >Title: {title}</h3>
                        <h3 >Author: {authors[0].name}</h3>
                    </div>
                    <button onClick={() => this.deleteBook(id)} >Delete Book</button>
                    <EditBook
                        id={id}
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
import React from 'react';
import axios from 'axios';
import EditBook from './EditBook'
import './AllBooks.css';

export default class AllBooks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 0,
        }
    }
 
    // deleteBook(){
    //     const {id} = this.state;
    //     axios.delete(`/api/book/:${id}`)
    // }

    render() {
        const { books} = this.props
        const mappedBooks = books.map(book => {
            const { isbn, title, author, pages } = book;
            // this.setState({id:isbn})
            return (
                <section key={isbn} >
                {/* <button onClick={this.deleteBook} >Delete Book</button>    */}
                    <h3 >Title: {title}</h3>
                    <h3 >Author: {author}</h3>
                    <h3 >Number of pages: {pages}</h3>
                    <EditBook/>
                </section>
            )
        })
        return (
            <div>
                <main>{mappedBooks}</main>
            </div>
        )
    }

}
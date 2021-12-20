import React from 'react';
import axios from 'axios';
import EditBook from './EditBook'
import './AllBooks.css';

export default class AllBooks extends React.Component {
    constructor(props) {
        super(props)
      
    }

//hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
//I think because I put the state in the parent now the all of the inputs are changing as you
//type into one box. On monday put state back into the child etc etc etc
//hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh



    


    deleteBook = (id) => {
        axios.delete(`/api/book/${id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

   

    render() {
        const { books } = this.props
        const mappedBooks = books.map(book => {
            const { isbn, title, author, pages } = book;
            return (
                <section key={isbn} >
                    {/* this is how you pass in the data from the specific element as it is mapped */}
                    <button onClick={() => this.deleteBook(isbn)} >Delete Book</button>   
                    <h3 >Title: {title}</h3>
                    <h3 >Author: {author}</h3>
                    <h3 >Number of pages: {pages}</h3>
                    <EditBook 
                    isbn={isbn}
                        />
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
import React from "react";
import axios from 'axios';

export default class AddBook extends React.Component {
    constructor(){
        super();
        this.state = {
            title: '',
            author: '',
            pages: '',
            isbn: 0,
        }

    }
    
    addBook = (title, author, pages, isbn) => {
        const newBook = this.props.books
    }

    render(){
    const {title, author, pages} = this.state
    
        return(
            <section>
                <h2>Add book to list here</h2>
            <input placeholder="Title" value={title} />
            <input placeholder="Author" value={author} />
            <input placeholder="Number of Pages" value={pages} />
            <input placeholder="isbn number" />
            <button>Add Now</button>
          </section> 
        )
    }
}
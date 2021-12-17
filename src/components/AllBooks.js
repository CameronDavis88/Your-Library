import React from 'react';
import axios from 'axios';
import './AllBooks.css';

export default class AllBooks extends React.Component {
    constructor(){
        super()
        this.state = {
            books :[],
        }
    }
    componentDidMount(){
        axios.get(`/api/books`)
        //data is destructured here from res, as if saying res.data
        //then the data is being sent to state in the books array
        .then(({ data }) => this.setState({books : data}))
        .catch(err => console.log(err))
      }
    
      render(){
        const {books} = this.state;
        const mappedBooks = books.map(book =>{
          const {isbn, title, author, website, pages} = book;
          return(
            <section key={isbn}>
              <h3 >Title: {title}</h3>
              <h3 >Author: {author}</h3>
              <h3 >Number of pages: {pages}</h3>
              <h3 >Website: {website}</h3>
              <button>Edit Book</button>
              <button>Delete Book</button>
              <br/>
    
              </section>
          
    
          )
        })
       return (
        <div>
            <h1>Full Booklist:</h1>
            <main>{mappedBooks}</main>
        </div>
       )
      }

}
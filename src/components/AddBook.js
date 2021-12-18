import axios from "axios";
import React from "react";

export default class AddBook extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            author: '',
            pages: 0,
            isbn: 0,
        }

    }
    
    
    handleTitleInput = (e) => this.setState({title: e.target.value})
    handleAuthorInput = (e) => this.setState({author: e.target.value})
    handlePagesInput = (e) => this.setState({pages: e.target.value})
    handleIsbnInput = (e) => this.setState({isbn: e.target.value})
    
    addBook = () =>{
        const {title, author, pages, isbn} = this.state
         const newBook = {
               "isbn":isbn,
               "title": title,
               "author": author,
               "pages":pages, 
       }
       axios.post(`/api/book`, {newBook})
         }

    render(){
    
        return(
            <section>
                <h2>Add book to list here</h2>
            <input onChange={this.handleTitleInput} placeholder="Title" />
            <input onChange={this.handleAuthorInput} placeholder="Author"  />
            <input onChange={this.handlePagesInput} placeholder="Number of Pages"  />
            <input onChange={this.handleIsbnInput} placeholder="isbn number" />
            <button onClick={this.addBook} >Add Now</button>
          </section> 
        )
    }
}
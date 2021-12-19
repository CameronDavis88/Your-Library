import React from 'react';
import axios from 'axios';
import EditBook from './EditBook'
import './AllBooks.css';

export default class AllBooks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newTitle: '',
            newAuthor: '',
            newPages: '',
            newIsbn: '',
            id: '',
        }
    }

//hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
//I think because I put the state in the parent now the all of the inputs are changing as you
//type into one box. On monday put state back into the child etc etc etc
//hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh



    updateBook = (id) => {
        const { newTitle, newAuthor, newPages, newIsbn } = this.state
        const body = {
            title: newTitle,
            author: newAuthor,
            pages: newPages,
            // isbn: id,
        }
        // this.setState({
        //     newTitle: '',
        //     newAuthor: '',
        //     newPages: '',
        //     newIsbn: '',
        // })
        JSON.stringify(body)
        axios.post(`/api/book/${id}`, body)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }


    // deleteBook(){
    //     const {id} = this.state;
    //     axios.delete(`/api/book/:${id}`)
    // }

    handleTitleInput = (e) => this.setState({ newTitle: e.target.value })
    handleAuthorInput = (e) => this.setState({ newAuthor: e.target.value })
    handlePagesInput = (e) => this.setState({ newPages: e.target.value })

    render() {
        const { books } = this.props
        const { newTitle, newAuthor, newPages, } = this.state;
        const mappedBooks = books.map(book => {
            const { isbn, title, author, pages } = book;
            return (
                <section key={isbn} >
                    {/* <button onClick={this.deleteBook} >Delete Book</button>    */}
                    <h3 >Title: {title}</h3>
                    <h3 >Author: {author}</h3>
                    <h3 >Number of pages: {pages}</h3>
                    <EditBook 
                        updateBook={this.updateBook }
                        handleTitleInput={this.handleTitleInput}
                        handleAuthorInput={this.handleAuthorInput}
                        handlePagesInput={this.handlePagesInput}
                        newTitle={newTitle}
                        newAuthor={newAuthor}
                        newPages={newPages}
                        // newIsbn={newIsbn} 
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
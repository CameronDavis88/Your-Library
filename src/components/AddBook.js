import axios from "axios";
import React from "react";

export default class AddBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            pages: '',
            isbn: '',
        }

    }


    handleTitleInput = (e) => this.setState({ title: e.target.value })
    handleAuthorInput = (e) => this.setState({ author: e.target.value })
    handlePagesInput = (e) => this.setState({ pages: e.target.value })
    handleIsbnInput = (e) => this.setState({ isbn: e.target.value })

    addBook = () => {
        const { title, author, pages, isbn } = this.state
        const body = {
            isbn,
            title,
            author,
            pages,

        }
        JSON.stringify(body)
        this.setState({
            title: '',
            author: '',
            pages: '',
            isbn: '',
        })
        axios.post(`/api/book`, body)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    render() {
        const { title, author, pages, isbn } = this.state
        return (
            <section>
                <h2>Add book to list here</h2>
                <input onChange={this.handleTitleInput} value={title} placeholder="Title"/>
                <input onChange={this.handleAuthorInput} value={author} placeholder="Author"/>
                <input onChange={this.handlePagesInput} value={pages} placeholder="Number of Pages"/>
                <input onChange={this.handleIsbnInput} value={isbn} placeholder="isbn Number"/>
                <button onClick={this.addBook} >Add Now</button>
            </section>
        )
    }
}
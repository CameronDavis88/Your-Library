import React from "react";
import axios from "axios";

//A lot of this is not what I need it for anymore! This will not add a new book but will just send the GutenBerg book id to the database

export default class AddBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            id: '',
            // imageUrl: '',
        }
    };

    handleTitleInput = (e) => this.setState({ title: e.target.value });
    handleAuthorInput = (e) => this.setState({ author: e.target.value });
    handleIsbnInput = (e) => this.setState({ id: e.target.value });

    addBook = () => {
        const { title, author, id } = this.state;
        const { hideAddMode } = this.props;

        const body = {
            id,
            title,
            authors: [
                { name: author }
            ],
            // imageUrl: '',
        }

        JSON.stringify(body);
        this.setState({
            title: '',
            author: '',
            id: '',
            // imageUrl: '',
        })
        if (id, title, author) {
            hideAddMode();
            axios.post(`/api/book`, body)
                .then(res => console.log(res))
                .catch(err => console.log(err))
        } else {
            //
            alert('Please fill in all values');
        }
    };

    render() {
        const { title, author, pages, id } = this.state;
        return (
            <div>
                <h2>Add book to list here</h2>
                <input onChange={this.handleTitleInput} value={title} placeholder="Title" />
                <input onChange={this.handleAuthorInput} value={author} placeholder="Author" />
                <input onChange={this.handleIsbnInput} value={id} placeholder="id Number" />
                <button onClick={this.addBook} >Add Now</button>
                <button onClick={this.props.hideAddMode} >Cancel</button>
            </div>
        )
    }
};
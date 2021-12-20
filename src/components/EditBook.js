import React from 'react';
import axios from 'axios';

export default class EditBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newTitle: '',
            newAuthor: '',
            newPages: '',
        }
    }
    handleTitleInput = (e) => this.setState({ newTitle: e.target.value })
    handleAuthorInput = (e) => this.setState({ newAuthor: e.target.value })
    handlePagesInput = (e) => this.setState({ newPages: e.target.value })

    updateBook = (id) => {
        const { newTitle, newAuthor, newPages, } = this.state
        const body = {
            title: newTitle,
            author: newAuthor,
            pages: newPages,
        }
        JSON.stringify(body)
        this.setState({
            newTitle: '',
            newAuthor: '',
            newPages: '',
        })
        axios.post(`/api/book/${id}`, body)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    render() {
        const { newTitle, newAuthor, newPages, } = this.state;
        const { isbn } =this.props

        return (
            <div>
                <input onChange={this.handleTitleInput} placeholder='Edit Title Here' value={newTitle} />
                <input onChange={this.handleAuthorInput} placeholder='Edit Author Here' value={newAuthor} />
                <input onChange={this.handlePagesInput} placeholder='Edit # of Pages Here' value={newPages} />
                {/* this is how you pass in the data from the specific element as it is mapped */}
                <button onClick={() => this.updateBook(isbn)}>Update Book</button>
            </div>
        )
    }
}
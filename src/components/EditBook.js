import React from 'react';
import axios from 'axios';

export default class EditBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newTitle: '',
            newAuthor: '',
            newPages: '',
            editMode: false,
        }
    }

    handleTitleInput = (e) => this.setState({ newTitle: e.target.value });
    handleAuthorInput = (e) => this.setState({ newAuthor: e.target.value });
    handlePagesInput = (e) => this.setState({ newPages: e.target.value });

    hideEditMode = () => {
        this.setState({ editMode: false })
    }

    displayEditMode = () => {
        this.setState({ editMode: true })
    }

    updateBook = (id) => {
        const { newTitle, newAuthor, newPages, } = this.state;
        const body = {
            title: newTitle,
            author: newAuthor,
            pages: newPages,
        }
        JSON.stringify(body);
        this.setState({
            newTitle: '',
            newAuthor: '',
            newPages: '',
        })
            this.hideEditMode();
            axios.put(`/api/book/${id}`, body)
                .then(res => console.log(res))
                .catch(err => console.log(err))
    }

    render() {
        const { newTitle, newAuthor, newPages, } = this.state;
        const { isbn } = this.props
        return (
            <div>
                {this.state.editMode === false
                    ?
                    <button onClick={this.displayEditMode}>Edit Book Info</button>
                    :
                    <div>
                        <input onChange={this.handleTitleInput} placeholder='Edit Title Here' value={newTitle} />
                        <input onChange={this.handleAuthorInput} placeholder='Edit Author Here' value={newAuthor} />
                        <input onChange={this.handlePagesInput} placeholder='Edit # of Pages Here' value={newPages} />
                        <button onClick={() => this.updateBook(isbn)}>Update Book</button>
                        <button onClick={this.hideEditMode}>Cancel</button>
                    </div>
                }
            </div>
        )
    }
}
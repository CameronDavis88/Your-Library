import React from 'react';

export default class EditBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newTitle: '',
            newAuthor: '',
            newPages: '',
        }
    }
    handleTitleInput = (e) => this.setState({newTitle: e.target.value})
    handleAuthorInput = (e) => this.setState({newAuthor: e.target.value})
    handlePagesInput = (e) => this.setState({newPages: e.target.value})
    

    render() {
        const { newTitle, newAuthor, newPages } = this.state;

        return (
            <div>
                <input onChange={this.handleTitleInput} placeholder='Edit Title Here' value={newTitle} />
                <input onChange={this.handleAuthorInput} placeholder='Edit Author Here' value={newAuthor} />
                <input onChange={this.handlePagesInput} placeholder='Edit # of Pages Here' value={newPages} />
                <button>Update Book</button>
            </div>
        )
    }
}
import React from 'react';

export default class EditBook extends React.Component {
    constructor() {
        super();
        this.state = {
            newTitle: '',
            newAuthor: '',
            newPages: '',
        }
    }

    render() {
        const { newTitle, newAuthor, newPages } = this.state;

        return (
            <div>
                <input placeholder='Edit Title Here' value={newTitle} />
                <input placeholder='Edit Author Here' value={newAuthor} />
                <input placeholder='Edit # of Pages Here' value={newPages} />
                <button>Update Book</button>
            </div>
        )
    }
}
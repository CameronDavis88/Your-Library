import React from 'react';

export default class EditBook extends React.Component {
    constructor(props) {
        super(props);

    }




    render() {
        const {
            newTitle,
            newIsbn,
            newAuthor,
            newPages,
            handleAuthorInput,
            handlePagesInput,
            handleTitleInput,
            updateBook,
        } = this.props;

        return (
            <div>
                <input onChange={handleTitleInput} placeholder='Edit Title Here' value={newTitle} />
                <input onChange={handleAuthorInput} placeholder='Edit Author Here' value={newAuthor} />
                <input onChange={handlePagesInput} placeholder='Edit # of Pages Here' value={newPages} />
                <button onClick={updateBook}>Update Book</button>
            </div>
        )
    }
}
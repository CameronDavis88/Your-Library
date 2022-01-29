import React from 'react';

{/* <EditBook id={id}/> */ }





// getUsersBooks method -- sends request to server then to db
// editBook method -- sends request to server then to db
// deleteBook method -- sends request to server then to db


const UsersBook = (props) => {
    const { id, title, author, gutUrl, getBooks, imageUrl, getBooks, usersBookId} = props

    const editBook = () => {
        // const { hideAddMode } = this.props;

       // ---userId is coming from redux!---
        const userId = props.user.user_id;

        //You havent set up the inputs and all that yet that actually makes the values below-- its wrong!!!
        //this would litterally just update it to exactly what it was before!!!!
        const updatedBook = {
            //when you create this part of the inputs make the assigning the values of these
            // "updatedBlank" variables be conditionally assigned: 
            //  if there was not input then it is just what it was ex: title, author, imageUrl etc
            // if there was an input value then "updatedBlank" is that value
            title: updatedTitle,
            author: updatedAuthor,
            imageUrl: updatedImageUrl,
           //sql query only updates these vales and leave the others untouched
        };

        JSON.stringify(updatedBook);
        axios.put(`/api/book/${usersBookId}`, updatedBook)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    };

    const deleteBook = () => {
        axios.delete(`/api/book/${usersBookId}`)
            .then(() => getBooks())
            .catch(err => console.log(err))
    };

    return (
        <section key={id}>
            <div>
                <h3 >Title: {title}</h3>
                <h3 >Author: {authors[0].name}</h3>
                <img alt='cover' src={gutUrl} />
            </div>

            {/* <button onClick={() => this.deleteBook(id)} >Delete Book</button> ----- which is not for here but in UsersBook! */}
            <button onClick={() => editBook()} >Update Book</button>
            <button onClick={() => deleteBook()} >Update Book</button>

            <nav>
                <a href={url} >Access book for free at Project Gutenberg</a>
            </nav>
        </section>
    )
};

export default UsersBook;



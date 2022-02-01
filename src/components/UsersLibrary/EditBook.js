import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const EditBook = ({ title, author, imageUrl, usersBookId, deleteBook, setEditMode, user  }) => {
   const [newTitle, setNewTitle] = useState('');
   const [newAuthor, setNewAuthor] = useState('');
   const [newImageUrl, setNewImageUrl] = useState('');
//    const [editMode, setEditMode] = useState(false);

//if this conditional assigning of NewTitle newAuthor and newImageUrl works see if you can just put every thing after the = into the onClick below
const handleTitleInput = (e) => setNewTitle(e ? e.target.value : title);
const   handleAuthorInput = (e) => setNewAuthor(e ? e.target.value : author);
const   handleImageUrlInput = (e) => setNewImageUrl(e ? e.target.value : imageUrl);

    // handleTitleInput = (e) => setNewTitle(e.target.value);
    // handleAuthorInput = (e) => setNewAuthor(e.target.value);
    // handleImageUrlInput = (e) => setNewImageUrl(e.target.value);
   
    const editBook = () => {
       // ---userId is coming from redux!---
        // const userId = user.user_id;

        const updatedBook = {
            //Only updates these vales will be updated in the sql query and the others will remain untouched
            title: newTitle,
            author: newAuthor,
            imageUrl: newImageUrl,
        };

        JSON.stringify(updatedBook);
        axios.put(`/api/book/${usersBookId}`, updatedBook)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    };
   
        return (
            <div>
                {this.state.editMode === false
                    ?
                    <button onClick={this.displayEditMode}>Edit Book Info</button>
                    :
                    <div>
                        <input onChange={handleTitleInput} placeholder={title} value={newTitle} label='Title' />
                        <input onChange={handleAuthorInput} placeholder={author} value={newAuthor} label='Author(s)'/>
                        <input onChange={handleImageUrlInput} placeholder={imageUrl} value={newImageUrl} label='Image Url'/>

                        {/* If the conditional value assigning does not work in the input handle functions -- try using this below
                        <input onChange={handleTitleInput} placeholder='Edit Title' value={newTitle === '' ? title : newTitle}/>
                        <input onChange={handleAuthorInput} placeholder='Edit Author(s)' value={newAuthor === '' ? author : newAuthor}/>
                        <input onChange={handleImageUrlInput} placeholder='Edit Image Url' value={newImageUrl === '' ? imageUrl: newImageUrl}/> */}

                        <button onClick={editBook}>Submit Update</button>
                        <button onClick={deleteBook} >Delete Book</button>
                        <button onClick={() => setEditMode(false)}>Cancel/Go back</button>
                    </div>
                }
            </div>
        )
};

const mapStateToProps = (reduxState) => reduxState;

    export default connect(mapStateToProps)(EditBook);
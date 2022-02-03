import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
// import { updateBook } from '../../../server/controllers/mainControllers';

const EditBook = ({ id, title, author, imageUrl, usersBookId, deleteBook, setEditMode, editMode, getBooks }) => {
   const [newTitle, setNewTitle] = useState('');
   const [newAuthor, setNewAuthor] = useState('');
   const [newImageUrl, setNewImageUrl] = useState('');
//    const [editMode, setEditMode] = useState(false);

//if this conditional assigning of NewTitle newAuthor and newImageUrl works see if you can just put every thing after the = into the onClick below
// const handleTitleInput = (e) => setNewTitle(e ? e.target.value : title);
// const   handleAuthorInput = (e) => setNewAuthor(e ? e.target.value : author);
// const   handleImageUrlInput = (e) => setNewImageUrl(e ? e.target.value : imageUrl);

//    const  handleTitleInput = (e) => setNewTitle(e.target.value);
//    const  handleAuthorInput = (e) => setNewAuthor(e.target.value);
//     const handleImageUrlInput = (e) => setNewImageUrl(e.target.value);
   
    const editBook = async () => {
        const updatedBook = {
            //If the input is empty the value of the key is the original value
            title: newTitle === '' ? title : newTitle,
            author: newAuthor === '' ? author : newAuthor,
            imageUrl: newImageUrl === '' ? imageUrl : newImageUrl,
        };
       await axios.put(`/api/book/${id}`, updatedBook)
            .then(({ data }) => {
                getBooks(data);
                setEditMode(false);
            })
            .catch(err => console.log(err))
    };

    useEffect(() => {
        console.log(newTitle)
        console.log(newAuthor)
    })
   
        return (
            <div>
              
                    <div>
                        <input onChange={(e) => setNewTitle(e.target.value)} placeholder='New Title' value={newTitle} />
                        <input onChange={(e) => setNewAuthor(e.target.value)} placeholder='Edit Author(s)' value={newAuthor} />
                        <input onChange={(e) => setNewImageUrl(e.target.value)} placeholder='New Cover Image Url' value={newImageUrl} />

                        {/* If the conditional value assigning does not work in the input handle functions -- try using this below
                        <input onChange={handleTitleInput} placeholder='Edit Title' value={newTitle === '' ? title : newTitle}/>
                        <input onChange={handleAuthorInput} placeholder='Edit Author(s)' value={newAuthor === '' ? author : newAuthor}/>
                        <input onChange={handleImageUrlInput} placeholder='Edit Image Url' value={newImageUrl === '' ? imageUrl: newImageUrl}/> */}

                        {/* <input onChange={handleTitleInput} placeholder={title} value={newTitle === '' ? title : newTitle}/>
                        <input onChange={handleAuthorInput} placeholder={author} value={newAuthor === '' ? author : newAuthor}/>
                        <input onChange={handleImageUrlInput} placeholder={imageUrl} value={newImageUrl === '' ? imageUrl: newImageUrl}/> */}

                        <button onClick={editBook}>Submit Update</button>
                        <button onClick={() => deleteBook()} >Delete Book</button>
                        <button onClick={() => setEditMode(false)}>Cancel/Go back</button>
                    </div>
                
            </div>
        )
};

const mapStateToProps = (reduxState) => reduxState;

    export default connect(mapStateToProps)(EditBook);
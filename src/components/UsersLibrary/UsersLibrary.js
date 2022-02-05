import React, { useEffect, useState } from 'react';
import UsersBook from './UsersBook';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser, clearUser } from '../../redux/reducer';
import Navbar from '../Navbar/Navbar';

const UsersLibrary = (props) => {
    const userId = props.user.user_id;
    const { username } = props.user;
    const [books, setBooks] = useState([]);
    const [authorSearch, setAuthorSearch] = useState('');
    const [titleSearch, setTitleSearch] = useState('');

    const searchFn = async () => {
        const userId = props.user.user_id;
        if (authorSearch !== '' && titleSearch !== '') {
            await axios.get(`/api/books/${userId}/search_title/${titleSearch}/search_author/${authorSearch}`)
                .then(({ data }) => {
                    setBooks(data);
                })
                .catch((err) => console.log(err));
        } else if (authorSearch !== '' && titleSearch === '') {
            await axios.get(`/api/books/${userId}/search_author/${authorSearch}`)
                .then(({ data }) => {
                    setBooks(data);
                })
                .catch((err) => console.log(err));
        } else if (titleSearch !== '' && authorSearch === '') {
            await axios.get(`/api/books/${userId}/search_title/${titleSearch}`)
                .then(({ data }) => {
                    setBooks(data);
                })
                .catch((err) => console.log(err));
        } else {
            alert('Search values are empty');
        };
    };

    const getBooks = async () => {
        const userId = props.user.user_id;
        await axios.get(`/api/books/${userId}`)
            .then(({ data }) => {
                setBooks(data);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        getBooks()
    }, []);

    useEffect(() => {
        getBooks()
    }, [userId]);

    const mappedBooks = books.map((book) => {
        const { users_book_id, title, author, image_url, gut_url } = book;
        return <UsersBook key={users_book_id} id={users_book_id} title={title}
         author={author} gutUrl={gut_url} imageUrl={image_url} setBooks={setBooks} getBooks={getBooks} />
    });

    return (
        <div>
            <Navbar props={props} />
            <h1>Welcome to {username}'s Library!</h1>
            {!books[0]
                ?
                <div>
                    <h2>Your Library is currently empty, to add some visit the Public Library</h2>
                    <br />
                    <button onClick={() => props.history.push('/')} >Go to Public Library</button>
                </div>
                :
                <div>
                    <h4>--Search for books in your library by title or author--</h4>
                    <input onChange={(e) => setAuthorSearch(e.target.value)} placeholder="Author's name" value={authorSearch} type='text' />
                    <input onChange={(e) => setTitleSearch(e.target.value)} placeholder="Book Title" value={titleSearch} type='text' />
                    <br />
                    <button onClick={searchFn}> Search </button>
                    <br />
                    <h3>Your Books</h3>
                    <br />
                    {mappedBooks}
                </div>}
        </div>
    );
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getUser, clearUser })(UsersLibrary);

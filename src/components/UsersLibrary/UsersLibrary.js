import React, { useEffect, useState } from 'react';
import UsersBook from './UsersBook';
import axios from 'axios';
import { connect } from 'react-redux';
import { clearUser } from '../../redux/reducer';
import { Typography, Grid } from '@material-ui/core';
import Navbar from '../Navbar/Navbar';
import './UsersLibrary.css';

const UsersLibrary = (props) => {
    const userId = props.user.user_id;
    const { username } = props.user;
    const [books, setBooks] = useState([]);
    const [authorSearch, setAuthorSearch] = useState('');
    const [titleSearch, setTitleSearch] = useState('');
    const [searchView, setSearchView] = useState(false);

    const getBooks = async () => {
        const userId = props.user.user_id;
        await axios.get(`/api/books/${userId}`)
            .then(({ data }) => {
                setBooks(data);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        getBooks();
    }, [userId]);

    const routeToSelectedBook = () => {
        props.history.push('/selected_book')
    };

    const mappedBooks = books.map((book) => {
        const { users_book_id, title, author, image_url, gut_url } = book;
        let displayTitle = title;
        if (displayTitle[51]) {
            let newTitle = displayTitle.slice(0, 50);
            let titleArr = Array.from(newTitle);
            titleArr.push('...');
            let finalTitle = ``;
            titleArr.forEach((character) => {
                finalTitle = finalTitle + `${character}`
                return finalTitle
            });
            displayTitle = finalTitle
        };
        return <UsersBook key={users_book_id} id={users_book_id} displayTitle={displayTitle} fullTitle={title} routeToSelectedBook={routeToSelectedBook}
            author={author} gutUrl={gut_url} imageUrl={image_url} setBooks={setBooks} getBooks={getBooks} book={book} />
    });

    const searchFn = async () => {
        setSearchView(true);
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

    const exitSearch = () => {
        getBooks();
        setSearchView(false);
    };

    return (
        <main className='users-library'>
            <Navbar props={props} className='navbar' />
            <Grid className='page' >
                <div>
                    <Typography variant='h2' >Welcome to Your Library, {username}!</Typography>
                </div>
                {!books[0]
                    ?
                    <Grid className='lib-box' >
                        {searchView === true
                            ?
                            <div>
                                <h2>There seems to be no books in your library that match that search</h2>
                                <br />
                                <button onClick={exitSearch} >Exit Search</button>
                            </div>
                            :
                            <div>
                                <h2>Your Library is currently empty, to add some visit the Public Library</h2>
                                <br />
                                <button onClick={() => props.history.push('/')} >Go to Public Library</button>
                            </div>
                        }
                    </Grid>
                    :
                    <Grid className='lib-box' >
                        <h4>Search for books in your library by title or author</h4>
                        <input onChange={(e) => setAuthorSearch(e.target.value)} placeholder="Author's name" value={authorSearch} type='text' />
                        <input onChange={(e) => setTitleSearch(e.target.value)} placeholder="Book Title" value={titleSearch} type='text' />
                        <br />
                        <button onClick={searchFn}> Search </button>
                        {searchView === true ? <button onClick={exitSearch} >Exit Search</button> : <></>}
                        <br />
                        <h3>Your Books</h3>
                        <br />
                        {mappedBooks}
                    </Grid>}
            </Grid>
        </main>
    );
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { clearUser })(UsersLibrary);

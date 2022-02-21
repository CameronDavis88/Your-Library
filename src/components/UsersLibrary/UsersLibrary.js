//codingMuse();
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { clearUser } from '../../redux/reducer';
import { Typography, Grid } from '@material-ui/core';
import Navbar from '../Navbar/Navbar';
import UsersBook from './UsersBook';
import '../../styles/UsersLibrary.css';

const UsersLibrary = (props) => {
    //User's id and username from redux
    const userId = props.user.user_id;
    const { username } = props.user;
    //React hooks for books array which will be populated with user's book from backend via axios request below
    const [books, setBooks] = useState([]);
    //Hooks for the values of the input fields
    const [authorSearch, setAuthorSearch] = useState('');
    const [titleSearch, setTitleSearch] = useState('');
    //Hook for conditionally rendering the view when user is viewing search or default view
    const [searchView, setSearchView] = useState(false);

    //Fetches data of user's book from database and sends it to the books state hook
    const getBooks = async () => {
        const userId = props.user.user_id;
        await axios.get(`/api/books/${userId}`)
            .then(({ data }) => {
                setBooks(data);
            })
            .catch(err => console.log(err));
    };

    //Invokes function to populate page with the user's books' data upon the component mounting conditional upon a user being signed in
    useEffect(() => {
        getBooks();
    }, [userId]);

    //Function created to send user to SelectedBook component that will be passed down through props to UsersBook components
    const routeToSelectedBook = () => {
        props.history.push('/selected_book');
    };

    //This maps over the books array in state hook and sends data through props to its own individual UsersBook component
    const mappedBooks = books.map((book) => {
        const { users_book_id, title, author, image_url, gut_url } = book;
        //If the title is too long for the small display element it is truncated to 50 characters and ...
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
         //Renders each individual book in its own component which receives its data through props
        return <UsersBook key={users_book_id} id={users_book_id} displayTitle={displayTitle} fullTitle={title} routeToSelectedBook={routeToSelectedBook}
            author={author} gutUrl={gut_url} imageUrl={image_url} setBooks={setBooks} getBooks={getBooks} book={book} />
    });

    //This fetches the books from user's book in database which match the search input values for author or title
    // and sets the new data to the books array in state hook
    const searchFn = async () => {
        setSearchView(true);
        const userId = props.user.user_id;
        //Endpoint for if the user is provided input for both fields
        if (authorSearch !== '' && titleSearch !== '') {
            await axios.get(`/api/books/${userId}/search_title/${titleSearch}/search_author/${authorSearch}`)
                .then(({ data }) => {
                    setBooks(data);
                })
                .catch((err) => console.log(err));
                 //Endpoint for if the user is provided input for only authorSearch
        } else if (authorSearch !== '' && titleSearch === '') {
            await axios.get(`/api/books/${userId}/search_author/${authorSearch}`)
                .then(({ data }) => {
                    setBooks(data);
                })
                .catch((err) => console.log(err));
                 //Endpoint for if the user is provided input for only titleSearch
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

    //Resets the page to default books and ends the user's search
    const exitSearch = () => {
        setAuthorSearch('');
        setTitleSearch('');
        getBooks();
        setSearchView(false);
    };

    return (
        <main className='users-library'>
            <Navbar props={props} className='navbar' />
            <Grid className='users-page' >
                <div>
                    <Typography variant='h2' >Welcome to Your Library, {username}!</Typography>
                </div>
                {!books[0]
                    ?
                    //Renders below when the user does not have any books yet in their library
                    <Grid className='lib-box' >
                        {/* Conditionally renders for when the user's library is completely empty or if there are no results form their search in their library */}
                        {searchView === true
                            ?
                            <div className='center' >
                                <h2>There seems to be no books in your library that match that search</h2>
                                <br />
                                <button onClick={exitSearch} >Exit Search</button>
                            </div>
                            :
                            <div className='center' >
                                <h2>Your Library is currently empty, to add some visit the Public Library</h2>
                                <br />
                                <button onClick={() => props.history.push('/')} >Go to Public Library</button>
                            </div>
                        }
                    </Grid>
                    :
                    // All below is when the user does have books in their library to be displayed
                    <Grid className='lib-box' >
                        <div className='upper-box' >
                            <Typography >-Search for books-</Typography>
                            <input onChange={(e) => setAuthorSearch(e.target.value)} placeholder="Author's name" value={authorSearch} type='text' />
                            <input onChange={(e) => setTitleSearch(e.target.value)} placeholder="Book Title" value={titleSearch} type='text' />
                            <button onClick={searchFn}> Search </button>
                            {searchView === true ? <button onClick={exitSearch} >Exit Search</button> : <></>}
                            <br />
                        </div>
                        <div className='mapped-books' >
                            {mappedBooks}
                        </div>
                    </Grid>}
            </Grid>
        </main>
    );
};

//Exporting component and accessing redux material
const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { clearUser })(UsersLibrary);

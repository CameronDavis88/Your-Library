import React, { useEffect, useState } from 'react';
import UsersBook from './UsersBook';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser, clearUser } from '../../redux/reducer';
import Navbar from '../Navbar/Navbar';

const UsersLibrary = (props) => {
    const userId = props.user.user_id;
    const { username } = props.user
    const [books, setBooks] = useState([]);
    const [authorSearch, setAuthorSearch] = useState('');
    const [titleSearch, setTitleSearch] = useState('');
    // const [searchView, setSearchView] = useState(false);
    // const [loggedIn, setLoggedIn] = useState(false);




    const searchFn = async () => {
        const userId = props.user.user_id;
        // setSearchView({ searchView: true });

        if (authorSearch !== '' && titleSearch !== '') {
            console.log('Go')
            await axios.get(`/api/books/${userId}/search_title/${titleSearch}/search_author/${authorSearch}`)
                .then(({ data }) => {
                    setBooks(data);
                    // showMeTheData(data);
                })
                .catch((err) => console.log(err));
        } else if (authorSearch !== '' && titleSearch === '') {
            console.log('Go')
            await axios.get(`/api/books/${userId}/search_author/${authorSearch}`)
                .then(({ data }) => {
                    setBooks(data);
                    // showMeTheData(data);
                })
                .catch((err) => console.log(err));
        } else if (titleSearch !== '' && authorSearch === '') {
            console.log('Go')
            await axios.get(`/api/books/${userId}/search_title/${titleSearch}`)
                .then(({ data }) => {
                    setBooks(data);
                    // showMeTheData(data);
                })
                .catch((err) => console.log(err));
        } else {
            alert('Search values are empty')
        }
    };







    //This is for logging in the console the data to follow it and see if it's doing what it should
    // const showMeTheData = (data) => {
    //     console.log(data);
    //     console.log(data.results);
    // };

    //No need for next page and previous page etc etc

    const getBooks = async () => {
        const userId = props.user.user_id;
        await axios.get(`/api/books/${userId}`)
            .then(({ data }) => {
                setBooks(data);
                // showMeTheData(data);
                // console.log(data)
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        getBooks()
        // console.log(props)
    }, []);


    useEffect(() => {
        getBooks()
        // console.log(user)
        // console.log(userId)
        // console.log(props.user)
        // console.log(books)
    }, [userId]);




    // const mappedBooks = books.map((book) => {
    //     //remember these properties are coming from the database keys and values, not gutenberg!
    //     const { users_book_id, title, author, image_url, gut_url } = book;
    //     return <UsersBook key={users_book_id} id={users_book_id} title={title} author={author} gutUrl={gut_url} imageUrl={image_url} setBooks={setBooks} getBooks={getBooks} />
    // });

// const handleTitleSearch = (e) => {
//     setTitleSearch(e.target.value)
// }

// const handleTitleSearch = (e) => {
//     let title = (e.target.value)

// }

    const FullLibrary = () => {

        return (

            <div>
                <h4>--Search for books in your library by title or author--</h4>
                <input onChange={(e) => setAuthorSearch(e.target.value)} placeholder="Author's name" value={authorSearch}/>
                <input onChange={e => setTitleSearch(e.target.value)} placeholder="Book Title"  />
                <br/>
                <button onClick={searchFn}> Search </button>
                <br/>
                <h3>Your Books</h3>
                <br/>
                {books.map((book) => {
                    const { users_book_id, title, author, image_url, gut_url } = book;
                    return <UsersBook key={users_book_id} id={users_book_id} title={title} author={author} gutUrl={gut_url} imageUrl={image_url} setBooks={setBooks} getBooks={getBooks} />
                })}
            </div>




        )
    }

    const EmptyLibrary = () => {
        return (
            <div>
                <h2>Your Library is currently empty, to add some visit the Public Library</h2>
                <br />
                <button onClick={() => props.history.push('/')} >Go to Public Library</button>
            </div>
        )
    };

    return (
        <div>
            <Navbar props={props} />
            <h1>Welcome to {username}'s Library!</h1>
            {!books[0] ? <EmptyLibrary /> : <FullLibrary />}
        </div>
    )
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getUser, clearUser })(UsersLibrary);

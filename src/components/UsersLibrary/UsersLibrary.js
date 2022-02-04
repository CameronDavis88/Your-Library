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
    const [searchView, setSearchView] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const searchFn = async () => {
        setSearchView({ searchView: true });
        await axios.get(`/api/books=search?=title{}--etc etc----------I dont know something like this`)
            .then(({ data }) => {
                setBooks(data);
                showMeTheData(data);
            })
            .catch((err) => console.log(err));
    };

    //This is for logging in the console the data to follow it and see if it's doing what it should
    const showMeTheData = (data) => {
        console.log(data);
        console.log(data.results);
    };

    //No need for next page and previous page etc etc

    const getBooks = async () => {
        const userId = props.user.user_id;
        await axios.get(`/api/books/${userId}`)
            .then(({ data }) => {
                setBooks(data);
                showMeTheData(data);
                // console.log(data)
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        getBooks()
        console.log(props)
        setLoggedIn(true)
    }, []);


    useEffect(() => {
        getBooks()
        // console.log(user)
        console.log(userId)
        // console.log(props.user)
        console.log(books)

    }, [userId]);

    const mappedBooks = books.map((book) => {
        //remember these properties are coming from the database keys and values, not gutenberg!
        const { users_book_id, title, author, image_url, gut_url } = book;
        return <UsersBook key={users_book_id} id={users_book_id} title={title} author={author} gutUrl={gut_url} imageUrl={image_url} setBooks={setBooks} getBooks={getBooks} />
    });

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
            {!books[0] ? <EmptyLibrary /> : mappedBooks}
        </div>
    )
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getUser, clearUser })(UsersLibrary);

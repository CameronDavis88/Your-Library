import React, { useEffect, useState } from 'react';
import UsersBook from './UsersBook';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../../redux/reducer'; 



//I think you will need to have all the data from the books sent and retrieved from the database, not gutenberg (see and alter AddBook function)
// unless you set a condition if the book has been edited then only send the edited version --which would be weird just sent all the data to the database
//then you will need to or can use the functionality of the getBooks or getData in the controllers

const UsersLibrary = (props) => {
    const userId = props.user.user_id;
    // const user = getUser()
    // const user = useSelector()
    const [books, setBooks] = useState([]);
    const [authorSearch, setAuthorSearch] = useState('');
    const [titleSearch, setTitleSearch] = useState('');
    const [searchView, setSearchView] = useState(false);

    const searchFn = async () => {
        setSearchView({ searchView: true });
        await axios.get(`/api/books=search?=title{}--etc etc----------I dont know something like this`)
            .then(({ data }) => {
                setBooks({ books: data.results });
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

    const getBooks = () => {
        const userId = props.user.user_id;
        axios.get(`/api/books/${userId}`)
            .then(({ data }) => {
                setBooks({ books: data });
                showMeTheData();
            })
            .catch(err => console.log(err));
    };

    // useEffect(() => {
    // //   getBooks();

    // }, [props.user.user_id])

    useEffect(() => {
        // console.log(user)
        console.log(userId)
        
        }, [])
    



    const mappedBooks = books.map((book) => {
        const { id, title, authors, formats, users_book_id } = book;
        const gutUrl = formats["text/html"];
        const imageUrl = formats["image/jpeg"];
        const author = authors[0].name;
        const usersBookId = users_book_id;
        return <UsersBook key={id} id={id} usersBookId={usersBookId} title={title} author={author} imageUrl={imageUrl} gutUrl={gutUrl} getBooks={getBooks} />
    })

    return (
        // You will need to make this component like a merger of the Dashboard and PubLibrary but for the user
        <div>
            This is the User's Library
            {/* {mappedBooks} */}
            {/* {
            // props.user.usersBook
             ? 
                
                <div>
                    <h2>Note that the user has no books yet asks if they
                        would like to add some from the public library</h2>
                        <button onClick={() => props.history.push('/')} >Go to Public Library</button>
                </div>
                : mappedBooks
            } */}

        </div>
    )

};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, {getUser})(UsersLibrary);

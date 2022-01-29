import React, { useEffect, useState} from 'react';
import UsersBook from './UsersBook';


//I think you will need to have all the data from the books sent and retrieved from the database, not gutenberg (see and alter AddBook function)
// unless you set a condition if the book has been edited then only send the edited version --which would be weird just sent all the data to the database
//then you will need to or can use the functionality of the getBooks or getData in the controllers

const UsersLibrary = () => {
    const [books, setBooks] = useState([]);
    const [authorSearch, setAuthorSearch] = useState('');
    const [titleSearch, setTitleSearch] = useState('');
    const [searchView, setSearchView] = useState(false);
     
    searchFn = async () => {
        setSearchView({ searchView: true });
        await axios.get(`/api/books=search?=title{}--etc etc----------I dont know something like this`)
            .then(({ data }) => {
                setBooks({ books: data.results });
                showMeTheData(data);
            })
            .catch((err) => console.log(err));
    };

    //This is for logging in the console the data to follow it and see if it's doing what it should
    showMeTheData = (data) => {
        console.log(data);
        console.log(data.results);
    };

    //No need for next page and previous page etc etc

    getBooks = () => {
        axios.get(`/api/getBooks:id--or something like that!`)
            .then(({ data }) => {
                setBooks({ books: data.results });
                showMeTheData();
            })
            .catch(err => console.log(err));
    };

    // useEffect(() => {
    //   getBooks();
    // }, [])

  

   
        const mappedBooks = books.map((book) => {
            const { id, title, authors, formats } = book;
            const url = formats["text/html"]
            return <UsersBook key={id} id={id} title={title} authors={authors} formats={formats} url={url} />
        })

        return (
            // You will need to make this component like a merger of the Dashboard and PubLibrary but for the user
            <div>
               {mappedBooks}
            </div>
        )
    
};

export default UsersLibrary;

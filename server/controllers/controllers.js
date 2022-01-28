const axios = require('axios');
//The books array below will be replaced by the database 
let books = [];

//I'm thinking all of the public library stuff is sent right to the component, from Gutenberg 
//  but all the User's book data and functions like Post, Put, and Delete are controlled here 

module.exports = {
    getData: (req, res) => {
        res.status(200);
        axios.get(`http://gutendex.com/books`)
            .then(res => books = res.data.results)
            .catch(() => console.log('Api request failed big time!'))
    },
    getBooks: (req, res) => {
        res.status(200).json(books);
    },
    addBook: (req, res) => {
        const newBook = req.body;
        books.push(newBook);
        res.status(200).json(books);
    },
    updateBook: (req, res) => {
        const { id } = req.params;
        const { title, authors } = req.body;
        const index = books.findIndex(book => book.id == id);
        title ? books[index].title = title : books[index].title = books[index].title;
        authors ? books[index].authors[0].name = authors : books[index].authors[0].name = books[index].authors[0].name;
        //Make it so they could add a different cover picture?
        res.status(200).json(books);
    },
    deleteBook: (req, res) => {
        const { id } = req.params;
        const index = books.findIndex(book => book.id == id);
        books.splice(index, 1);
        res.status(200).json(books);
    },

    //This will be just like getData at the top of the page only it will get the data for the various pages of 31 books
    // and thus to use them the same way as with the one above you will need to gey into books from pages


}

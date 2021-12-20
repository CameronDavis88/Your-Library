const bookList = require('../../db/bookList');
let books = [...bookList.books];

module.exports = {
    getBooks : (req, res) => {
        res.status(200).json(books);
    },
    addBook : (req, res) => {
        const newBook = req.body;
        books.push(newBook);
        res.status(200).json(books);
    },
    updateBook : (req, res) => {
        const {id} = req.params;
        const {title, author, pages} = req.body;
        const index = books.findIndex(book => book.isbn == id);
        title ? books[index].title = title: books[index].title =books[index].title;
        author ? books[index].author = author : books[index].author = books[index].author;
        pages ? books[index].pages = pages : books[index].pages = books[index].pages;


        // books[index].author = author;
        // books[index].pages = pages;
        res.status(200).json(books);
    },
    deleteBook : (req, res) => {
        const {id} = req.params;
        const index = books.findIndex(book => book.isbn == id);
        books.splice(index, 1);
        res.status(200).json(books);
    },

}
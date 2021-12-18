const bookList = require('../../db/bookList')
let books = [...bookList.books]

module.exports = {
    getBooks : (req, res) => {
        res.status(200).json(books)
    },
    addBook : (req, res) => {
        const newBook = req.body;
        books.push(newBook)
        res.status(200).json(books)
    },
    updateBook : (req, res) => {
        const {id} = req.params
        const newBook = req.body
        const index = books.findIndex(book => book.isbn == id)
        books.splice(index, 1, newBook )
        res.status(200).json(books)
    },
    deleteBook : (req, res) => {
        const {id} = req.params
        const index = books.findIndex(book => book.isbn == id)
        books.splice(index, 1)
        res.status(200).json(books)
    },

}
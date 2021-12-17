const express = require('express');
const {books} = require('../db/bookList')
const port = 4444;

const app = express();
app.use(express.json());


app.get(`/api/books`, (req, res) => {
    res.status(200).json(books)
})

app.post(`/api/book`, (req, res) => {
    const newBook = req.body;
    books.push(newBook)
    res.status(200).json(books)
})

app.put(`/api/book/:id`, (req, res) => {
    const {id} = req.params
    const {book} = req.body
    const index = books.findIndex(book => book.isbn == id)
    books.splice(index, 1, book )
    res.status(200).json(books)
} )

app.delete(`/api/book/:id`, (req, res) => {
    const {id} = req.params
    const index = books.findIndex(book => book.isbn == id)
    books.splice(index, 1)
    res.status(200).json(books)
})


app.listen(port, () => console.log(`Listening on port ${port}`))
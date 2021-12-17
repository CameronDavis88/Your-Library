const express = require('express');
const {getBooks, addBook, updateBook, deleteBook} = require('./controllers/controllers')
const port = 4444;

const app = express();
app.use(express.json());


app.get(`/api/books`, getBooks)

app.post(`/api/book`, addBook)

app.put(`/api/book/:id`, updateBook )

app.delete(`/api/book/:id`, deleteBook)


app.listen(port, () => console.log(`Listening on port ${port}`))
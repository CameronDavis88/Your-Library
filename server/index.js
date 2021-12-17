const express = require('express');
const {books} = require('./bookList')
const port = 4444;

const app = express();
app.use(express.json());


app.get(`/api/books`, (req, res) => {
    res.status(200).json(books)
})


app.listen(port, () => console.log(`Listening on port ${port}`))
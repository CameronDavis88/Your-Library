const axios = require('axios');
// const bookList = require('../../db/bookList');
let books = []
// [...bookList.books];

sendData = () => {
    axios.get(`http://gutendex.com/books`)
        .then(res => books = res.data.results)
        .catch(() => console.log('Api request failed big time!'))
}


module.exports = {
    getData: (req, res) => {
        res.status(200)
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
        const { title, authors, pages } = req.body;
        const index = books.findIndex(book => book.id == id);
        title ? books[index].title = title : books[index].title = books[index].title;
        authors ? books[index].authors[0].name = authors : books[index].authors[0].name = books[index].authors[0].name;
        // pages ? books[index].pages = pages : books[index].pages = books[index].pages;
        res.status(200).json(books);
    },
    deleteBook: (req, res) => {
        const { id } = req.params;
        const index = books.findIndex(book => book.id == id);
        books.splice(index, 1);
        res.status(200).json(books);
    },

}

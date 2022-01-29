const bcrypt = require('bcryptjs');
// const axios = require('axios');

//The books array below will be replaced by the database 
// let books = [];

//I'm thinking all of the public library stuff is sent right to the component, from Gutenberg 
//  but all the User's book data and functions like Post, Put, and Delete are controlled here 

module.exports = {
    // getData: (req, res) => {
    //     res.status(200);
    //     axios.get(`http://gutendex.com/books`)
    //         .then(res => books = res.data.results)
    //         .catch(() => console.log('Api request failed big time!'))
    // },
    getUsersBooks: async (req, res) => {
        const { userId } = req.params;
        const db = req.app.get('db');
        const books = await db.usersBooks.get_books(userId)
        res.status(200).json(books);
    },
    addBook: async (req, res) => {
        const { userId } = req.params;
        const db = req.app.get('db');
        const { gutBookId, title, author, imageUrl, gutUrl } = req.body;
        const books = await db.usersBooks.add_book(gutBookId, title, author, imageUrl, gutUrl, userId)
        // books.push(newBook);
        res.status(200).json(books);
    },
    updateBook: async (req, res) => {
        const { usersBookId } = req.params;
        const { title, author, imageUrl } = req.body;
        const db = req.app.get('db');
        const books = await db.usersBooks.edit_book(title, author, imageUrl, usersBookId)
        res.status(200).json(books);
    },
    deleteBook: async (req, res) => {
        const { usersBookId } = req.params;
        const db = req.app.get('db');
        const books = await db.usersBooks.delete_book(usersBookId);
        res.status(200).json(books);
    },

    //For the editing of the user's info see how it was done in sql query for edit_book
    //and how I set up the editing book function in the front end


}

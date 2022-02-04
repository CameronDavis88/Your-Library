const bcrypt = require('bcryptjs');
module.exports = {
    //-------------Book Controllers--------------
    getUsersBooks: async (req, res) => {
        const userId = req.params.id;
        const db = req.app.get('db');
        const books = await db.usersBooks.get_books(userId);
        res.status(200).json(books);
    },
    addBook: async (req, res) => {
        const userId = req.params.id;
        const db = req.app.get('db');
        const { gutBookId, title, author, imageUrl, gutUrl } = req.body;
        const [book] = await db.usersBooks.add_book([gutBookId, title, author, imageUrl, gutUrl, userId]);
        res.status(200).json(book);
    },
    updateBook: async (req, res) => {
        const usersBookId = req.params.id;
        const { title, author, imageUrl } = req.body;
        const db = req.app.get('db');
        const books = await db.usersBooks.edit_book([title, author, imageUrl, usersBookId]);
        res.status(200).json(books);
    },
    deleteBook: async (req, res) => {
        const usersBookId = req.params.id;
        const db = req.app.get('db');
        const books = await db.usersBooks.delete_book([usersBookId]);
        res.status(200).json(books);
    },
};

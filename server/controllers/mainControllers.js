const bcrypt = require('bcryptjs');
module.exports = {
    // ------------User Controller--------------------
    updateUsersInfo: (req, res) => {
        const { userId } = req.params;
        const { username, email, password } = req.body;
        const db = req.app.get('db');
        let salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        db.usersInfo.edit_users_info({ userId, hash, email, username })
            .then(([user]) => res.status(200).send(user))
            .catch(err => res.status(500).send(err));
    },
    //-------------Book Controllers--------------
    getUsersBooks: async (req, res) => {
        const { userId } = req.params;
        const db = req.app.get('db');
        const [books] = await db.usersBooks.get_books([userId]);
        res.status(200).json(books);
    },
    addBook: async (req, res) => {
        const { userId } = req.params;
        console.log(userId)
        const db = req.app.get('db');
        const { gutBookId, title, author, imageUrl, gutUrl } = req.body;
        const [books] = await db.usersBooks.add_book([gutBookId, title, author, imageUrl, gutUrl, userId]);
        res.status(200).json(books);
    },
    updateBook: async (req, res) => {
        const { usersBookId } = req.params;
        const { title, author, imageUrl } = req.body;
        const db = req.app.get('db');
        const books = await db.usersBooks.edit_book(title, author, imageUrl, usersBookId);
        res.status(200).json(books);
    },
    deleteBook: async (req, res) => {
        const { usersBookId } = req.params;
        const db = req.app.get('db');
        const books = await db.usersBooks.delete_book(usersBookId);
        res.status(200).json(books);
    },
};

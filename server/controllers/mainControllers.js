const bcrypt = require('bcryptjs');
module.exports = {
    // ------------User Controller--------------------
    updateUsersInfo: async (req, res) => {
        const userId = req.params.id;
        const { username, email, password, oldPassword, oldEmail } = req.body;
        const db = req.app.get('db');
        const [checkEmail] = await db.usersInfo.get_user([email]);
        if (checkEmail) {
            return res.status(400).send('Email already in use');
        } else {
            const [foundUser] = await db.usersInfo.get_user([oldEmail]);
            const authenticated = bcrypt.compareSync(oldPassword, foundUser.password);
            if (!authenticated) {
                return res.status(401).send('Old password is incorrect');
            };
        }
        let salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const [updatedUser] = await db.usersInfo.edit_users_info([hash, email, username, userId])
        delete updatedUser.password;

        res.status(202).send(updatedUser);

    },

    //-------------Book Controllers--------------
    getUsersBooks: async (req, res) => {
        const userId = req.params.id;
        console.log(userId)
        const db = req.app.get('db');
        const books = await db.usersBooks.get_books(userId);
        // console.log(books)
        res.status(200).json(books);
    },
    addBook: async (req, res) => {
        const userId = req.params.id;
        // console.log(id)
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

const bcrypt = require('bcryptjs');
module.exports = {
    register: async (req, res) => {
        const { username, email, password } = req.body;
        const db = req.app.get('db');
            const [foundUser] = await db.usersInfo.get_user([email]);
        if (foundUser) {
            return res.status(400).send('Email already in use');
        };
        let salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const [newUser] = await db.usersInfo.add_user([username, hash, email]);
                req.session.user = newUser;
                res.status(201).send(req.session.user);
},

    login: async (req, res) => {
        const { email, password } = req.body;
        const db = req.app.get('db');
        const [foundUser] = await db.usersInfo.get_user([email]);
        if (!foundUser) {
            return res.status(400).send('Email not found');
        };
        const authenticated = bcrypt.compareSync(password, foundUser.password);
        if (!authenticated) {
            return res.status(401).send('Password is incorrect');
        };
        delete foundUser.password;
        req.session.user = foundUser;
        res.status(202).send(req.session.user);
    },

    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },

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

    deleteUser: async (req, res) => {
        const userId = req.params.id;
        const { email, password } = req.body;
        const db = req.app.get('db');
        const [foundUser] = await db.usersInfo.get_user([email]);
        const authenticated = bcrypt.compareSync(password, foundUser.password);
        if (!authenticated) {
            return res.status(401).send('Password is incorrect');
        } else {
            delete foundUser.password;
        req.session.destroy();
        db.usersInfo.delete_user([userId]);
        res.sendStatus(200);
        }
        

    }
};
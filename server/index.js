require('dotenv').config();
const bcrypt = require('bcryptjs');

const express = require('express');
const massive = require('massive');
const session = require('express-session');
const { getUsersBooks, addBook, updateBook, deleteBook, updateUsersInfo } = require('./controllers/mainControllers');
const { register, login, logout } = require('./controllers/authControllers')
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

const app = express();

app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }
}));

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
}).then(db => {
    app.set('db', db);
    console.log('db connected');
    app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));
});

//--------Auth Endpoints
app.post('/api/register', register);

// app.post('/api/register', async (req, res) => {
//         const { username, email, password } = req.body;
//         const db = req.app.get('db');
//             const [foundUser] = await db.usersInfo.get_user([email]);
//         if (foundUser) {
//             return res.status(400).send('Email already in use');
//         };
//         let salt = bcrypt.genSaltSync(10);
//         const hash = bcrypt.hashSync(password, salt);
//         const [newUser] = await db.usersInfo.add_user([username, hash, email]);
//                 req.session.user = newUser;
//                 res.status(201).send(req.session.user);
// });

    // register: async (req, res) => {
    //     const { username, email, password } = req.body;
    //     const db = req.app.get('db');
    //     const [foundUser] = await db.usersInfo.get_user(email);
    //     if (foundUser) {
    //         return res.status(400).send('Email already in use');
    //     };
    //     let salt = bcrypt.genSaltSync(10);
    //     const hash = bcrypt.hashSync(password, salt);
    //     const [newUser] = await db.usersInfo.add_user([username, hash, email]);
    //     req.session.user = newUser;
    //     res.status(201).send(req.session.user);
    // },


// app.post('/api/login', login);
// app.get('/api/logout', logout);

//---------User Endpoints
// app.put('/api/user/:id', updateUsersInfo);

//--------Book endpoints
app.get(`/api/books:id`, getUsersBooks);
app.post(`/api/book:id`, addBook);
app.put(`/api/book/:id`, updateBook);
app.delete(`/api/book/:id`, deleteBook);

// app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));
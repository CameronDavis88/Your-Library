require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
// const path = require('path');
const { getUsersBooks, addBook, updateBook, deleteBook, searchBoth, searchAuthor, searchTitle } = require('./controllers/mainControllers');
const { register, login, logout, deleteUser, updateUsersInfo } = require('./controllers/authControllers');
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
    app.listen(SERVER_PORT, () => console.log(`Listening on SERVER_PORT ${SERVER_PORT}`));
});

//--------User/Auth Endpoints
app.post('/api/register', register);
app.post('/api/login', login);
app.get('/api/logout', logout);
app.put('/api/user/:id', updateUsersInfo);
app.put(`/api/delete_user/:id`, deleteUser)

//--------Book endpoints
app.get(`/api/books/:id`, getUsersBooks);
app.get(`/api/books/:id/search_title/:title/search_author/:author`, searchBoth)
app.get(`/api/books/:id/search_title/:title`, searchTitle)
app.get(`/api/books/:id/search_author/:author`, searchAuthor)

app.post(`/api/book/:id`, addBook);
app.put(`/api/book/:id`, updateBook);
app.delete(`/api/book/:id`, deleteBook);

// app.use(express.static(`${__dirname}/../build`));

// app.use(express.static(__dirname + `/../build`));
// app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../build/index.html')));
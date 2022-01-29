require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const { getData, getUsersBooks, addBook, updateBook, deleteBook } = require('./controllers/controllers');
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
    app.set('db', db)
    console.log('db connected')
    app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))
});


// app.get(`/api/data`, getData);

app.get(`/api/books:id`, getUsersBooks);

app.post(`/api/book:id`, addBook);

app.put(`/api/book/:id`, updateBook);

app.delete(`/api/book/:id`, deleteBook);

// app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));
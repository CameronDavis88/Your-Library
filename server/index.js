const express = require('express');
const {getData, getBooks, addBook, updateBook, deleteBook} = require('./controllers/controllers');
const port = 4444;

const app = express();
app.use(express.json());

// app.post(`/api/bookList`, getData)
app.get(`/api/data`, getData)

app.get(`/api/books`, getBooks);

app.post(`/api/book`, addBook);

app.put(`/api/book/:id`, updateBook );

app.delete(`/api/book/:id`, deleteBook);

// getData = () => {
//     axios.get(`http://gutendex.com/books`)
//     .then(res => books = res.data.results)
//     .catch(() => console.log('Api request failed big time!'))
//   }

app.listen(port, () =>  console.log(`Listening on port ${port}`));

// getData = () => {
//     axios.get(`http://gutendex.com/books`)
//     .then(res => this.setState({bookList : res.data.results}))
//     .catch(() => console.log('Api request failed big time!'))
//   }
//   sendData = () => {
//     this.getData()
//     axios.post(`/api/bookList`, this.state.bookList )
//     .then( res => console.log(res))
//     .catch(err => console.log(err))
//   }
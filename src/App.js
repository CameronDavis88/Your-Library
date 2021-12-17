import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      books : [],
    }

  }
  componentDidMount(){
    axios.get(`/api/books`)
    //data is destructured here from res, as if saying res.data
    //then the data is being sent to state in the books array
    .then(({ data }) => this.setState({books : data}))
    .catch(err => console.log(err))
  }

  render(){
    const mappedBooks = this.state.books.map(book => <h3 key={book.isbn}>{book.title}</h3>)
   return (
    <div>
        {mappedBooks}
    </div>
   )
  }
}

export default App;

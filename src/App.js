//codingMuse();
import React from 'react';
import axios from 'axios';
import AddBook from './components/AddBook';
import AllBooks from './components/AllBooks';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      addMode: true,
    }
    this.getBooks = this.getBooks.bind(this);
  }

  getData = () => {
    axios.get(`/api/data`)
      .catch(err => console.log(err))
  }

  getBooks() {
    axios.get(`/api/books`)
      //data is destructured here from res, as if saying res.data
      //then the data is being sent to state in the books array
      .then(({ data }) => {
        this.setState({ books: data })
        // this.setState({ carol: data[0].formats["text/html"] })
        console.log(data[0].title)
        console.log(data[0].formats["text/plain"])
        // this.setState({ carol: data[0].formats["text/plain"] })
      }
     )
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getData();
    this.getBooks();
  }
  componentDidUpdate() {
    // this.getBooks();
  }

  displayAddMode = () => {
    this.setState({ addMode: false });
  }

  hideAddMode = () => {
    this.setState({ addMode: true });
  }

  render() {
    return (
      <main>
         You need to set up a search bar for the user and allow them to create their own library 
        of at least the titles and link that to the actual book-- so it's not just loading all
        their books but only the user's books!
        <div id='addBtn'>
          {this.state.addMode === true
            ?
            <button onClick={this.displayAddMode}>Add New Book</button>
            :
            <AddBook books={this.state.books}
              hideAddMode={this.hideAddMode} />
          }
        </div>
        <h1 >Full Booklist:</h1>
        <AllBooks books={this.state.books}
          getBooks={this.getBooks} />  
      </main>
    )
  }
}

export default App;

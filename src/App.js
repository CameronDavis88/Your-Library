//muse()
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
      addMode : true,

    }
    this.getBooks = this.getBooks.bind(this);
  }
  getBooks() {
    axios.get(`/api/books`)
      //data is destructured here from res, as if saying res.data
      //then the data is being sent to state in the books array
      .then(({ data }) => this.setState({ books: data }))
      .catch(err => console.log(err))
  }
  componentDidMount() {
    this.getBooks();
  }
  componentDidUpdate() {
    this.getBooks();
  }

  displayAddMode = () => {
    this.setState({addMode: false})
  } 

  hideAddMode = () => {
    this.setState({addMode: true})
  }
 
  render() {
    return (
      <main>
        <div id='addBtn'>
          { this.state.addMode === true
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

import React from 'react';
import axios from 'axios';
import './App.css';
import AddBook from './components/AddBook';
import AllBooks from './components/AllBooks';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
     
    }

  }
  componentDidMount() {
    axios.get(`/api/books`)
        //data is destructured here from res, as if saying res.data
        //then the data is being sent to state in the books array
        .then(({ data }) => this.setState({ books: data }))
        .catch(err => console.log(err))
}


  render() {
    return (
      <div>
        <section>
          <AddBook books={this.state.books}/>
        </section>
        <h1>Full Booklist:</h1>
        <AllBooks books={this.state.books}
        />
      </div>
    )
  }
}

export default App;

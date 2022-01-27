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
      page: 1,
      nextPage: 2,
      prevPage: 0,
      authorSearch: '',
      titleSearch: '',

    }
    // this.getBooks = this.getBooks.bind(this);
  }

  testSearch = () => {
    const { authorSearch, titleSearch } = this.state
    axios.get(`http://gutendex.com/books?search=${authorSearch}%20${titleSearch}`)
      .then(({ data }) => {
        this.setState({ books: data.results })
        console.log(data)

      })
  }


  nextPage = async (pageNum) => {
    const { books, prevPage, nextPage } = this.state;
    nextPage === null ? console.log('Already on last page') : await axios.get(`http://gutendex.com/books?page=${pageNum}`)
        .then(({ data }) => {
          if (data.next[data.next.length - 1] === '/') {
            this.getData();
          } else {
            this.setState({ nextPage: parseInt(data.next[data.next.length - 1]) })
            this.setState({ page: parseInt(data.next[data.next.length - 1]) - 1 })

            if (data.previous[data.previous.length - 1] === '/' || data.previous[data.previous.length - 1] === 's') {
              this.setState({ prevPage: 1 })
            } else {
              this.setState({ prevPage: parseInt(data.previous[data.previous.length - 1]) })
            }
          };

             // console.log('-----------------------next-------------')
          // console.log('prevNum', this.state.prevPage)
          // console.log('page', this.state.page)
          // console.log('nextNum', this.state.nextPage)
          // console.log('prevURL', data.previous)
          // console.log('nextURL', data.next)
          // console.log(data)
          // console.log(data.results)

          // this.loadBooks(data.results)

        })
        .catch(err => console.log(err))

  }

  prevPage = async (pageNum) => {
    const { books, prevPage, nextPage } = this.state;
    if (prevPage === 0) {
      console.log('already on first page')
    } else if (prevPage === 1) {
      await axios.get(`http://gutendex.com/books?page=${pageNum}`)
        .then(({ data }) => {
          this.setState({ page: parseInt(data.next[data.next.length - 1]) - 1 })
          this.setState({ nextPage: parseInt(data.next[data.next.length - 1]) })
          this.setState({ prevPage: 0 })

             // console.log('-----------------------next-------------')
          // console.log('prevNum', this.state.prevPage)
          // console.log('page', this.state.page)
          // console.log('nextNum', this.state.nextPage)
          // console.log('prevURL', data.previous)
          // console.log('nextURL', data.next)
          // console.log(data)
          // console.log(data.results)

          // this.loadBooks(data.results)
        })
        .catch(err => console.log(err))
    } else if (prevPage === 2) {
      await axios.get(`http://gutendex.com/books?page=${pageNum}`)
        .then(({ data }) => {
          this.setState({ page: parseInt(data.next[data.next.length - 1]) - 1 })
          this.setState({ nextPage: parseInt(data.next[data.next.length - 1]) })
          this.setState({ prevPage: 1 })

          // console.log('-----------------------next-------------')
          // console.log('prevNum', this.state.prevPage)
          // console.log('page', this.state.page)
          // console.log('nextNum', this.state.nextPage)
          // console.log('prevURL', data.previous)
          // console.log('nextURL', data.next)
          // console.log(data)
          // console.log(data.results)

          // this.loadBooks(data.results)
        }).catch((err) => console.log(err))
    } else {
      await axios.get(`http://gutendex.com/books?page=${pageNum}`)
        .then(({ data }) => {
          this.setState({ page: parseInt(data.next[data.next.length - 1]) - 1 })
          this.setState({ nextPage: parseInt(data.next[data.next.length - 1]) })
          this.setState({ prevPage: parseInt(data.previous[data.previous.length - 1]) })

          // console.log('-----------------------next-------------')
          // console.log('prevNum', this.state.prevPage)
          // console.log('page', this.state.page)
          // console.log('nextNum', this.state.nextPage)
          // console.log('prevURL', data.previous)
          // console.log('nextURL', data.next)
          // console.log(data)
          // console.log(data.results)

          // this.loadBooks(data.results)

        })
        .catch(err => console.log(err))
    }

  };





  loadBooks = (stuff) => {
    this.setState({ books: stuff })
  };



  getData = () => {
    //This was from my server but I'm not using that right now
    // axios.get(`/api/data`)
    //   .catch(err => console.log(err))

    axios.get(`http://gutendex.com/books`)
      .then(({ data }) => {
        this.setState({ books: data.results })
        // console.log(data.next)
        console.log(data.results)
        // const nextPage = parseInt(data.next[data.next.length - 1])
        // const prevPage = parseInt(data.previous[data.previous.length - 1])
        // data.previous ? this.setState({ prevPage: prevPage }) : console.log('First page')
        // this.setState({ nextPage: nextPage })
        this.setState({ page: 1, prevPage: 0, nextPage: 2 })
        console.log(data)

        // console.log(this.state.nextPage)
      })
      .catch(err => console.log(err))
  };



  // getBooks() {
  //   // axios.get(`/api/books`)
  //   axios.get(`http://gutendex.com/books`)
  //     //data is destructured here from res, as if saying res.data
  //     //then the data is being sent to state in the books array
  //     .then(({ data }) => {
  //       this.setState({ books: data.results })
  //       // this.setState({ carol: data[0].formats["text/html"] })
  //       // console.log(data[0].title)
  //       // console.log(data[0].formats["text/plain"])
  //       // this.setState({ carol: data[0].formats["text/plain"] })
  //     }
  //    )
  //     .catch(err => console.log(err))
  // }

  componentDidMount() {
    this.getData();
    // this.getBooks();
    console.log(this.state.nextPage)
    console.log(this.state.prevPage)


  }

  componentDidUpdate() {
    // this.getBooks();
    // console.log(this.state.page)
    // console.log(this.state.nextPage)

    // this.loadBooks()
    // this.getData()

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
        <button onClick={() => this.prevPage(this.state.prevPage)}  >Back Page</button>
        <button onClick={() => this.nextPage(this.state.nextPage)}  >Next Page</button>
        <input onChange={(e) => this.setState({ authorSearch: e.target.value })} placeholder="Author's name" />
        <input onChange={(e) => this.setState({ titleSearch: e.target.value })} placeholder="Book Title" />
        <button onClick={this.testSearch}> Search </button>



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
        />
      </main>
    )
  }
}


export default App;

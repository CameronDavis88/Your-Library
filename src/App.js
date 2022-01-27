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
      backPage: 1,
      authorSearch: '',
      titleSearch: '',

    }
    // this.getBooks = this.getBooks.bind(this);
  }

  testSearch = () => {
    const { authorSearch, titleSearch } = this.state
    axios.get(`http://gutendex.com/books?search=${authorSearch}%20${titleSearch}`)
    .then(({ data }) => console.log(data))
  }

  //maybe you could pass in as an argument into the function the last page
  nextPage = async (pageNum) => {
    const { books, page, nextPage } = this.state;
    await axios.get(`http://gutendex.com/books?page=${pageNum}`)
      .then(({ data }) => {
        
       
        this.setState({ page: page + 1 })
        this.setState({ nextPage: nextPage + 1 })
        
        console.log(this.state.page)
        console.log(this.state.nextPage)
        console.log(data.results)

        // this.loadBooks(data.results)

      })
      .catch(err => console.log(err))
  }

  //---------------After all that there is a previous thing just like next on the data from gutenberg!!!!!!!!!

  backPage = async (pageNum) => {
    const { books, page, nextPage } = this.state;

    if (page === 1) {
      axios.get(`http://gutendex.com/books?page=${pageNum}`)
        .then(({ data }) => {
          console.log(this.state.page)
          console.log(this.state.nextPage)
          console.log(data.results)
        }
        )
    } 
    // else if (page < nextPage + 1) {
    //   this.setState({ page: page - 2 })
    //   this.setState({ nextPage: nextPage - 1 })

    //   axios.get(`http://gutendex.com/books?page=${pageNum}`)
    //     .then(({ data }) => {
    //       console.log(this.state.page)
    //       console.log(this.state.nextPage)
    //       console.log(data.results)
    //     }
    //     )
     
    // }
     else {
      this.setState({ page: page - 1 })
      this.setState({ nextPage: nextPage - 1 })
      await
      axios.get(`http://gutendex.com/books?page=${pageNum}`)
        .then(({ data }) => {
          console.log(this.state.page)
          console.log(this.state.nextPage)
          console.log(data.results)
        }
        )
      
    }
  }






  // /////////////
  // page === 1
  //         ?
  //         await axios.get(`http://gutendex.com/books?page=${pageNum}`)
  //           .then(({ data }) => {
  //             console.log(data.results)
  //             // this.componentDidUpdate()
  //             // page <= 2 ?
  //             // this.setState({ page: page - 1 })
  //             // :
  //             // this.getData()
  //             // this.loadBooks(data.results)
  //           })
  //           .catch(err => console.log(err))


  //   :

  //       this.setState({ page: page - 1 })
  // await axios.get(`http://gutendex.com/books?page=${pageNum}`)
  //         .then(({ data }) => {
  //           // console.log(data.results)

  //           //  this.componentDidUpdate()

  //           // this.loadBooks(data.results)

  //         })
  //         .catch(err => console.log(err))
  //   this.setState({ page: page - 1 })

  // await axios.get(`http://gutendex.com/books?page=${pageNum}`)
  //         .then(({ data }) => {
  //           console.log(data.results)
  //         })
  //         .catch(err => console.log(err))
  // // this.componentDidUpdate()





  loadBooks = (stuff) => {
    this.setState({ books: stuff })
  }


  getData = () => {
    //This was from my server but I'm not using that right now
    // axios.get(`/api/data`)
    //   .catch(err => console.log(err))


    axios.get(`http://gutendex.com/books?page=${this.state.page}`)
      .then(({ data }) => {
        this.setState({ books: data.results })


        console.log(data.next)
        console.log(data.results)
        const nextPage = parseInt(data.next[data.next.length - 1])
        // console.log(nextPage)
        console.log(data.next)
        this.setState({ nextPage: nextPage })
      })
      .catch(err => console.log(err))
  }

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
        <button onClick={() => this.backPage(this.state.page)}  >Back Page</button>
        <button onClick={() => this.nextPage(this.state.nextPage)}  >Next Page</button>
        <input onChange={(e)=> this.setState({ authorSearch: e.target.value })} placeholder="Author's name"/>
        <input onChange={(e)=> this.setState({ titleSearch: e.target.value })} placeholder="Book Title"/>
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

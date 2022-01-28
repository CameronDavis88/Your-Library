//codingMuse();
import React, { Component } from 'react';
import axios from 'axios';
import AddBook from './components/AddBook';
import AllBooks from './components/AllBooks';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      addMode: true,
      prevPage: 0,
      page: 1,
      nextPage: 2,
      authorSearch: '',
      titleSearch: '',
      searchView: false,

    }
  };

  //For search page you need to make the next and prev buttons fit the search data
  // -- or make it dynamic between default or search pages
  // testSearch = () => {
  //   this.setState({ searchView: true });
  //   const { authorSearch, titleSearch } = this.state;
  //   axios.get(`http://gutendex.com/books?search=${authorSearch}%20${titleSearch}`)
  //     .then(({ data }) => {
  //       this.setState({ books: data.results });
  //       console.log(data);
  //       if (data.next === null) {
  //         this.setState({ nextPage: 0 });
  //       }
  //     })
  //     .catch((err) => console.log(err))
  // };
  testSearch = () => {
    this.setState({ searchView: true });
    const { authorSearch, titleSearch } = this.state;
    axios.get(`http://gutendex.com/books?search=${authorSearch}%20${titleSearch}`)
      .then(({ data }) => {
        this.setState({ books: data.results });
        console.log(data);
        if (data.next === null) {
          this.setState({ nextPage: 0 });
        }
      })
      .catch((err) => console.log(err))
  };




  //This is for logging in the console the data to follow it and see if it's doing what it should
  showMeTheData = (data) => {
    console.log('-----------------------next-------------');
    console.log('prevNum', this.state.prevPage);
    console.log('page', this.state.page);
    console.log('nextNum', this.state.nextPage);
    console.log('prevURL', data.previous);
    console.log('nextURL', data.next);
    console.log(data);
    console.log(data.results);
  };



  //This takes care of the functionality of the nextBtn when searchView is false -- called in nextBtn
  // nextDefault = ({ data }) => {
  //   if (data.next[data.next.length - 1] === '/') {
  //     this.getData();
  //   } else if (data.next === null) {
  //     this.setState({ nextPage: 1 })
  //   } else {
  //     this.setState({ nextPage: parseInt(data.next[data.next.length - 1]) })
  //     this.setState({ page: parseInt(data.next[data.next.length - 1]) - 1 })

  //     if (data.previous[data.previous.length - 1] === '/' || data.previous[data.previous.length - 1] === 's') {
  //       this.setState({ prevPage: 1 })
  //     } else {
  //       this.setState({ prevPage: parseInt(data.previous[data.previous.length - 1]) })
  //     }
  //   }
  //   this.showMeTheData(data)
  //   // this.loadBooks(data.results)
  // };





  //This takes care of the functionality of the nextBtn when searchView is true -- called in nextBtn
  //   nextSearch = ({ data }) => {
  //     this.setState({ searchView: true })
  //     if (data.next === null) {
  //       this.setState({ nextPage: 1 })
  //       console.log('Already on the first page')
  //     } 
  //      else {
  //       this.setState({ nextPage: parseInt(data.next[32]) })
  //       this.setState({ page: parseInt(data.next[32]) - 1 })
  // //above is dealing with next page stuff and below is dealing with previous page
  //       if (data.previous[27] === 's' ) {
  //         this.setState({ prevPage: 1 })
  //       } else {
  //         this.setState({ prevPage: parseInt(data.previous[32]) })
  //       }
  //     }
  //     this.showMeTheData(data)
  //     // this.loadBooks(data.results)
  //   };





  // nextBtn = async (pageNum) => {
  //   const { nextPage, searchView, titleSearch, authorSearch } = this.state;
  //   if (searchView === true) {
  //     console.log('Switching to searchView pages-- should send to next page now')
  //     nextPage === null ? console.log('Already on last page') : await axios.get(`http://gutendex.com/books?page=${pageNum}&search=${authorSearch}+${titleSearch}`)
  //       .then((res) => this.nextSearch(res))
  //       .catch((err) => console.log(err))
  //   } else {
  //     nextPage === null ? console.log('Already on last page') : await axios.get(`http://gutendex.com/books?page=${pageNum}`)
  //       .then((res) => this.nextDefault(res))
  //       .catch(err => console.log(err))
  //   }
  // };

  nextBtn = async (pageNum) => {
    const { nextPage, searchView, titleSearch, authorSearch, page, prevPage } = this.state;
    if (searchView === true) {
      //---------------- searchView === true-----------------------------
      console.log('-----Switching to searchView pages--------')
      this.setState({ searchView: true })
      await axios.get(`http://gutendex.com/books?page=${pageNum}&search=${authorSearch}+${titleSearch}`)
        .then(({ data }) => {
          if (data.next === null) {
            //If you want to just have it end and alert them that they have reached the end, un comment the line below
            // console.log('Already on last page')
            //If you want to send them back to page one uncomment stuff below
            this.setState({ nextPage: 1 })
            console.log('Last page, sent you back to page 1')
            axios.get(`http://gutendex.com/books?page=1&search=${authorSearch}+${titleSearch}`)
              .then(({ data }) => {
                this.showMeTheData(data)
                // this.loadBooks(data.results)
              })
              .catch((err) => console.log(err))
          }
          else {
            this.setState({ nextPage: nextPage + 1 })
            this.setState({ page: page + 1 })
            this.setState({ prevPage: prevPage + 1 })
            axios.get(`${data.next}`).then(({ data }) => {
              this.showMeTheData(data)
              // this.loadBooks(data.results)
            }).catch((err) => console.log(err))

            //above is dealing with next page stuff and below is dealing with previous page
            // if (data.previous[27] === 's') {
            //   this.setState({ prevPage: 1 })
            // } else {
            //   this.setState({ prevPage: parseInt(data.previous[32]) })
            // }
          }
        })
        .catch((err) => console.log(err))

    } else {

      //-----------default view----------SearchView === false-----------------------
      // nextPage === null ? console.log('Already on last page') : 

      await axios.get(`http://gutendex.com/books?page=${pageNum}`)
        .then(({ data }) => {
          if (data.next[data.next.length - 1] === '/' || data.next === null) {
            this.getData()
          } else {
            this.setState({ nextPage: nextPage + 1 })
            this.setState({ page: page + 1 })
            this.setState({ prevPage: prevPage + 1 })
            axios.get(`${data.next}`).then(({ data }) => {
              this.showMeTheData(data)
              // this.loadBooks(data.results)
            }).catch((err) => console.log(err))
          }

          // if (data.previous === null) {
          //   this.setState({ prevPage: 0 })
          // } else if (data.previous[data.previous.length - 1] === '/' || data.previous[data.previous.length - 1] === 's') {
          //   this.setState({ prevPage: 1 })
          // } else {
          //   this.setState({ prevPage: prevPage + 1 })
          // }

        })
        .catch(err => console.log(err))
    }
  };







  // prevBtn = async (pageNum) => {
  //   const { prevPage, searchView, titleSearch, authorSearch } = this.state;
  //   //setting condition for default pages displayed
  //   if (searchView === false) {
  //     //Withing false-searchView conditional usage of button 
  //     if (prevPage === 0) {
  //       console.log('already on first page')
  //     } else if (prevPage === 1) {
  //       await axios.get(`http://gutendex.com/books?page=${pageNum}`)
  //         .then(({ data }) => {
  //           this.setState({ page: parseInt(data.next[data.next.length - 1]) - 1 })
  //           this.setState({ nextPage: parseInt(data.next[data.next.length - 1]) })
  //           this.setState({ prevPage: 0 })

  //           this.showMeTheData(data)
  //           // this.loadBooks(data.results)
  //         })
  //         .catch(err => console.log(err))
  //     } else if (prevPage === 2) {
  //       await axios.get(`http://gutendex.com/books?page=${pageNum}`)
  //         .then(({ data }) => {
  //           this.setState({ page: parseInt(data.next[data.next.length - 1]) - 1 })
  //           this.setState({ nextPage: parseInt(data.next[data.next.length - 1]) })
  //           this.setState({ prevPage: 1 })

  //           this.showMeTheData(data)
  //           // this.loadBooks(data.results)
  //         }).catch((err) => console.log(err))
  //     } else {
  //       await axios.get(`http://gutendex.com/books?page=${pageNum}`)
  //         .then(({ data }) => {
  //           this.setState({ page: parseInt(data.next[data.next.length - 1]) - 1 })
  //           this.setState({ nextPage: parseInt(data.next[data.next.length - 1]) })
  //           this.setState({ prevPage: parseInt(data.previous[data.previous.length - 1]) })

  //           this.showMeTheData(data)
  //           // this.loadBooks(data.results)
  //         })
  //         .catch(err => console.log(err))
  //     }

  //     //-----------------Now conditional usage for when searchView is true--------------------

  //   } else {
  //     console.log('---------top of backwards button------')
  //     if (prevPage === 0) {
  //       console.log('Already on first page--state prevPage = 0')
  //     } else if (prevPage === 1) {
  //       await axios.get(`http://gutendex.com/books?page=${pageNum}&search=${authorSearch}+${titleSearch}`)
  //         .then(({ data }) => {
  //           this.setState({ page: parseInt(data.next[32]) - 1 })
  //           this.setState({ nextPage: parseInt(data.next[32]) })
  //           this.setState({ prevPage: 0 })

  //           this.showMeTheData(data)
  //           // this.loadBooks(data.results)
  //         })
  //         .catch(err => console.log(err))
  //     } else if (prevPage === 2) {
  //       await axios.get(`http://gutendex.com/books?page=${pageNum}&search=${authorSearch}+${titleSearch}`)
  //         .then(({ data }) => {
  //           this.setState({ page: parseInt(data.next[32]) - 1 })
  //           this.setState({ nextPage: parseInt(data.next[32]) })
  //           this.setState({ prevPage: 1 })

  //           this.showMeTheData(data)
  //           // this.loadBooks(data.results)
  //         }).catch((err) => console.log(err))
  //     } else {
  //       await axios.get(`http://gutendex.com/books?page=${pageNum}&search=${authorSearch}+${titleSearch}`)
  //         .then(({ data }) => {
  //           this.setState({ page: parseInt(data.next[32]) - 1 })
  //           this.setState({ nextPage: parseInt(data.next[32]) })
  //           this.setState({ prevPage: parseInt(data.previous[32]) })

  //           this.showMeTheData(data)
  //           // this.loadBooks(data.results)
  //         })
  //         .catch(err => console.log(err))
  //     }
  //   }
  // };
  prevBtn = async (pageNum) => {
    const { prevPage, searchView, titleSearch, authorSearch } = this.state;
    //setting condition for default pages displayed
    if (searchView === false) {
      //Withing false-searchView conditional usage of button 
      if (prevPage === 0) {
        console.log('already on first page')
      } else if (prevPage === 1) {
        await axios.get(`http://gutendex.com/books?page=${pageNum}`)
          .then(({ data }) => {
            this.setState({ page: parseInt(data.next[data.next.length - 1]) - 1 })
            this.setState({ nextPage: parseInt(data.next[data.next.length - 1]) })
            this.setState({ prevPage: 0 })

            this.showMeTheData(data)
            // this.loadBooks(data.results)
          })
          .catch(err => console.log(err))
      } else if (prevPage === 2) {
        await axios.get(`http://gutendex.com/books?page=${pageNum}`)
          .then(({ data }) => {
            this.setState({ page: parseInt(data.next[data.next.length - 1]) - 1 })
            this.setState({ nextPage: parseInt(data.next[data.next.length - 1]) })
            this.setState({ prevPage: 1 })

            this.showMeTheData(data)
            // this.loadBooks(data.results)
          }).catch((err) => console.log(err))
      } else {
        await axios.get(`http://gutendex.com/books?page=${pageNum}`)
          .then(({ data }) => {
            this.setState({ page: parseInt(data.next[data.next.length - 1]) - 1 })
            this.setState({ nextPage: parseInt(data.next[data.next.length - 1]) })
            this.setState({ prevPage: parseInt(data.previous[data.previous.length - 1]) })

            this.showMeTheData(data)
            // this.loadBooks(data.results)
          })
          .catch(err => console.log(err))
      }

      //-----------------Now conditional usage for when searchView is true--------------------

    } else {
      console.log('---------top of backwards button------')
      if (prevPage === 0) {
        console.log('Already on first page--state prevPage = 0')
      } else if (prevPage === 1) {
        await axios.get(`http://gutendex.com/books?page=${pageNum}&search=${authorSearch}+${titleSearch}`)
          .then(({ data }) => {
            this.setState({ page: parseInt(data.next[32]) - 1 })
            this.setState({ nextPage: parseInt(data.next[32]) })
            this.setState({ prevPage: 0 })

            this.showMeTheData(data)
            // this.loadBooks(data.results)
          })
          .catch(err => console.log(err))
      } else if (prevPage === 2) {
        await axios.get(`http://gutendex.com/books?page=${pageNum}&search=${authorSearch}+${titleSearch}`)
          .then(({ data }) => {
            this.setState({ page: parseInt(data.next[32]) - 1 })
            this.setState({ nextPage: parseInt(data.next[32]) })
            this.setState({ prevPage: 1 })

            this.showMeTheData(data)
            // this.loadBooks(data.results)
          }).catch((err) => console.log(err))
      } else {
        await axios.get(`http://gutendex.com/books?page=${pageNum}&search=${authorSearch}+${titleSearch}`)
          .then(({ data }) => {
            this.setState({ page: parseInt(data.next[32]) - 1 })
            this.setState({ nextPage: parseInt(data.next[32]) })
            this.setState({ prevPage: parseInt(data.previous[32]) })

            this.showMeTheData(data)
            // this.loadBooks(data.results)
          })
          .catch(err => console.log(err))
      }
    }
  };




  loadBooks = (stuff) => {
    this.setState({ books: stuff })
  };


  getData = () => {
    //This part commented out was from my server but I'm not using that right now
    // axios.get(`/api/data`)
    //   .catch(err => console.log(err))

    axios.get(`http://gutendex.com/books`)
      .then(({ data }) => {
        this.setState({ books: data.results })
        console.log(data.results)
        this.setState({ prevPage: 0, page: 1, nextPage: 2 })
        console.log(data)
      })
      .catch(err => console.log(err))
  };



  // getBooks = () => {
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
  // };

  componentDidMount() {
    this.getData();
    // this.getBooks();
    console.log(this.state.nextPage)
    console.log(this.state.prevPage)
  }

  componentDidUpdate() {
    // this.getBooks();
    // this.loadBooks()
  };

  displayAddMode = () => {
    this.setState({ addMode: false });
  };

  hideAddMode = () => {
    this.setState({ addMode: true });
  };

  render() {
    return (
      <main>
        You need to set up a search bar for the user and allow them to create their own library
        of at least the titles and link that to the actual book-- so it's not just loading all
        their books but only the user's books!
        <button onClick={() => this.prevBtn(this.state.prevPage)}  >Back Page</button>
        <button onClick={() => this.nextBtn(this.state.page)}  >Next Page</button>
        <input onChange={(e) => this.setState({ authorSearch: e.target.value })} placeholder="Author's name" />
        <input onChange={(e) => this.setState({ titleSearch: e.target.value })} placeholder="Book Title" />
        <button onClick={this.testSearch}> Search </button>

        {/* -- this add mode will be if user is signed in and will not add you own but add from the public library into yours -- */}
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
};


export default App;

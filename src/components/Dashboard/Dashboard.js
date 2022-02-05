//codingMuse();
import React, { Component } from 'react';
import axios from 'axios';
import PubLibrary from '../PubLibrary/PubLibrary'
import { connect } from 'react-redux';
import { clearUser } from '../../redux/reducer';
import './Dashboard.css';
import Navbar from '../Navbar/Navbar';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            page: 1,
            authorSearch: '',
            titleSearch: '',
            searchView: false,

            arrOfArrOfBooks: [],
            bookArray: [],

        };
    };





    // newFunc = () => {
    //     const newArr = []
    //     books.map((miniArr, index, bigArr) => {
    //         bigArr[index].map((e, i, a) => {
    //             newArr.push(e)
    //             this.setState({ bookArray: newArr })
    //         });
    //     })

    // }








    searchFn = async () => {
        this.setState({ searchView: true });
        this.setState({ page: 1 });
        const { authorSearch, titleSearch } = this.state;
        await axios.get(`http://gutendex.com/books?search=${authorSearch}%20${titleSearch}`)
            .then(({ data }) => {
                this.setState({ books: [data.results] });
                this.showMeTheData(data);
            })
            .catch((err) => console.log(err));
    };

    //This is for logging in the console the data to follow it and see if it's doing what it should
    showMeTheData = (data) => {
        console.log('-----------------------next-------------');
        console.log('page', this.state.page);
        console.log('prevURL', data.previous);
        console.log('nextURL', data.next);
        console.log(data);
        console.log(data.results);
    };


mappingArrayOfBooks = (arr) => {
    const newArr = []
    arr.map((miniArr, index, bigArr) => {
        bigArr[index].map((e, i, a) => {
            newArr.push(e)
            this.setState({ bookArray: newArr })
        });
    })
}

    nextBtn = async (pageNum) => {
        const { searchView, titleSearch, authorSearch, page, books, arrOfArrOfBooks } = this.state;
        if (searchView === true) {
            //---------------- searchView === true-----------------------------
            console.log('-----Switching to searchView pages--------');
            this.setState({ searchView: true });
            await axios.get(`http://gutendex.com/books?page=${pageNum}&search=${authorSearch}+${titleSearch}`)
                .then(({ data }) => {
                    if (data.next === null) {
                        //If you want to just have it end and alert them that they have reached the end, un comment the line below
                        // console.log('Already on last page');
                        //If you want to send them back to page one uncomment stuff below
                        console.log('Last page, sent you back to page 1');
                        this.setState({ page: 1 })
                        axios.get(`http://gutendex.com/books?page=1&search=${authorSearch}+${titleSearch}`)
                            .then(({ data }) => {
                                // this.showMeTheData(data);
                                this.setState({ books: [...books, data.results] });


                                // const newArr = []
                                // books.map((miniArr, index, bigArr) => {
                                //     bigArr[index].map((e, i, a) => {
                                //         newArr.push(e)
                                //         this.setState({ bookArray: newArr })
                                //     });
                                // })

                                console.log(data.results)
                            })
                            .catch((err) => console.log(err))
                    } else {
                        this.setState({ page: page + 1 });
                        axios.get(`${data.next}`).then(({ data }) => {
                            // this.showMeTheData(data);
                            // this.setState({ books: data.results });
                            this.setState({ books: [...books, data.results] });
                            // this.setState({ arrOfArrOfBooks: [...arrOfArrOfBooks, data.results] });
                            // this.setState({ bookArray: data.results });

                            // this.testMap(books)

                            console.log(data.results)
                        }).catch((err) => console.log(err));
                    }
                })
                .catch((err) => console.log(err));

            //-----------default view----------SearchView === false-----------------------
        } else {
            await axios.get(`http://gutendex.com/books?page=${pageNum}`)
                .then(({ data }) => {
                    if (data.next === null) {
                        this.getPubBooks();
                    } else {
                        this.setState({ page: page + 1 });
                        axios.get(`${data.next}`).then(({ data }) => {
                            // this.showMeTheData(data);
                            // this.setState({ books: data.results });
                            this.setState({ books: [...books, data.results] });
                            // this.testBookFn(books)

                            // this.setState({ books: [...books, data.results] });
                            console.log(data.results)
                        }).catch((err) => console.log(err));
                    }
                })
                .catch(err => console.log(err));
        };
        this.mappingArrayOfBooks(this.state.books)
    };

    // nextBtn = async (pageNum) => {
    //     const { searchView, titleSearch, authorSearch, page } = this.state;
    //     if (searchView === true) {
    //         //---------------- searchView === true-----------------------------
    //         console.log('-----Switching to searchView pages--------');
    //         this.setState({ searchView: true });
    //         await axios.get(`http://gutendex.com/books?page=${pageNum}&search=${authorSearch}+${titleSearch}`)
    //             .then(({ data }) => {
    //                 if (data.next === null) {
    //                     //If you want to just have it end and alert them that they have reached the end, un comment the line below
    //                     // console.log('Already on last page');
    //                     //If you want to send them back to page one uncomment stuff below
    //                     console.log('Last page, sent you back to page 1');
    //                     this.setState({ page: 1 })
    //                     axios.get(`http://gutendex.com/books?page=1&search=${authorSearch}+${titleSearch}`)
    //                         .then(({ data }) => {
    //                             this.showMeTheData(data);
    //                             // this.setState({ books: data.results });
    //                         })
    //                         .catch((err) => console.log(err))
    //                 } else {
    //                     this.setState({ page: page + 1 });
    //                     axios.get(`${data.next}`).then(({ data }) => {
    //                         this.showMeTheData(data);
    //                         // this.setState({ books: data.results });
    //                     }).catch((err) => console.log(err));
    //                 }
    //             })
    //             .catch((err) => console.log(err));

    //         //-----------default view----------SearchView === false-----------------------
    //     } else {
    //         await axios.get(`http://gutendex.com/books?page=${pageNum}`)
    //             .then(({ data }) => {
    //                 if (data.next === null) {
    //                     this.getPubBooks();
    //                 } else {
    //                     this.setState({ page: page + 1 });
    //                     axios.get(`${data.next}`).then(({ data }) => {
    //                         this.showMeTheData(data);
    //                         // this.setState({ books: data.results });
    //                     }).catch((err) => console.log(err));
    //                 }
    //             })
    //             .catch(err => console.log(err));
    //     };
    // };

    prevBtn = async (pageNum) => {
        const { prevPage, searchView, titleSearch, authorSearch, page } = this.state;
        //Setting condition for default pages displayed -- when searchView is false
        if (searchView === false) {
            //-----Withing false-searchView conditional usage of button ----

            await axios.get(`http://gutendex.com/books?page=${pageNum}`)
                .then(({ data }) => {
                    if (data.previous === null) {
                        console.log('Already on first page');
                    } else {
                        this.setState({ page: page - 1 });
                        axios.get(`${data.previous}`)
                            .then(({ data }) => {
                                this.showMeTheData(data);
                                // this.setState({ books: data.results });
                            }).catch((err) => console.log(err));
                    }
                })
                .catch(err => console.log(err));
            //-----------------Now conditional usage for when searchView is true--------------------
        } else {
            console.log('-----Switching to searchView pages---backwards-----');
            this.setState({ searchView: true });
            await axios.get(`http://gutendex.com/books?page=${pageNum}&search=${authorSearch}+${titleSearch}`)
                .then(({ data }) => {
                    if (data.previous === null) {
                        //If you want to just have it end and alert them that they have reached the end, un comment the line below
                        console.log('Already on first page');
                        alert('You are already on the first page.');
                        //If you want to loop them to the last page
                        // console.log('Last page, sent you back to page 1');
                        // axios.get(`http://gutendex.com/books?page=1&search=${authorSearch}+${titleSearch}`)
                        //   .then(({ data }) => {
                        //     this.showMeTheData(data);
                        // this.setState({ books: data.results });
                        //   })
                        //   .catch((err) => console.log(err));
                    }
                    else {
                        this.setState({ page: page - 1 });
                        axios.get(`${data.previous}`).then(({ data }) => {
                            this.showMeTheData(data);
                            // this.setState({ books: data.results });
                        }).catch((err) => console.log(err));
                    }
                })
                .catch((err) => console.log(err));
        };
    };

    getPubBooks = () => {
        axios.get(`http://gutendex.com/books`)
            .then(({ data }) => {
                this.setState({ books: [data.results] });
                this.setState({ page: 1 });
                this.showMeTheData(data);
                this.setState({ arrOfArrOfBooks: [data.results] })
                this.setState({ bookArray: data.results })
            })
            .catch(err => console.log(err));
    };

    componentDidMount() {
        this.getPubBooks();
        // console.log(this.state.arrOfArrOfBooks)
        console.log(this.state.bookArray)

        // this.getPubBooks();
        // console.log(this.props)
    };

    componentDidUpdate() {
       
        // this.getPubBooks();
        // console.log(this.state.arrOfArrOfBooks)
        console.log(this.state.bookArray)
        console.log(this.state.books)
    };

    render() {
        return (
            <main>
                <Navbar props={this.props} />
                You need to set up a search bar for the user and allow them to create their own library
                of at least the titles and link that to the actual book-- so it's not just loading all
                their books but only the user's books!
                <button onClick={() => this.prevBtn(this.state.page)}  >Back Page</button>
                <button onClick={() => this.nextBtn(this.state.page)}  >More Books</button>
                <input onChange={(e) => this.setState({ authorSearch: e.target.value })} placeholder="Author's name" />
                <input onChange={(e) => this.setState({ titleSearch: e.target.value })} placeholder="Book Title" />
                <button onClick={this.searchFn}> Search </button>

                <h1>Full Book list:</h1>
                {/* <h2> Page: {this.state.page}</h2> */}
                <PubLibrary books={this.state.bookArray}/>
                <button onClick={() => this.nextBtn(this.state.page)} >More Books</button>
            </main>
        )
    }
};


const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { clearUser })(Dashboard);

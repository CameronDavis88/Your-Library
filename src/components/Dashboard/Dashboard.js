//The homepage/Dashboard -- The Public Library  --- conditionally renders the buttons for adding to the UsersLibrary if a user is signed in 
//path '/' for not logged in and '/id' if signed in

//codingMuse();
import React, { Component } from 'react';
import axios from 'axios';

import PubLibrary from '../PubLibrary/PubLibrary'
import './Dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            addMode: true,
            page: 1,
            authorSearch: '',
            titleSearch: '',
            searchView: false,
        }
    };

    searchFn = async () => {
        this.setState({ searchView: true });
        this.setState({ page: 1 });
        const { authorSearch, titleSearch } = this.state;
        await axios.get(`http://gutendex.com/books?search=${authorSearch}%20${titleSearch}`)
            .then(({ data }) => {
                this.setState({ books: data.results });
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

    nextBtn = async (pageNum) => {
        const { nextPage, searchView, titleSearch, authorSearch, page, prevPage } = this.state;
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
                                this.showMeTheData(data);
                                // this.setState({ books: data.results });
                            })
                            .catch((err) => console.log(err))
                    } else {
                        this.setState({ page: page + 1 });
                        axios.get(`${data.next}`).then(({ data }) => {
                            this.showMeTheData(data);
                            // this.setState({ books: data.results });
                        }).catch((err) => console.log(err));
                    }
                })
                .catch((err) => console.log(err));

            //-----------default view----------SearchView === false-----------------------
        } else {
            await axios.get(`http://gutendex.com/books?page=${pageNum}`)
                .then(({ data }) => {
                    if (data.next === null) {
                        this.getBooks();
                    } else {
                        this.setState({ page: page + 1 });
                        axios.get(`${data.next}`).then(({ data }) => {
                            this.showMeTheData(data);
                            // this.setState({ books: data.results });
                        }).catch((err) => console.log(err));
                    }
                })
                .catch(err => console.log(err));
        };
    };

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

    getBooks = () => {
        axios.get(`http://gutendex.com/books`)
            .then(({ data }) => {
                this.setState({ books: data.results });
                this.setState({ page: 1 });
                this.showMeTheData();
            })
            .catch(err => console.log(err));
    };

    componentDidMount() {
        this.getBooks();
        // this.getBooks();
    };

    componentDidUpdate() {
        // this.getBooks();
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
                <button onClick={() => this.prevBtn(this.state.page)}  >Back Page</button>
                <button onClick={() => this.nextBtn(this.state.page)}  >Next Page</button>
                <input onChange={(e) => this.setState({ authorSearch: e.target.value })} placeholder="Author's name" />
                <input onChange={(e) => this.setState({ titleSearch: e.target.value })} placeholder="Book Title" />
                <button onClick={this.searchFn}> Search </button>
                {/* -- this add mode will be if user is signed in and will not add you own but add from the public library into yours -- */}

                {/* <div id='addBtn'>
                    {this.state.addMode === true
                        ?
                        <button onClick={this.displayAddMode}>Add Book</button>
                        :
                        <AddBook books={this.state.books}
                            hideAddMode={this.hideAddMode} />
                    }
                </div> */}
                <h1>Full Book list:</h1>
                {/* <h2> Page: {this.state.page}</h2> */}
                <PubLibrary books={this.state.books}
                />
            </main>
        )
    }
};


export default Dashboard;

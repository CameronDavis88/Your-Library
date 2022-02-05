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
            authorSearch: '',
            titleSearch: '',
            searchView: false,
        };
    };


    //    nextBtn = async (pageNum) => {
    //     const { searchView, titleSearch, authorSearch, page, books, arrOfArrOfBooks, } = this.state;
    //     if (searchView === true) {
    //         //---------------- searchView === true-----------------------------
    //         console.log('-----Switching to searchView pages--------');
    //         this.setState({ searchView: true });
    //         await axios.get(`http://gutendex.com/books?page=${pageNum}&search=${authorSearch}+${titleSearch}`)
    //             .then(({ data }) => {

    //                     this.setState({ page: 1 })
    //                     axios.get(`http://gutendex.com/books?page=1&search=${authorSearch}+${titleSearch}`)
    //                         .then(({ data }) => {
    //                             // this.showMeTheData(data);
    //                             // this.setState({ books: [...books, data.results] });
    //                             // this.setState({ books: data.results });

    //                             // let originalBooks = ['start']
    //                             // originalBooks = data.results
    //                             // {
    //                             //     originalBooks.forEach((book, i, arr) => {
    //                             //         let { authors, formats } = book;
    //                             //         book.imageUrl = formats["image/jpeg"];
    //                             //         book.gutUrl = formats["text/html"];
    //                             //         book.author = authors[0].name;
    //                             //     })
    //                             // }
    //                             // this.setState({ newBook: originalBooks })

    //                             // console.log(originalBooks)



    //                         })


    //                         .catch((err) => console.log(err))
    //                 } else {
    //                     this.setState({ page: page + 1 });
    //                     axios.get(`${data.next}`).then(({ data }) => {
    //                         // this.showMeTheData(data);
    //                         // this.setState({ books: data.results });
    //                         // this.setState({ books: [...books, data.results] });
    //                         // this.setState({ arrOfArrOfBooks: [...arrOfArrOfBooks, data.results] });
    //                         // this.setState({ bookArray: data.results });
    //                         // console.log(data.results)

    //                         // let originalBooks = ['start']
    //                         // originalBooks = data.results
    //                         // {
    //                         //     originalBooks.forEach((book, i, arr) => {
    //                         //         let { authors, formats } = book;
    //                         //         book.imageUrl = formats["image/jpeg"];
    //                         //         book.gutUrl = formats["text/html"];
    //                         //         book.author = authors[0].name;
    //                         //     })
    //                         // }
    //                         // this.setState({ newBook: originalBooks })
    //                         // console.log(originalBooks)

    //                         // console.log(data.results)



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
    //                         // this.showMeTheData(data);
    //                         // this.setState({ books: data.results });
    //                         // this.setState({ books: [...books, data.results] });
    //                         // this.testBookFn(books)
    //                         // this.setState({ books: [...books, data.results] });

    //                         // let originalBooks = ['start']
    //                         // originalBooks = data.results
    //                         // {
    //                         //     originalBooks.forEach((book, i, arr) => {
    //                         //         let { authors, formats } = book;
    //                         //         book.imageUrl = formats["image/jpeg"];
    //                         //         book.gutUrl = formats["text/html"];
    //                         //         book.author = authors[0].name;
    //                         //     })
    //                         // }
    //                         // this.setState({ newBook: originalBooks })


    //                         // console.log(data.results)
    //                         // console.log(originalBooks)


    //                     }).catch((err) => console.log(err));
    //                 }
    //             })
    //             .catch(err => console.log(err));
    //     };


    // };











    searchFn = async () => {
        this.setState({ searchView: true });
        const { authorSearch, titleSearch } = this.state;
        await axios.get(`http://gutendex.com/books?search=${authorSearch}%20${titleSearch}`)
            .then(async ({ data }) => {
                let pageOne = data.results
                if (data.next === null) {
                    this.setState({ books: [...pageOne] })
                } else {
                    await axios.get(`http://gutendex.com/books?page=2&search=${authorSearch}%20${titleSearch}`)
                    .then(async ({ data }) => {
                        let pageTwo = data.results
                        this.setState({ books: [...pageOne, ...pageTwo] })
                    })
                    .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err));

    };


    getPubBooks = () => {
        axios.get(`http://gutendex.com/books`)
            .then(async ({ data }) => {
                let pageOne = data.results
                await axios.get(`http://gutendex.com/books?page=2`)
                    .then(async ({ data }) => {
                        let pageTwo = data.results
                        this.setState({ books: [...pageOne, ...pageTwo] })
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err));
    };


    componentDidMount() {
        this.getPubBooks();
        // console.log(this.state.books)
    };

    componentDidUpdate() {
        // console.log(this.state.books)
    };

    render() {
        return (
            <main>
                <Navbar props={this.props} />
                <h1>The Public Library</h1>
                <input onChange={(e) => this.setState({ authorSearch: e.target.value })} placeholder="Author's name" />
                <input onChange={(e) => this.setState({ titleSearch: e.target.value })} placeholder="Book Title" />
                <button onClick={this.searchFn}> Search </button>
                <PubLibrary books={this.state.books} />
            </main>
        )
    }
};


const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { clearUser })(Dashboard);






//codingMuse();
import React, { Component } from 'react';
import axios from 'axios';
import PubLibrary from '../PubLibrary/PubLibrary'
import { connect } from 'react-redux';
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

    searchFn = async () => {
        this.setState({ searchView: true });
        const { authorSearch, titleSearch } = this.state;
        await axios.get(`http://gutendex.com/books?search=${authorSearch}%20${titleSearch}`)
            .then(async ({ data }) => {
                let pageOne = data.results;
                if (data.next === null) {
                    this.setState({ books: [...pageOne] });
                } else {
                    await axios.get(`http://gutendex.com/books?page=2&search=${authorSearch}%20${titleSearch}`)
                        .then(async ({ data }) => {
                            let pageTwo = data.results;
                            this.setState({ books: [...pageOne, ...pageTwo] });
                        })
                        .catch(err => console.log(err));
                };
            })
            .catch(err => console.log(err));
    };


    getPubBooks = () => {
        axios.get(`http://gutendex.com/books`)
            .then(async ({ data }) => {
                let pageOne = data.results;
                await axios.get(`http://gutendex.com/books?page=2`)
                    .then(async ({ data }) => {
                        let pageTwo = data.results;
                        this.setState({ books: [...pageOne, ...pageTwo] });
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    };

    componentDidMount() {
        this.getPubBooks();
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
        );
    };
};


const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Dashboard);






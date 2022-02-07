//codingMuse();
import React, { Component } from 'react';
import axios from 'axios';
import PubLibrary from '../PubLibrary/PubLibrary'
import { connect } from 'react-redux';
import { Typography, Button, Grid, CircularProgress, TextField, Snackbar,  } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Navbar from '../Navbar/Navbar';
import './Dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            authorSearch: '',
            titleSearch: '',
            searchView: false,
            emptyFieldMessage: false,
        };
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
    

    searchFn = async () => {
        if (this.state.authorSearch === '' && this.state.titleSearch === '') {
            this.setState({ emptyFieldMessage: true });
            alert('There was nothing in the either search box for us to search.')
        } else {
            this.setState({ searchView: true })
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
    };


    exitSearch = () => {
        this.getPubBooks();
        this.setState({ searchView: false });
    };

    render() {
        return (
            <main>
                <Navbar props={this.props} />
                <Grid>
                    <Typography variant='h2' >The Public Library</Typography>
                    <TextField onChange={(e) => this.setState({ authorSearch: e.target.value })} placeholder="Author's name" />
                    <TextField onChange={(e) => this.setState({ titleSearch: e.target.value })} placeholder="Book Title" />
                    {/* <input onChange={(e) => this.setState({ authorSearch: e.target.value })} placeholder="Author's name" />
                <input onChange={(e) => this.setState({ titleSearch: e.target.value })} placeholder="Book Title" /> */}
                    <Button onClick={this.searchFn}> Search </Button>
                    {this.state.searchView === true ? <Button onClick={() => this.exitSearch()} >Exit Search</Button> : <></>}
                    {!this.state.books[0] ? <div  ><CircularProgress></CircularProgress></div> : <PubLibrary books={this.state.books} />}
                </Grid>

            </main>
        );
    };
};


const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Dashboard);






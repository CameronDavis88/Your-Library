//codingMuse();
import React, { Component } from 'react';
import axios from 'axios';
import PubLibrary from '../PubLibrary/PubLibrary'
import { connect } from 'react-redux';
import { Typography, Button, Grid, CircularProgress } from '@material-ui/core';
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
            openEmptyInputMes: false,
            emptyInputMes: '',
        };
    };

    toSelectedPubBook = () => {
this.props.history.push('/selected_pub_book');
    }

    getPubBooks = () => {
        const { books } = this.state
        axios.get(`http://gutendex.com/books`)
            .then(async ({ data }) => {
                let pageOne = data.results;
                this.setState({ books: [...pageOne] });
            //This is maddening, it works sometimes but not other times... Both this way and when manually loaded by Next button...
            //  await  axios.get(`http://gutendex.com/books?page=2`)
                    // .then(async ({ data }) => {
                    //     let pageTwo = data.results;
                    // await this.setState({ books: [...pageOne, ...pageTwo] });
                    // })
                    // .catch(err => console.log(err));
                    if(!pageOne[0]){
                        setTimeout(() => {
                            this.getPubBooks();
                            alert('Sorry, something is wrong. We can try again');
                        }, 7000)
                    };
            })
            .catch(err => console.log(err));
    };

    componentDidMount() {
        this.getPubBooks();
    };

    searchFn = async () => {
        this.setState({ books: '' })
        if (this.state.authorSearch === '' && this.state.titleSearch === '') {
            this.setState({ openEmptyInputMes: true });
            // alert('There was nothing in the either search box for us to search.')
            setTimeout(() => {
                this.setState({ openEmptyInputMes: false })
            }, 2500)

        } else {
            this.setState({ searchView: true })
            this.setState({ books: '' })
            const { authorSearch, titleSearch } = this.state;
            await axios.get(`http://gutendex.com/books?search=${authorSearch}%20${titleSearch}`)
                .then(async ({ data }) => {
                    let searchPageOne = data.results;
                    this.setState({ books: [...searchPageOne] });
                    // if (data.next === null) {
                    //     this.setState({ books: [...searchPageOne] });
                    // } else {
                    //    //This is maddening, it works sometimes but not other times... Both this way and when manually loaded by Next button...
                    //     await axios.get(`http://gutendex.com/books?page=2&search=${authorSearch}%20${titleSearch}`)
                    //         .then(async ({ data }) => {
                    //             let pageTwo = data.results;
                    //             this.setState({ books: [...searchPageOne, ...pageTwo] });
                    //         })
                    //         .catch(err => console.log(err));
                    // };
                    if(!searchPageOne[0]){
                        setTimeout(() => {
                            this.getPubBooks();
                            alert('Sorry, something went wrong with your search');
                        }, 7000)
                    };
                })
                .catch(err => console.log(err));
        };
    };

    exitSearch = () => {
        this.setState({ books: '' })
        this.setState({ searchView: false });
        this.getPubBooks();
    };

    render() {
        return (
            <main className='dashboard' >
                {/* <div className='navbar-div' > */}
                <Navbar className='navbar' props={this.props} />
                {/* </div> */}
                
                <Grid className='dash-box' >
                    <Typography variant='h2' className='page-title' >The Public Library</Typography>
                    {this.state.openEmptyInputMes === true
                        ?
                        <div className='message-box' >
                            <Typography variant='h5' >To search please enter something into at least one of the search boxes</Typography>
                            <Button onClick={() => this.setState({ openEmptyInputMes: false })} >Close Message</Button>
                        </div>
                        :
                        <div>
                            <input className='input' onChange={(e) => this.setState({ authorSearch: e.target.value })} placeholder="Author's name" />
                            <input className='input' onChange={(e) => this.setState({ titleSearch: e.target.value })} placeholder="Book Title" />
                            {/* <input onChange={(e) => this.setState({ authorSearch: e.target.value })} placeholder="Author's name" />
                    <input onChange={(e) => this.setState({ titleSearch: e.target.value })} placeholder="Book Title" /> */}
                            <button className='search-button' onClick={this.searchFn}> Search </button>
                        </div>
                    }
                    {this.state.searchView === true ? <button className='exit-button' onClick={() => this.exitSearch()} >Exit Search</button> : <></>}
                    <div className='library-content' >
                        {!this.state.books[0] ? <div ><CircularProgress></CircularProgress></div> : <PubLibrary books={this.state.books} toSelectedPubBook={this.toSelectedPubBook} />}
                    </div>
                </Grid>
            </main>
        );
    };
};


const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Dashboard);






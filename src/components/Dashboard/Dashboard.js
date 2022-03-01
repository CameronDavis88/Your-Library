//codingMuse();
import React, { Component } from 'react';
import axios from 'axios';
import PubLibrary from '../PubLibrary/PubLibrary'
import { connect } from 'react-redux';
import { clearUser } from '../../redux/reducer';
import { Typography, Grid, CircularProgress } from '@material-ui/core';
import Navbar from '../Navbar/Navbar';
import '../../styles/Dashboard.css';

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

    getPubBooks = () => {
        //Fetching book data from Gutendex
        axios.get(`https://gutendex.com/books`)
            .then(async ({ data }) => {
                let pageOne = data.results;
                this.setState({ books: [...pageOne] });

                //This is maddening, it works sometimes but not other times... Both this way and when manually loaded by Next button...
                // and yet, the same thing (at least when I am writing this) still works in the search requests...
                //  await  axios.get(`https://gutendex.com/books?page=2`)
                // .then(async ({ data }) => {
                //     let pageTwo = data.results;
                // await this.setState({ books: [...pageOne, ...pageTwo] });
                // })
                // .catch(err => console.log(err));

                //If it takes 7 seconds to load, something is wrong and it automatically tries it again--usually works
                if (!pageOne[0]) {
                    setTimeout(() => {
                        this.getPubBooks();
                        alert('Sorry, something is wrong. We will try again');
                    }, 7000)
                };
            })
            .catch(err => console.log(err));
    };

    componentDidMount() {
        this.getPubBooks();
    };

//This fetches the books from gutendex which match the search input values for author or title and sets the new data to the books array in state
    searchFn = async () => {
        this.setState({ books: '' })
        if (this.state.authorSearch === '' && this.state.titleSearch === '') {
            this.setState({ openEmptyInputMes: true });
            //If the user clicked search without anything in the search fields this message appears for 2.5 seconds
            setTimeout(() => {
                this.getPubBooks();
                this.setState({ openEmptyInputMes: false })
            }, 2500)
        } else {
            this.setState({ searchView: true })
            this.setState({ books: '' })
            const { authorSearch, titleSearch } = this.state;
            await axios.get(`https://gutendex.com/books?search=${authorSearch}%20${titleSearch}`)
                .then(async ({ data }) => {
                    let searchPageOne = data.results;
                    // this.setState({ books: [...searchPageOne] });
                    if (data.next === null) {
                        this.setState({ books: [...searchPageOne] });
                    } else {
                        //This is maddening, it works sometimes but not other times... Both this way and when manually loaded by Next button...
                        await axios.get(`https://gutendex.com/books?page=2&search=${authorSearch}%20${titleSearch}`)
                            .then(async ({ data }) => {
                                let pageTwo = data.results;
                                this.setState({ books: [...searchPageOne, ...pageTwo] });
                            })
                            .catch(err => console.log(err));
                    };
                    //If it takes 7 seconds to load, something is wrong and it automatically loads default books again
                    if (!searchPageOne[0]) {
                        setTimeout(() => {
                            this.getPubBooks();
                            alert('Sorry, something went wrong with your search');
                        }, 7000)
                    };
                })
                .catch(err => console.log(err));
        };
    };

    //Resets the page to default books and ends the user's search
    exitSearch = () => {
        this.setState({ books: '' });
        this.setState({ authorSearch: '', titleSearch: '' });
        this.setState({ searchView: false });
        this.getPubBooks();
    };

    toSelectedPubBook = () => {
        this.props.history.push('/selected_pub_book');
    };

    render() {
        return (
            <main className='dashboard' >
                <Navbar className='navbar' props={this.props} />
                <Grid className='dash-box' >
                    <Typography variant='h2' align='center' className='page-title' >The Public Library</Typography>
                    <div className='register-title-box' >
                        <Typography variant='h6' align='center' >To save books to your own library make an account and login</Typography>
                    </div>
                    <br />
                    {/* Conditionally renders this message for 2.5 seconds if the user clicked search with both search fields empty */}
                    {this.state.openEmptyInputMes === true
                        ?
                        <div className='message-box' >
                            <Typography variant='h5' >To search please enter something into at least one of the search boxes</Typography>
                            <button className='close-mes-btn' onClick={() => this.setState({ openEmptyInputMes: false })} >X Close Message</button>
                        </div>
                        :
                        <div className='upper-box' >
                            <Typography >-Search for books-</Typography>
                            <input className='input' onChange={(e) => this.setState({ authorSearch: e.target.value })} placeholder="Author's name" value={this.state.authorSearch} />
                            <input className='input' onChange={(e) => this.setState({ titleSearch: e.target.value })} placeholder="Book Title" value={this.state.titleSearch} />
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

//Exporting component and accessing redux material
const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { clearUser })(Dashboard);






import React from 'react';
import PubBook from './PubBook';
import { Grid, CircularProgress } from '@material-ui/core';
import './PubLibrary.css';

//This component is enders in the Dashboard component
const PubLibrary = ({ books, toSelectedPubBook }) => {
    return (
        <Grid className='library-grid' >
            {books[0]
                ?
                <>
                {/* This maps over the books array from state in Dashboard which is passed down through props and get's data from each individual book */}
                    {books.map((book) => {
                        const { id, authors, formats, title } = book;
                        let displayTitle = title;
                        const imageUrl = formats["image/jpeg"];
                        const gutUrl = formats["text/html"];
                        const author = authors[0].name;
                        //If the title is too long for the small display element it is truncated to 50 characters and ...
                        if (displayTitle[51]) {
                            let newTitle = displayTitle.slice(0, 50);
                            let titleArr = Array.from(newTitle);
                            titleArr.push('...');
                            let finalTitle = ``;
                            titleArr.forEach((character) => {
                                finalTitle = finalTitle + `${character}`
                                return finalTitle
                            });
                            displayTitle = finalTitle
                        };
                        //Renders each individual book in its own component which receives its data through props
                        return <PubBook key={id} id={id} displayTitle={displayTitle} fullTitle={title} author={author}
                            formats={formats} imageUrl={imageUrl} gutUrl={gutUrl} toSelectedPubBook={toSelectedPubBook} />
                    })}
                </>
                : <div className='library-grid' > Loading...<div ><CircularProgress></CircularProgress></div> </div>
            }
        </Grid>
    );
};

export default PubLibrary;

import React from 'react';
import PubBook from './PubBook';
import { Grid, CircularProgress } from '@material-ui/core';
import './PubLibrary.css'


const PubLibrary = ({ books, toSelectedPubBook }) => {
    return (
        <Grid className='library-grid' >
            {books[0]
                ?
                <>
                    {books.map((book) => {
                        const { id, authors, formats, title } = book;
                        let displayTitle = title;
                        const imageUrl = formats["image/jpeg"];
                        const gutUrl = formats["text/html"];
                        const author = authors[0].name;

                        if (displayTitle[51]) {
                            let newTitle = displayTitle.slice(0, 50)
                            let titleArr = Array.from(newTitle)
                            titleArr.push('...')
                            let finalTitle = ``

                            titleArr.forEach((ele, ind, arr) => {
                                finalTitle = finalTitle + `${ele}`
                                return finalTitle
                            })
                            displayTitle = finalTitle
                        }

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

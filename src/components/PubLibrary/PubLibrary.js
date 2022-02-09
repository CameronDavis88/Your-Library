import React from 'react';
import PubBook from './PubBook';
import { Grid, CircularProgress } from '@material-ui/core';
import './PubLibrary.css'


const PubLibrary = ({ books }) => {
    return (
        <Grid className='library-grid' >
            {books[0]
                ?
                <>
                    {books.map((book) => {
                        const { id, authors, title, formats } = book;
                        const imageUrl = formats["image/jpeg"];
                        const gutUrl = formats["text/html"];
                        const author = authors[0].name;
                        let finalTitle = ``
                        if (title[51]) {
                            let newTitle = title.slice(0, 50)
                            let titleArr = Array.from(newTitle)
                            titleArr.push('.')
                            titleArr.push('.')
                            titleArr.push('.')
                            titleArr.forEach((character) => {
                                finalTitle = finalTitle + `${character}`
                                return finalTitle
                            });
                        };

                        return <PubBook key={id} id={id} title={title} displayTitle={finalTitle} author={author}
                            formats={formats} imageUrl={imageUrl} gutUrl={gutUrl} />
                    })}
                </>
                : <div className='library-grid' > Loading...<div ><CircularProgress></CircularProgress></div> </div>
            }
        </Grid>
    );
};

export default PubLibrary;

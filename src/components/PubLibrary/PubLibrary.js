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
                        const { id, authors, formats } = book;
                        let title = book.title;
                        const imageUrl = formats["image/jpeg"];
                        const gutUrl = formats["text/html"];
                        const author = authors[0].name;

                        if (title[51]) {
                            let newTitle = title.slice(0, 50)
                            let titleArr = Array.from(newTitle)
                            titleArr.push('.')
                            titleArr.push('.')
                            titleArr.push('.')
                            let finalTitle = ``

                            titleArr.forEach((ele, ind, arr) => {
                                finalTitle = finalTitle + `${ele}`
                                return finalTitle
                            })
                            title = finalTitle
                        }

                        return <PubBook key={id} id={id} title={title} author={author}
                            formats={formats} imageUrl={imageUrl} gutUrl={gutUrl} />
                    })}
                </>
                : <div className='library-grid' > Loading...<div ><CircularProgress></CircularProgress></div> </div>
            }
        </Grid>
    );
};

export default PubLibrary;

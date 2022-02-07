import React from 'react';
import PubBook from './PubBook';
import { Typography, Button, Grid } from '@material-ui/core';


const PubLibrary = ({ books }) => {
    return (
        <Grid>
            {books[0]
                ?
                <>
                    {books.map((book) => {
                        const { id, title, authors, formats } = book;
                        const imageUrl = formats["image/jpeg"];
                        const gutUrl = formats["text/html"];
                        const author = authors[0].name;
                        return <PubBook key={id} id={id} title={title} author={author}
                            formats={formats} imageUrl={imageUrl} gutUrl={gutUrl} />
                    })}
                </>
                : <> Loading symbol will go here... </>
            }
        </Grid>
    );
};

export default PubLibrary;

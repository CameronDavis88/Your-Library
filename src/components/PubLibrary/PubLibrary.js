import React from 'react';
import PubBook from './PubBook';

const PubLibrary = ({ books }) => {

    return (
        <div>
            {books.map((book) => {
        const { id, title, authors, formats } = book;
        const imageUrl = formats["image/jpeg"];
        const gutUrl = formats["text/html"];
        const author = authors[0].name;
        return <PubBook key={id} id={id} title={title} author={author} formats={formats} imageUrl={imageUrl} gutUrl={gutUrl} />
    })}
        </div>
    )
};

export default PubLibrary;

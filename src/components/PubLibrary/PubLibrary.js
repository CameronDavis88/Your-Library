import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import PubBook from './PubBook';


//This is when you will need to do the actual conditional rendering for if you have the add button or not

const PubLibrary = ({ books }) => {

    const mappedBooks = books.map((book) => {
        const { id, title, authors, formats } = book;
        const imageUrl = formats["image/jpeg"];
        const gutUrl = formats["text/html"];
        const author = authors[0].name;
        return <PubBook key={id} id={id} title={title} author={author} formats={formats} imageUrl={imageUrl} gutUrl={gutUrl} />
    })

    return (
        <div>
            {mappedBooks}
        </div>
    )
};

export default PubLibrary;
